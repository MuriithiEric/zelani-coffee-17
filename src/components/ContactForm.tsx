import { useState } from "react";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { toast } from "sonner";

export const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Thank you! We will get in touch with you shortly.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-white overflow-hidden border-t border-zinc-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Info & Details */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <h2 className="font-fredoka text-4xl sm:text-5xl font-bold text-zinc-900 leading-tight">
                Get In Touch
              </h2>
              <p className="text-zinc-500 font-inter text-sm sm:text-base leading-relaxed">
                Have questions about our roasts, sourcing, or custom orders? Drop us a line and our coffee experts will help you out.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-zinc-50 p-3 rounded-full border border-zinc-100 shadow-sm">
                  <MapPin className="h-5 w-5 text-zinc-800" />
                </div>
                <div>
                  <h4 className="font-fredoka text-sm font-bold text-zinc-900">Our Roastery</h4>
                  <p className="text-zinc-500 text-xs">Kirinyaga Highlands, Kenya</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-zinc-50 p-3 rounded-full border border-zinc-100 shadow-sm">
                  <Phone className="h-5 w-5 text-zinc-800" />
                </div>
                <div>
                  <h4 className="font-fredoka text-sm font-bold text-zinc-900">Phone</h4>
                  <p className="text-zinc-500 text-xs">+1 234 567 890</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-zinc-50 p-3 rounded-full border border-zinc-100 shadow-sm">
                  <Mail className="h-5 w-5 text-zinc-800" />
                </div>
                <div>
                  <h4 className="font-fredoka text-sm font-bold text-zinc-900">Email</h4>
                  <p className="text-zinc-500 text-xs">hello@zelanicoffee.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-zinc-50/50 border border-zinc-100 rounded-[2.5rem] p-8 sm:p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2 text-left">
                  <label htmlFor="name" className="text-xs font-bold text-zinc-700 uppercase tracking-wider pl-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-white border border-zinc-200 rounded-full px-5 py-4 text-sm text-zinc-800 outline-0 focus:border-zinc-400 transition-colors shadow-sm"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label htmlFor="email" className="text-xs font-bold text-zinc-700 uppercase tracking-wider pl-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-white border border-zinc-200 rounded-full px-5 py-4 text-sm text-zinc-800 outline-0 focus:border-zinc-400 transition-colors shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2 text-left">
                <label htmlFor="message" className="text-xs font-bold text-zinc-700 uppercase tracking-wider pl-1">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you're looking for..."
                  rows={4}
                  className="w-full bg-white border border-zinc-200 rounded-[2rem] px-5 py-4 text-sm text-zinc-800 outline-0 focus:border-zinc-400 transition-colors shadow-sm resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-8 py-4 text-sm font-semibold tracking-wider transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <span>SEND MESSAGE</span>
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
