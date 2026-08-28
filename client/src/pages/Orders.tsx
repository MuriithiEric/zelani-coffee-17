import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api/api-client";
import { toast } from "sonner";
import { ShoppingBag, Calendar, Package, ArrowRight, LogOut, ChevronRight, Truck, Coffee } from "lucide-react";

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  size?: string;
  grind?: string;
}

interface Order {
  id: string;
  order_reference: string;
  total_amount: number;
  currency: string;
  payment_status: string;
  created_at: string;
  order_items: OrderItem[];
}

const statusColorMap: Record<string, string> = {
  completed: "bg-green-50 text-green-700 border-green-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
  "in transit": "bg-blue-50 text-blue-700 border-blue-200",
  "out for delivery": "bg-amber-50 text-amber-700 border-amber-200",
  pending: "bg-amber-50 text-amber-800 border-amber-200",
  default: "bg-zinc-50 text-zinc-650 border-zinc-200",
};

function getStatusColor(status: string) {
  const lower = status.toLowerCase();
  for (const key in statusColorMap) {
    if (lower.includes(key)) return statusColorMap[key];
  }
  return statusColorMap.default;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!api.isAuthenticated()) {
      toast.error("Please sign in to view your orders.");
      navigate("/register");
      return;
    }

    const user = api.getSessionUser();
    setUserProfile(user);

    const fetchOrders = async () => {
      try {
        const data = await api.orders.getMyOrders();
        setOrders(data);
      } catch (err: any) {
        toast.error(err.message || "Failed to load your orders.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-zinc-800 font-jost flex flex-col">
      <Navigation />

      {/* Hero Header */}
      <div className="pt-28 pb-10 px-4 bg-white border-b border-zinc-150/80">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1.5 text-left">
            <h1 className="font-fredoka text-3xl sm:text-4xl font-bold text-zinc-900 flex items-center gap-3">
              <span>Your Orders</span>
            </h1>
            <p className="text-zinc-500 text-sm">
              {userProfile ? `Welcome, ${userProfile.firstName || userProfile.email}. View your purchase history below.` : "Manage and track your recent orders."}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-3xl border border-zinc-150 p-6 space-y-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-1/3 rounded" />
                    <Skeleton className="h-6 w-1/6 rounded" />
                  </div>
                  <Skeleton className="h-px w-full" />
                  <Skeleton className="h-16 w-full rounded" />
                </div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16 px-6 bg-white rounded-3xl border border-zinc-150 shadow-sm max-w-2xl mx-auto">

              <h2 className="font-fredoka text-2xl font-bold text-zinc-900 mb-2">No Orders Found</h2>
              <p className="text-zinc-500 mb-8 max-w-md mx-auto">
                You haven't placed any orders yet. Explore our freshly roasted premium coffee beans and place your first order today!
              </p>
              <Link to="/products">
                <Button className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-8 py-6 text-sm font-semibold">
                  Browse Products
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const date = new Date(order.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl border border-zinc-150 hover:border-zinc-250 transition-all duration-300 shadow-sm overflow-hidden"
                  >
                    {/* Header info */}
                    <div className="bg-zinc-50/50 px-6 py-5 border-b border-zinc-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="text-left">
                        <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1">
                          Order Reference
                        </span>
                        <span className="font-mono font-bold text-sm text-zinc-800">
                          {order.order_reference}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="text-left sm:text-right">
                          <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider block mb-1">
                            Date Placed
                          </span>
                          <span className="text-sm font-semibold text-zinc-650 flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-[#b37e38]" />
                            {date}
                          </span>
                        </div>
                        <Badge
                          className={`px-4 py-1 rounded-full text-xs font-bold border shadow-none ${getStatusColor(
                            order.payment_status
                          )}`}
                        >
                          {order.payment_status}
                        </Badge>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="p-6">
                      <div className="divide-y divide-zinc-100">
                        {order.order_items.map((item) => (
                          <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center text-left">
                            <div className="space-y-1">
                              <p className="font-bold text-zinc-800">{item.product_name}</p>
                              <p className="text-xs text-zinc-500">
                                Grind: {item.grind || "Whole Bean"} • Size: {item.size || "Standard"}
                              </p>
                            </div>
                            <span className="font-semibold text-zinc-600">
                              {item.quantity} x {order.currency} {Number(item.unit_price).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Summary & track action */}
                      <div className="mt-6 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm text-zinc-500 font-medium">Total:</span>
                          <span className="font-bold text-xl text-[#c89547]">
                            {order.currency} {Number(order.total_amount).toLocaleString()}
                          </span>
                        </div>
                        <Button
                          onClick={() => navigate(`/track?ref=${order.order_reference}`)}
                          className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full font-semibold px-6 shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                        >
                          <Truck className="h-4 w-4" />
                          Track Shipping
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
