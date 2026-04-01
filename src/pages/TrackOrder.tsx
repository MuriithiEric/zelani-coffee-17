import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { Search, Package, MapPin, Calendar, AlertCircle, Truck } from "lucide-react";

interface TrackingEvent {
  date: string;
  time: string;
  description: string;
  location: string;
}

interface TrackingResult {
  status: string;
  statusCode: string;
  origin: string;
  destination: string;
  estimatedDelivery: string | null;
  events: TrackingEvent[];
}

const statusColorMap: Record<string, string> = {
  delivered: "bg-green-100 text-green-800 border-green-300",
  "in transit": "bg-blue-100 text-blue-800 border-blue-300",
  "out for delivery": "bg-amber-100 text-amber-800 border-amber-300",
  transit: "bg-blue-100 text-blue-800 border-blue-300",
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
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async () => {
    const trimmed = trackingNumber.trim();
    if (!trimmed) {
      setError("Please enter a tracking number.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("dhl-track", {
        body: { trackingNumber: trimmed },
      });

      if (fnError) {
        setError("Unable to fetch tracking info right now. Please try again in a moment.");
        return;
      }

      if (data?.error || data?.detail || (!data?.shipments?.length)) {
        setError("We couldn't find a shipment with that number. Please double-check and try again.");
        return;
      }

      const parsed = parseTrackingData(data);
      if (!parsed) {
        setError("We couldn't find a shipment with that number. Please double-check and try again.");
        return;
      }

      setResult(parsed);
    } catch {
      setError("Unable to fetch tracking info right now. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
              <Truck className="h-8 w-8 text-gold-700" />
            </div>
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-coffee-900 mb-3">
              Track Your Shipment
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto">
              Enter your DHL waybill number to see live updates on your Zelani order
            </p>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Input
              placeholder="Enter DHL tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              className="flex-1 h-12 text-base"
            />
            <Button
              onClick={handleTrack}
              disabled={isLoading}
              size="lg"
              className="bg-gold-500 hover:bg-gold-600 text-coffee-900 h-12 px-8 whitespace-nowrap"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-coffee-900/30 border-t-coffee-900 rounded-full animate-spin" />
                  Tracking...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Track Shipment
                </span>
              )}
            </Button>
          </div>

          {/* Loading skeleton */}
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>
          )}

          {/* Error */}
          {error && !isLoading && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
              <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-3" />
              <p className="text-foreground font-medium">{error}</p>
            </div>
          )}

          {/* Results */}
          {result && !isLoading && (
            <div className="space-y-6 animate-fade-in">
              {/* Status card */}
              <div className="bg-card rounded-lg shadow-md p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Current Status</p>
                    <Badge className={`text-sm px-4 py-1.5 ${getStatusColor(result.status)}`}>
                      {result.status}
                    </Badge>
                  </div>
                  {result.estimatedDelivery && (
                    <div className="text-left sm:text-right">
                      <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                      <p className="text-foreground font-semibold flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-gold-600" />
                        {result.estimatedDelivery}
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-md p-4">
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Origin</p>
                    <p className="text-foreground font-medium flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-coffee-500 shrink-0" />
                      {result.origin}
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-md p-4">
                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Destination</p>
                    <p className="text-foreground font-medium flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-gold-600 shrink-0" />
                      {result.destination}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              {result.events.length > 0 && (
                <div className="bg-card rounded-lg shadow-md p-6">
                  <h2 className="font-playfair text-xl font-bold text-coffee-900 mb-6">
                    Shipment Timeline
                  </h2>
                  <div className="relative">
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border" />
                    <div className="space-y-6">
                      {result.events.map((event, i) => (
                        <div key={i} className="relative flex gap-4">
                          <div
                            className={`relative z-10 mt-1 h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              i === 0
                                ? "bg-gold-500 border-gold-600"
                                : "bg-card border-border"
                            }`}
                          >
                            <Package className={`h-3 w-3 ${i === 0 ? "text-coffee-900" : "text-muted-foreground"}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium ${i === 0 ? "text-foreground" : "text-muted-foreground"}`}>
                              {event.description}
                            </p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
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
