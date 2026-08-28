
import { MapPin, Phone, Mail, Clock, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const ContactSection = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      details: "APA Arcade, Hurlingham, Nairobi"
    },
    {
      icon: Globe,
      title: "Website",
      details: "zelanicoffee.com"
    },
    {
      icon: Clock,
      title: "Open Hours",
      details: "Monday - Saturday: 08:00 - 18:00"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-coffee-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-coffee-800 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-coffee-600 max-w-2xl mx-auto">
            Visit us at our Hurlingham office or check out our website for more information about our premium Kenyan coffee.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="coffee-shadow border-0 text-center">
                <CardContent className="p-8">
                  <div className="bg-coffee-600 p-4 rounded-lg mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                    <info.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-coffee-800 mb-2 text-lg">
                    {info.title}
                  </h4>
                  <p className="text-coffee-600">
                    {info.details}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* About Zelani Coffee */}
          <Card className="coffee-shadow border-0 mt-12">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <img 
                  src="/lovable-uploads/67d30343-8f62-4dd8-995c-f4ebbb149ca1.png" 
                  alt="Zelani Coffee Logo" 
                  className="h-16 w-16"
                />
              </div>
              <h3 className="font-playfair text-2xl font-semibold text-coffee-800 mb-4">
                About Zelani Coffee
              </h3>
              <p className="text-coffee-600 leading-relaxed max-w-3xl mx-auto">
                Zelani Coffee is a Kenyan brand offering 100% pure Arabica coffee, inspired by Ethiopia, 
                the birthplace of coffee. We support fairchain practices, advocating for the rights of 
                farmers and cooperatives in Kenya. Our coffee is sourced from the highlands of Mt. Kenya, 
                specifically Mwirua in Kirinyaga County, and we aim to bring rich, great-tasting coffee 
                into homes while promoting fair trade and sustainability.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
