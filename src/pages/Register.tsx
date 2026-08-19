import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";
import { UserPlus, LogIn, ArrowRight } from "lucide-react";

const Register = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      if (!formData.email || !formData.password) {
        toast.error("Please fill in all fields");
        return;
      }
      toast.success("Login successful!");
      navigate("/");
    } else {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        toast.error("Please fill in all fields");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      toast.success("Account created successfully!");
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col font-jost">
      <Navigation />
      
      {/* Spacer for fixed nav */}
      <div className="h-24 bg-transparent" />

      {/* Main Registration Layout */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative backgrounds */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-zinc-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-zinc-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-white border border-zinc-100 rounded-[2.5rem] p-8 sm:p-10 shadow-xl relative z-10 transition-all duration-300">
          
          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            {/* Logo */}
            <div className="flex justify-center mb-4">
            <img
              src="/lovable-uploads/zelani-star-logo.png"
              alt="Zelani Logo"
              className="h-12 w-12 object-contain"
            />
            </div>
            
            <h2 className="font-fredoka text-3xl font-bold text-zinc-900">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-zinc-500 text-sm font-inter">
              {isLogin ? "Log in to your Zelani account" : "Join Zelani Coffee for exclusive updates"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-1.5 text-left">
                <label htmlFor="name" className="text-xs font-bold text-zinc-600 uppercase tracking-wider pl-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-full px-5 py-3.5 text-sm text-zinc-800 outline-0 focus:bg-white focus:border-zinc-450 transition-all"
                />
              </div>
            )}

            <div className="space-y-1.5 text-left">
              <label htmlFor="email" className="text-xs font-bold text-zinc-600 uppercase tracking-wider pl-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-full px-5 py-3.5 text-sm text-zinc-800 outline-0 focus:bg-white focus:border-zinc-450 transition-all"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label htmlFor="password" className="text-xs font-bold text-zinc-600 uppercase tracking-wider pl-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-full px-5 py-3.5 text-sm text-zinc-800 outline-0 focus:bg-white focus:border-zinc-450 transition-all"
              />
            </div>

            {!isLogin && (
              <div className="space-y-1.5 text-left">
                <label htmlFor="confirmPassword" className="text-xs font-bold text-zinc-600 uppercase tracking-wider pl-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-full px-5 py-3.5 text-sm text-zinc-800 outline-0 focus:bg-white focus:border-zinc-450 transition-all"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full py-4 text-sm font-semibold tracking-wider transition-all duration-200 shadow-md hover:shadow-lg mt-6"
            >
              <span>{isLogin ? "SIGN IN" : "REGISTER"}</span>
              {isLogin ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
            </button>
          </form>

          {/* Toggle link */}
          <div className="mt-8 text-center text-sm text-zinc-500 font-inter">
            <span>{isLogin ? "New to Zelani Coffee? " : "Already have an account? "}</span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-zinc-900 font-bold hover:underline"
            >
              {isLogin ? "Create Account" : "Sign In"}
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
