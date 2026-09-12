import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "@/lib/api/api-client";
import { products as initialProducts, Product } from "@/data/products";
import {
  LayoutDashboard,
  ShoppingBag,
  Receipt,
  Users as UsersIcon,
  CreditCard,
  Plus,
  Trash2,
  Edit,
  TrendingUp,
  DollarSign,
  PackageCheck,
  CheckCircle,
  Clock,
  ChevronRight,
  Info,
  ShieldAlert,
  UserCheck,
  X,
  Share2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Mock Charts Data
const salesData = [
  { name: "Mon", sales: 2400 },
  { name: "Tue", sales: 1398 },
  { name: "Wed", sales: 9800 },
  { name: "Thu", sales: 3908 },
  { name: "Fri", sales: 4800 },
  { name: "Sat", sales: 3800 },
  { name: "Sun", sales: 4300 },
];

const categoryData = [
  { name: "Espresso Blends", value: 400, color: "#8B5A2B" },
  { name: "Single Origin", value: 300, color: "#c89547" },
  { name: "Instant Roasts", value: 200, color: "#4b2e16" },
  { name: "Merchandise", value: 100, color: "#adad9c" },
];

// Mock Users
const initialUsers = [
  { email: "muraypatrick@gmail.com", joined: "Aug 18, 2026", type: "Standard Member", status: "Active", role: "Admin" },
  { email: "alowishus@gmail.com", joined: "Aug 19, 2026", type: "Standard Member", status: "Active", role: "Roaster" },
  { email: "customer@example.com", joined: "Aug 20, 2026", type: "Guest Account", status: "Unverified", role: "Customer" },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "orders" | "payments" | "users">("dashboard");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const modalType = searchParams.get("modal"); // 'new-product' | 'edit-product' | 'order' | 'payment' | 'user'
  const modalId = searchParams.get("id");
  const modalEmail = searchParams.get("email");

  // State Management
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  // Form states for modals
  const [prodName, setProdName] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodPrice, setProdPrice] = useState(0);
  const [prodImage, setProdImage] = useState("");
  const [prodGrind, setProdGrind] = useState("Whole Bean");
  const [prodSize, setProdSize] = useState("250g");

  const [selectedUserRole, setSelectedUserRole] = useState("Customer");

  const closeModal = () => setSearchParams({});

  const handleShareLink = (type: string, idOrEmail?: string) => {
    const baseUrl = window.location.origin + window.location.pathname;
    const url = idOrEmail 
      ? `${baseUrl}?modal=${type}&${type === "user" ? "email" : "id"}=${idOrEmail}`
      : `${baseUrl}?modal=${type}`;
    
    navigator.clipboard.writeText(url);
    toast.success("Sharable action link copied to clipboard!");
  };

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const data = await api.orders.getAll();
      setOrders(data);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await api.products.getAll();
      setProducts(data);
    } catch {
      toast.error("Failed to load products from database");
    }
  };

  const [payments, setPayments] = useState<any[]>([]);
  const loadPayments = async () => {
    try {
      const data = await api.payments.getAll();
      setPayments(data);
    } catch {
      toast.error("Failed to load payments from database");
    }
  };

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const loadUsers = async () => {
    try {
      const data = await api.users.getAll();
      setUsers(data);
    } catch {
      toast.error("Failed to load users from database");
    }
  };

  useEffect(() => {
    const currentUser = api.getSessionUser();
    if (!currentUser || (currentUser.role || '').toLowerCase() !== 'admin') {
      setIsAdmin(false);
      toast.error("Access denied. Admin access only.");
      navigate("/register?mode=login&redirect=/admin");
    } else {
      setIsAdmin(true);
      loadOrders();
      loadProducts();
      loadPayments();
      loadUsers();
    }
  }, []);

  // Prepopulate form when edit-product modal is opened
  useEffect(() => {
    if (modalType === "edit-product" && modalId) {
      const found = products.find((p) => p.id === modalId);
      if (found) {
        setProdName(found.name);
        setProdDesc(found.description);
        setProdPrice(found.price);
        setProdImage(found.image);
        setProdGrind(found.grind);
        setProdSize(found.size);
      }
    } else if (modalType === "new-product") {
      setProdName("");
      setProdDesc("");
      setProdPrice(0);
      setProdImage("");
      setProdGrind("Whole Bean");
      setProdSize("250g");
    } else if (modalType === "user" && modalEmail) {
      const found = users.find((u) => u.email === modalEmail);
      if (found) {
        setSelectedUserRole(found.role);
      }
    }
  }, [modalType, modalId, modalEmail, products, users]);

  // Update order status
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await api.orders.updateStatus(orderId, newStatus);
      toast.success("Order status updated!");
      loadOrders();
      closeModal();
    } catch {
      toast.error("Network error updating status");
    }
  };

  // Submit product creation
  // Submit product creation
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodPrice) return;
    try {
      await api.products.create({
        id: prodName.toLowerCase().replace(/\s+/g, "-"),
        name: prodName,
        description: prodDesc,
        price: prodPrice,
        image: prodImage || "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400",
        grind: prodGrind,
        size: prodSize,
        tastingNotes: ["Rich", "Smooth"],
        details: prodDesc,
      });
      loadProducts();
      closeModal();
      toast.success("Product created!");
    } catch (err: any) {
      toast.error(err.message || "Failed to create product");
    }
  };

  // Submit product edit
  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalId) return;
    try {
      await api.products.update(modalId, {
        name: prodName,
        description: prodDesc,
        price: prodPrice,
        image: prodImage,
        grind: prodGrind,
        size: prodSize,
        details: prodDesc,
      });
      loadProducts();
      closeModal();
      toast.success("Product updated!");
    } catch (err: any) {
      toast.error(err.message || "Failed to update product");
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    if (confirm("Delete this product?")) {
      try {
        await api.products.delete(id);
        loadProducts();
        toast.success("Product deleted");
      } catch (err: any) {
        toast.error(err.message || "Failed to delete product");
      }
    }
  };

  // Change user role
  const handleUpdateUserRole = async () => {
    const targetUser = users.find((u) => u.email === modalEmail);
    if (!targetUser) {
      toast.error("User not found");
      return;
    }

    try {
      await api.users.updateRole(targetUser.id, selectedUserRole);
      loadUsers();
      closeModal();
      toast.success("User role updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to update user role");
    }
  };

  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center font-fredoka p-6">
        <div className="max-w-md w-full text-center space-y-4 bg-white p-8 rounded-3xl border border-zinc-150 shadow-sm">
          <ShieldAlert className="h-12 w-12 text-red-500 mx-auto" />
          <h1 className="text-2xl font-bold text-zinc-900">Access Denied</h1>
          <p className="text-zinc-500 text-sm">Only administrator accounts can access this panel.</p>
          <button
            onClick={() => navigate("/register")}
            className="w-full py-3 bg-[#b37e38] text-white rounded-full font-bold hover:bg-[#96652a] transition-colors"
          >
            Log In as Admin
          </button>
        </div>
      </div>
    );
  }

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center font-fredoka">
        <div className="text-center space-y-2">
          <div className="h-8 w-8 border-4 border-[#b37e38] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-zinc-500 text-sm font-semibold">Verifying permissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col lg:flex-row text-zinc-800">
      
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-[#2a221b] text-white shrink-0 flex flex-col">
        <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
          <img
            src="/lovable-uploads/zelani-logo.jpeg"
            alt="Zelani Logo"
            className="h-9 w-9 object-contain rounded-full"
          />
          <div>
            <h2 className="font-fredoka font-bold text-lg leading-tight">Zelani Admin</h2>
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">Management Console</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "dashboard"
                ? "bg-[#c89547] text-white shadow-md"
                : "text-zinc-300 hover:bg-zinc-850 hover:text-white"
            }`}
          >
            <LayoutDashboard className="h-4.5 w-4.5" />
            <span>Dashboard Hub</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "products"
                ? "bg-[#c89547] text-white shadow-md"
                : "text-zinc-300 hover:bg-zinc-850 hover:text-white"
            }`}
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            <span>Manage Products</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "orders"
                ? "bg-[#c89547] text-white shadow-md"
                : "text-zinc-300 hover:bg-zinc-850 hover:text-white"
            }`}
          >
            <Receipt className="h-4.5 w-4.5" />
            <span>Incoming Orders</span>
          </button>

          <button
            onClick={() => setActiveTab("payments")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "payments"
                ? "bg-[#c89547] text-white shadow-md"
                : "text-zinc-300 hover:bg-zinc-850 hover:text-white"
            }`}
          >
            <CreditCard className="h-4.5 w-4.5" />
            <span>Payments History</span>
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "users"
                ? "bg-[#c89547] text-white shadow-md"
                : "text-zinc-300 hover:bg-zinc-850 hover:text-white"
            }`}
          >
            <UsersIcon className="h-4.5 w-4.5" />
            <span>Registered Users</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        
        {/* Dashboard View */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-scale-in">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="font-fredoka text-3xl font-bold text-zinc-900">Dashboard Metrics Hub</h1>
                <p className="text-zinc-500 text-sm mt-0.5">Realtime sales, ordering performance, and product indicators</p>
              </div>
              <button 
                onClick={loadOrders} 
                className="bg-white border border-zinc-200 hover:bg-zinc-50 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
              >
                Refresh Data
              </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-zinc-155 p-6 rounded-2xl shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Total Sales</p>
                  <p className="text-2xl font-black text-zinc-900">
                    KES {(orders.filter(o => o.payment_status === "completed").reduce((a, c) => a + c.total_amount, 0) || 120400).toLocaleString()}
                  </p>
                </div>
                <div className="bg-[#fefaf0] border border-[#c89547]/20 p-3.5 rounded-full">
                  <DollarSign className="h-6 w-6 text-[#b37e38]" />
                </div>
              </div>

              <div className="bg-white border border-zinc-155 p-6 rounded-2xl shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Total Orders</p>
                  <p className="text-2xl font-black text-zinc-900">{orders.length || 14}</p>
                </div>
                <div className="bg-blue-50 border border-blue-100 p-3.5 rounded-full">
                  <PackageCheck className="h-6 w-6 text-blue-500" />
                </div>
              </div>

              <div className="bg-white border border-zinc-155 p-6 rounded-2xl shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Paid Transactions</p>
                  <p className="text-2xl font-black text-zinc-900">
                    {orders.filter(o => o.payment_status === "completed").length || 8}
                  </p>
                </div>
                <div className="bg-green-50 border border-green-100 p-3.5 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
              </div>

              <div className="bg-white border border-zinc-155 p-6 rounded-2xl shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">User Base</p>
                  <p className="text-2xl font-black text-zinc-900">{users.length} Customers</p>
                </div>
                <div className="bg-purple-50 border border-purple-100 p-3.5 rounded-full">
                  <UsersIcon className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Graphs Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white border border-zinc-150 p-6 rounded-2xl shadow-sm space-y-4">
                <h3 className="font-fredoka text-lg font-bold text-zinc-950">Daily Sales Growth</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#c89547" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#c89547" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} />
                      <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey="sales" stroke="#b37e38" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-zinc-150 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
                <h3 className="font-fredoka text-lg font-bold text-zinc-950 mb-4">Coffee Category Sales</h3>
                <div className="h-56 w-full relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4 text-xs font-semibold text-zinc-650">
                  {categoryData.map((cat, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                        <span>{cat.name}</span>
                      </div>
                      <span>{cat.value} Sales</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products View */}
        {activeTab === "products" && (
          <div className="space-y-6 animate-scale-in">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="font-fredoka text-3xl font-bold text-zinc-900">Manage Products</h1>
                <p className="text-zinc-500 text-sm mt-0.5">Create, edit, or delete items inside the catalog</p>
              </div>
              <button
                onClick={() => setSearchParams({ modal: "new-product" })}
                className="bg-[#c89547] hover:bg-[#b37e38] text-white rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </button>
            </div>

            <div className="bg-white border border-zinc-150 rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100 text-xs uppercase tracking-wider font-bold text-zinc-400">
                    <th className="p-4 pl-6">Product details</th>
                    <th className="p-4">Specs</th>
                    <th className="p-4">Price</th>
                    <th className="p-4 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-sm font-medium">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="p-4 pl-6 flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg shrink-0 border border-zinc-100" />
                        <div>
                          <p className="font-bold text-zinc-900">{p.name}</p>
                          <p className="text-xs text-zinc-450 truncate max-w-xs">{p.description}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-zinc-650">{p.size}</p>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase">{p.grind}</p>
                      </td>
                      <td className="p-4 font-bold text-zinc-800">
                        KES {p.price.toLocaleString()}
                      </td>
                      <td className="p-4 text-right pr-6 space-x-1">
                        <button
                          onClick={() => handleShareLink("edit-product", p.id)}
                          className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors hover:bg-zinc-100 rounded-full"
                          title="Share Edit Link"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setSearchParams({ modal: "edit-product", id: p.id })}
                          className="p-2 text-zinc-500 hover:text-[#b37e38] transition-colors hover:bg-zinc-100 rounded-full"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-2 text-zinc-500 hover:text-red-650 transition-colors hover:bg-zinc-100 rounded-full"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders View */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-scale-in">
            <div>
              <h1 className="font-fredoka text-3xl font-bold text-zinc-900">Incoming Orders</h1>
              <p className="text-zinc-500 text-sm mt-0.5">Manage customer purchase status and delivery references</p>
            </div>

            {loadingOrders ? (
              <div className="flex justify-center items-center py-12">
                <span className="h-8 w-8 border-2 border-[#b37e38]/30 border-t-[#b37e38] rounded-full animate-spin" />
              </div>
            ) : (
              <div className="bg-white border border-zinc-150 rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-100 text-xs uppercase tracking-wider font-bold text-zinc-400">
                      <th className="p-4 pl-6">Reference ID</th>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Total Price</th>
                      <th className="p-4">Payment Status</th>
                      <th className="p-4 text-right pr-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-sm font-medium">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-zinc-500 font-semibold">
                          No order records found in database.
                        </td>
                      </tr>
                    ) : (
                      orders.map((o) => (
                        <tr key={o.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="p-4 pl-6 font-mono text-zinc-900 text-xs font-semibold">{o.order_reference}</td>
                          <td className="p-4">
                            <p className="text-zinc-850 font-bold">{o.customer_email}</p>
                            <p className="text-xs text-zinc-400">{new Date(o.created_at).toLocaleString()}</p>
                          </td>
                          <td className="p-4 font-bold text-zinc-900">{o.currency} {o.total_amount.toLocaleString()}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 text-xs rounded-full border shadow-none font-bold uppercase tracking-wider ${
                              o.payment_status === "completed" 
                                ? "bg-green-50 text-green-700 border-green-100" 
                                : "bg-amber-50 text-amber-700 border-amber-100"
                            }`}>
                              {o.payment_status}
                            </span>
                          </td>
                          <td className="p-4 text-right pr-6 space-x-1">
                            <button
                              onClick={() => handleShareLink("order", o.id)}
                              className="p-2 text-zinc-450 hover:text-zinc-650 transition-colors hover:bg-zinc-100 rounded-full"
                              title="Share Order Update Link"
                            >
                              <Share2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setSearchParams({ modal: "order", id: o.id })}
                              className="bg-[#c89547] hover:bg-[#b37e38] text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-sm transition-all"
                            >
                              Manage Order
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Payments View */}
        {activeTab === "payments" && (
          <div className="space-y-6 animate-scale-in">
            <div>
              <h1 className="font-fredoka text-3xl font-bold text-zinc-900">Payments Audit Log</h1>
              <p className="text-zinc-500 text-sm mt-0.5">Logs of all payment transactions, checkouts, and channel routes</p>
            </div>

            <div className="bg-white border border-zinc-150 rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100 text-xs uppercase tracking-wider font-bold text-zinc-400">
                    <th className="p-4 pl-6">Transaction Date</th>
                    <th className="p-4">Billing Contact</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Reference</th>
                    <th className="p-4 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-sm font-medium">
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-zinc-500 font-semibold">
                        No transactions recorded.
                      </td>
                    </tr>
                  ) : (
                    payments.map((p) => (
                      <tr key={p.id} className="hover:bg-zinc-50/50 transition-colors">
                        <td className="p-4 pl-6 text-zinc-500 text-xs">{new Date(p.created_at).toLocaleString()}</td>
                        <td className="p-4 font-bold text-zinc-800">{p.order?.customer_email || "Anonymous Guest"}</td>
                        <td className="p-4">
                          <span className="flex items-center gap-2 text-zinc-650 font-semibold">
                            <CreditCard className="h-4 w-4 text-[#b37e38]" />
                            {p.payment_method}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-xs text-zinc-500">{p.order?.order_reference || "N/A"}</td>
                        <td className="p-4 text-right pr-6 space-x-1">
                          <button
                            onClick={() => handleShareLink("payment", p.id)}
                            className="p-2 text-zinc-450 hover:text-zinc-650 transition-colors hover:bg-zinc-100 rounded-full"
                            title="Share Payment View Link"
                          >
                            <Share2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setSearchParams({ modal: "payment", id: p.id })}
                            className="text-[10px] font-bold text-[#b37e38] hover:underline"
                          >
                            Audit
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users View */}
        {activeTab === "users" && (
          <div className="space-y-6 animate-scale-in">
            <div>
              <h1 className="font-fredoka text-3xl font-bold text-zinc-900">Registered Customers</h1>
              <p className="text-zinc-500 text-sm mt-0.5">Monitor registered user profiles and discount eligibility logs</p>
            </div>

            <div className="bg-white border border-zinc-150 rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100 text-xs uppercase tracking-wider font-bold text-zinc-400">
                    <th className="p-4 pl-6">Registered Member Email</th>
                    <th className="p-4">Joined Date</th>
                    <th className="p-4">Access Role</th>
                    <th className="p-4 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-sm font-medium">
                  {users.map((u, index) => (
                    <tr key={index} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="p-4 pl-6 font-bold text-zinc-900">{u.email}</td>
                      <td className="p-4 text-zinc-505 text-xs">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "N/A"}</td>
                      <td className="p-4 text-zinc-650">
                        <span className="bg-amber-50 text-[#b37e38] border border-amber-100 px-3 py-1 rounded-full text-xs font-bold uppercase">
                          {u.role || "Customer"}
                        </span>
                      </td>
                      <td className="p-4 text-right pr-6 space-x-1">
                        <button
                          onClick={() => handleShareLink("user", u.email)}
                          className="p-2 text-zinc-450 hover:text-zinc-650 transition-colors hover:bg-zinc-100 rounded-full"
                          title="Share User Control Link"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setSearchParams({ modal: "user", email: u.email })}
                          className="text-[10px] font-bold text-[#b37e38] hover:underline"
                        >
                          Edit Role
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* SHAREABLE MODALS COMPONENT REGISTRY */}

      {/* Product Create/Edit Modal */}
      <Dialog open={modalType === "new-product" || modalType === "edit-product"} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-md bg-[#faf9f6] rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="font-fredoka text-xl font-bold text-zinc-900">
              {modalType === "new-product" ? "Create New Product" : "Modify Catalog Product"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={modalType === "new-product" ? handleAddProduct : handleEditProduct} className="space-y-4 pt-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase">Product Title</label>
              <Input required value={prodName} onChange={(e) => setProdName(e.target.value)} className="bg-white rounded-full" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase">Price (KES)</label>
              <Input required type="number" value={prodPrice} onChange={(e) => setProdPrice(Number(e.target.value))} className="bg-white rounded-full" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase">Product Image</label>
              <div className="flex flex-col gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setProdImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2 text-sm text-zinc-800 outline-none focus:border-zinc-400 transition-all file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#c89547]/10 file:text-[#b37e38] hover:file:bg-[#c89547]/20 cursor-pointer"
                />
                {prodImage && (
                  <div className="relative w-full h-32 rounded-xl overflow-hidden border border-zinc-200 shadow-inner">
                    <img
                      src={prodImage}
                      alt="Product Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setProdImage("")}
                      className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white rounded-full p-1.5 transition-all shadow-md"
                      title="Remove Image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 uppercase">Size</label>
                <Input value={prodSize} onChange={(e) => setProdSize(e.target.value)} className="bg-white rounded-full" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 uppercase">Grind Options</label>
                <Input value={prodGrind} onChange={(e) => setProdGrind(e.target.value)} className="bg-white rounded-full" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-500 uppercase">Description Details</label>
              <textarea
                value={prodDesc}
                onChange={(e) => setProdDesc(e.target.value)}
                rows={3}
                className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-2 text-sm text-zinc-800 outline-none focus:border-zinc-400 transition-all"
              />
            </div>
            <DialogFooter className="pt-4 flex-col sm:flex-row gap-2">
              <Button type="button" variant="outline" onClick={closeModal} className="rounded-full">Cancel</Button>
              <Button type="submit" className="bg-[#c89547] hover:bg-[#b37e38] text-white rounded-full">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Shareable Order Management Modal */}
      <Dialog open={modalType === "order" && !!modalId} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-lg bg-[#faf9f6] rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="font-fredoka text-xl font-bold text-zinc-900">
              Manage Order Reference
            </DialogTitle>
          </DialogHeader>
          
          {(() => {
            const order = orders.find(o => o.id === modalId || o.order_reference === modalId);
            if (!order) return <p className="py-4 text-center text-zinc-500 text-sm">Order not found.</p>;

            return (
              <div className="space-y-5 pt-4">
                <div className="bg-white rounded-xl p-4 border border-zinc-150 grid grid-cols-2 gap-4 text-xs font-semibold">
                  <div>
                    <span className="text-zinc-400 block uppercase">Reference</span>
                    <span className="text-zinc-800 font-mono">{order.order_reference}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block uppercase">Placed Date</span>
                    <span className="text-zinc-800">{new Date(order.created_at).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block uppercase">Email</span>
                    <span className="text-zinc-800">{order.customer_email}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block uppercase">Total Amount</span>
                    <span className="text-[#c89547] text-sm font-bold">{order.currency} {order.total_amount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-bold text-zinc-400">Order Line-Items</h4>
                  <div className="max-h-28 overflow-y-auto space-y-2 pr-1 text-sm font-medium">
                    {order.order_items?.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-zinc-700">{item.product_name} <span className="text-xs text-zinc-450">({item.size})</span></span>
                        <span className="text-zinc-500">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-zinc-100">
                  <label className="text-xs uppercase font-bold text-zinc-400 block">Update Payment Status</label>
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      onClick={() => handleUpdateOrderStatus(order.id, "completed")}
                      className="bg-green-600 hover:bg-green-700 text-white rounded-full flex-1 text-xs"
                    >
                      Completed
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => handleUpdateOrderStatus(order.id, "pending")}
                      className="bg-amber-500 hover:bg-amber-600 text-white rounded-full flex-1 text-xs"
                    >
                      Pending
                    </Button>
                  </div>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Shareable Payments Audit Modal */}
      <Dialog open={modalType === "payment" && !!modalId} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-md bg-[#faf9f6] rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="font-fredoka text-xl font-bold text-zinc-900">
              Payment Audit Details
            </DialogTitle>
          </DialogHeader>
          
          {(() => {
            const order = orders.find(o => o.id === modalId || o.order_reference === modalId);
            if (!order) return <p className="py-4 text-center text-zinc-500 text-sm">Transaction records not found.</p>;

            return (
              <div className="space-y-4 pt-4">
                <div className="bg-white border border-zinc-150 p-5 rounded-xl space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-450 font-semibold">Payment Gateway</span>
                    <span className="font-bold text-zinc-800">
                      {order.customer_phone?.startsWith("254") ? "M-Pesa STK Push" : "Card Secure Checkout"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-450 font-semibold">Billing Contact</span>
                    <span className="font-bold text-zinc-800">{order.customer_email}</span>
                  </div>
                  {order.customer_phone && (
                    <div className="flex justify-between">
                      <span className="text-zinc-450 font-semibold">Phone Number</span>
                      <span className="font-mono text-zinc-800 font-bold">{order.customer_phone}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-zinc-450 font-semibold">Transaction Date</span>
                    <span className="text-zinc-700 font-medium">{new Date(order.created_at).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-zinc-100">
                    <span className="text-zinc-450 font-bold">Total Settled</span>
                    <span className="text-[#c89547] font-extrabold text-base">{order.currency} {order.total_amount.toLocaleString()}</span>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" onClick={closeModal} className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-full">
                    Close Audit Details
                  </Button>
                </DialogFooter>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Shareable User Role Modal */}
      <Dialog open={modalType === "user" && !!modalEmail} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-md bg-[#faf9f6] rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="font-fredoka text-xl font-bold text-zinc-900">
              Update Registered User Role
            </DialogTitle>
          </DialogHeader>

          {(() => {
            const user = users.find(u => u.email === modalEmail);
            if (!user) return <p className="py-4 text-center text-zinc-500 text-sm">User record not found.</p>;

            return (
              <div className="space-y-4 pt-4">
                <div className="bg-white border border-zinc-150 p-4 rounded-xl text-sm space-y-1">
                  <p className="text-xs text-zinc-400 font-bold uppercase">Customer Profile</p>
                  <p className="font-bold text-zinc-850 text-base">{user.email}</p>
                  <p className="text-xs text-zinc-500 font-medium">Joined on {user.joined} • {user.type}</p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-zinc-500 block pl-0.5">Assign Access Level Role</label>
                  <select
                    value={selectedUserRole}
                    onChange={(e) => setSelectedUserRole(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-full px-4 h-11 text-sm text-zinc-800 outline-none focus:border-zinc-400 transition-all font-semibold"
                  >
                    <option value="Customer">Customer (Standard Base Access)</option>
                    <option value="Roaster">Roaster (Inventory Management)</option>
                    <option value="Admin">Admin (Full Control Dashboard)</option>
                  </select>
                </div>

                <DialogFooter className="pt-4 flex-col sm:flex-row gap-2">
                  <Button type="button" variant="outline" onClick={closeModal} className="rounded-full">Cancel</Button>
                  <Button type="button" onClick={handleUpdateUserRole} className="bg-[#c89547] hover:bg-[#b37e38] text-white rounded-full">
                    Update Access Role
                  </Button>
                </DialogFooter>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

    </div>
  );
}
