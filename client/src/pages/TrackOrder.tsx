import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api/api-client";
import { toast } from "sonner";
import { Search, Package, MapPin, Calendar, AlertCircle, Truck, Coffee, ShieldCheck, ShoppingBag } from "lucide-react";

interface TrackingEvent {
  date: string;
  time: string;
  description: string;
  location: string;
}

interface TrackingResult {
  isLocalOrder: boolean;
  status: string;
  statusCode: string;
  origin: string;
  destination: string;
  estimatedDelivery: string | null;
  events: TrackingEvent[];
  items?: Array<{
    product_name: string;
    quantity: number;
    size?: string;
    grind?: string;
    unit_price: number;
  }>;
  totalAmount?: number;
  currency?: string;
  paymentStatus?: string;
}

const statusColorMap: Record<string, string> = {
  completed: "bg-green-100 text-green-800 border-green-300",
  delivered: "bg-green-100 text-green-800 border-green-300",
  "in transit": "bg-blue-100 text-blue-800 border-blue-300",
  "out for delivery": "bg-amber-100 text-amber-800 border-amber-300",
  pending: "bg-amber-100 text-amber-850 border-amber-300",
  default: "bg-muted text-muted-foreground border-border",
};

function getStatusColor(status: string) {
  const lower = status.toLowerCase();
  for (const key in statusColorMap) {
    if (lower.includes(key)) return statusColorMap[key];
  }
  return statusColorMap.default;
}

function parseTrackingData(data: any): TrackingResult | null {
  try {
    const shipments = data?.shipments;
    if (!shipments || shipments.length === 0) return null;

    const shipment = shipments[0];
    const events: TrackingEvent[] = (shipment.events || []).map((e: any) => {
      const dt = new Date(e.timestamp || e.date);
      return {
        date: dt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
        time: dt.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        description: e.description || e.status || "Update",
        location: [e.location?.address?.addressLocality, e.location?.address?.countryCode]
          .filter(Boolean)
          .join(", ") || "—",
      };
    });

    const origin = shipment.origin?.address
      ? [shipment.origin.address.addressLocality, shipment.origin.address.countryCode].filter(Boolean).join(", ")
      : "—";
    const destination = shipment.destination?.address
      ? [shipment.destination.address.addressLocality, shipment.destination.address.countryCode].filter(Boolean).join(", ")
      : "—";

    return {
      isLocalOrder: false,
      status: shipment.status?.description || shipment.status?.status || "Unknown",
      statusCode: shipment.status?.statusCode || "",
      origin,
      destination,
      estimatedDelivery: shipment.estimatedTimeOfDelivery
        ? new Date(shipment.estimatedTimeOfDelivery).toLocaleDateString("en-US", {
          weekday: "long", year: "numeric", month: "long", day: "numeric",
        })
        : null,
      events,
    };
  } catch {
    return null;
  }
}

const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const refParam = searchParams.get("ref") || "";
  const [trackingNumber, setTrackingNumber] = useState(refParam);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (refParam) {
      setTrackingNumber(refParam);
      runTrack(refParam);
    }
  }, [refParam]);

  const runTrack = async (num: string) => {
    const trimmed = num.trim();
    if (!trimmed) {
      setError("Please enter a tracking number or order reference.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // 1. Try querying the local orders table in backend first
      let orderData = null;
      try {
        orderData = await api.orders.getByReference(trimmed);
      } catch (e) {
        // Not found locally
      }

      if (orderData) {
        // Build mock shipping timeline events based on creation date
        const createdDate = new Date(orderData.createdAt);
        const formatD = (d: Date) => d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
        const formatT = (d: Date) => d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

        const events: TrackingEvent[] = [
          {
            date: formatD(createdDate),
            time: formatT(createdDate),
            description: "Order placed on Zelani Coffee store.",
            location: "Nairobi Roastery, KE",
          },
        ];

        if (orderData.paymentStatus === "completed") {
          const paymentDate = new Date(createdDate.getTime() + 10 * 60 * 1000); // +10 mins
          events.unshift({
            date: formatD(paymentDate),
            time: formatT(paymentDate),
            description: "Payment confirmed via PayPal.",
            location: "Nairobi Roastery, KE",
          });

          if (orderData.dhlTrackingNumber || orderData.dhl_tracking_number) {
            const dhlNum = orderData.dhlTrackingNumber || orderData.dhl_tracking_number;
            const dhlPu = orderData.dhlPickupConfirmation || orderData.dhl_pickup_confirmation || "CBK-SCHEDULED";
            const dhlDate = new Date(createdDate.getTime() + 15 * 60 * 1000);
            events.unshift({
              date: formatD(dhlDate),
              time: formatT(dhlDate),
              description: `DHL Express Shipment Booked. Waybill #${dhlNum} (Pickup Booking: ${dhlPu}).`,
              location: "DHL Express Airport Gateway, KE",
            });
          }

          // Roasting & packaging phase
          const roastingDate = new Date(createdDate.getTime() + 2 * 60 * 60 * 1000); // +2 hrs
          events.unshift({
            date: formatD(roastingDate),
            time: formatT(roastingDate),
            description: "Premium coffee beans selected, packaged, and labeled for DHL courier pickup.",
            location: "Nairobi Packaging Center, KE",
          });
        }

        const deliveryEstimate = new Date(createdDate.getTime() + 3 * 24 * 60 * 60 * 1000); // +3 days

        setResult({
          isLocalOrder: true,
          status: orderData.paymentStatus === "completed" ? "In Preparation" : "Awaiting Payment",
          statusCode: orderData.paymentStatus,
          origin: "Nairobi Roastery, KE",
          destination: "Customer Address",
          estimatedDelivery: deliveryEstimate.toLocaleDateString("en-US", {
            weekday: "long", year: "numeric", month: "long", day: "numeric",
          }),
          events,
          items: orderData.orderItems || [],
          totalAmount: Number(orderData.totalAmount),
          currency: orderData.currency,
          paymentStatus: orderData.paymentStatus,
        });

        setIsLoading(false);
        return;
      }

      // 2. Fallback to DHL tracking API
      const data = await api.shipping.track(trimmed);

      if (data?.error || data?.detail || (!data?.shipments?.length)) {
        const msg = "We couldn't find a shipment or order with that reference number. Please check and try again.";
        setError(msg);
        toast.error(msg);
        return;
      }

      const parsed = parseTrackingData(data);
      if (!parsed) {
        const msg = "We couldn't parse the tracking details for that shipment number.";
        setError(msg);
        toast.error(msg);
        return;
      }

      setResult(parsed);
    } catch (err: any) {
      const msg = err.message || "Unable to process tracking query. Please try again shortly.";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrack = () => {
    runTrack(trackingNumber);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-zinc-800">
      <Navigation />

      <div className="pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-fredoka text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 mb-3">
              Track Your Order
            </h1>
            <p className="text-zinc-500 text-base max-w-lg mx-auto">
              Enter your Zelani order reference (e.g. <span className="font-semibold text-zinc-700">zelani_order_...</span>) or DHL tracking number below
            </p>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Input
              placeholder="e.g. zelani_order_123456 or DHL waybill"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              className="flex-1 h-12 text-base rounded-full border-zinc-200 focus:border-zinc-400 pl-6 bg-white"
            />
            <Button
              onClick={handleTrack}
              disabled={isLoading}
              size="lg"
              className="bg-[#c89547] hover:bg-[#b37e38] text-white h-12 rounded-full px-8 whitespace-nowrap"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Searching...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Track Order
                </span>
              )}
            </Button>
          </div>

          {/* Loading skeleton */}
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-32 w-full rounded-2xl" />
              <Skeleton className="h-48 w-full rounded-2xl" />
            </div>
          )}

          {/* Error */}
          {error && !isLoading && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
              <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-3" />
              <p className="text-zinc-800 font-medium">{error}</p>
            </div>
          )}

          {/* Results */}
          {result && !isLoading && (
            <div className="space-y-6 animate-scale-in">
              {/* Status card */}
              <div className="bg-white rounded-2xl border border-zinc-150 shadow-sm p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs text-zinc-400 mb-1 uppercase font-bold tracking-wider">Status</p>
                    <Badge className={`text-sm px-4 py-1.5 rounded-full border shadow-none font-semibold ${getStatusColor(result.status)}`}>
                      {result.status}
                    </Badge>
                  </div>
                  {result.estimatedDelivery && (
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-zinc-400 mb-1 uppercase font-bold tracking-wider">Est. Delivery</p>
                      <p className="text-zinc-800 font-bold flex items-center sm:justify-end gap-1.5">
                        <Calendar className="h-4 w-4 text-[#b37e38]" />
                        {result.estimatedDelivery}
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-100">
                  <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-150">
                    <p className="text-[10px] text-zinc-400 mb-1 uppercase font-bold tracking-wider">Origin</p>
                    <p className="text-zinc-800 text-sm font-semibold flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-zinc-500 shrink-0" />
                      {result.origin}
                    </p>
                  </div>
                  <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-150">
                    <p className="text-[10px] text-zinc-400 mb-1 uppercase font-bold tracking-wider">Destination</p>
                    <p className="text-zinc-800 text-sm font-semibold flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-[#b37e38] shrink-0" />
                      {result.destination}
                    </p>
                  </div>
                </div>
              </div>

              {/* Items Card (If Local Order) */}
              {result.isLocalOrder && result.items && result.items.length > 0 && (
                <div className="bg-white rounded-2xl border border-zinc-150 shadow-sm p-6">
                  <h3 className="font-fredoka text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-[#b37e38]" />
                    <span>Order Items</span>
                  </h3>
                  <div className="space-y-4">
                    {result.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <div className="space-y-0.5">
                          <p className="font-bold text-zinc-800">{item.product_name}</p>
                          <p className="text-xs text-zinc-500">
                            Size: {item.size || "Standard"} • Grind: {item.grind || "Whole Bean"}
                          </p>
                        </div>
                        <span className="font-semibold text-zinc-650 text-right">
                          {item.quantity} x {result.currency} {item.unit_price}
                        </span>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-zinc-100 flex justify-between items-center">
                      <span className="font-bold text-zinc-900">Total Charged</span>
                      <span className="font-bold text-[#c89547] text-lg">
                        {result.currency} {result.totalAmount?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Timeline */}
              {result.events.length > 0 && (
                <div className="bg-white rounded-2xl border border-zinc-150 shadow-sm p-6">
                  <h2 className="font-fredoka text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                    <Coffee className="h-5 w-5 text-[#b37e38]" />
                    <span>Shipment Timeline</span>
                  </h2>
                  <div className="relative">
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-zinc-100" />
                    <div className="space-y-6">
                      {result.events.map((event, i) => (
                        <div key={i} className="relative flex gap-4">
                          <div
                            className={`relative z-10 mt-1 h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 ${i === 0
                                ? "bg-[#c89547] border-[#b37e38]"
                                : "bg-white border-zinc-200"
                              }`}
                          >
                            <Package className={`h-3 w-3 ${i === 0 ? "text-white" : "text-zinc-400"}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-semibold text-sm ${i === 0 ? "text-zinc-900" : "text-zinc-500"}`}>
                              {event.description}
                            </p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-zinc-400 font-medium">
                              <span>{event.date} • {event.time}</span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {event.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TrackOrder;
