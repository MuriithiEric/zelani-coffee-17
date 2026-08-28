import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export const CustomerReviewsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Naomi White",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      text: "Zelani Delicious Coffee is a coffee shop that sells high quality coffee and food. We use high quality ingredients to make our coffee and food. Order now and enjoy your food."
    },
    {
      id: 2,
      name: "Imran White",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      text: "Zelani Delicious Coffee is a coffee shop that sells high quality coffee and food. We use high quality ingredients to make our coffee and food. Order now and enjoy your food."
    },
    {
      id: 3,
      name: "Sarah Jenkins",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      text: "Zelani Delicious Coffee is a coffee shop that sells high quality coffee and food. We use high quality ingredients to make our coffee and food. Order now and enjoy your food."
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="testimonials" className="relative py-24 bg-[#faf9f6] overflow-hidden">
      {/* Floating cup on bottom right sticking out */}
      <div className="absolute right-[-100px] bottom-[-50px] w-72 h-72 opacity-25 pointer-events-none transform rotate-12">
        <img
          src="/lovable-uploads/f42a61be-a3d1-4468-969e-6f230e8f47e9.png"
          alt="Decorative Coffee Cup"
          className="w-full h-auto"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and Rating */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6">
            <h2 className="font-fredoka text-4xl sm:text-5xl font-bold text-zinc-900 leading-tight">
              What Our <br />
              Customers Say
            </h2>

            <div className="flex items-center space-x-4">
              <span className="font-fredoka text-4xl font-bold text-zinc-900">4.9</span>
              <div className="space-y-1">
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-zinc-500 text-xs font-inter">
                  1k+ Reviews from our customers
                </p>
              </div>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex space-x-3 pt-2">
              <button
                onClick={handlePrev}
                className="bg-white border border-zinc-200 p-3 rounded-full hover:bg-zinc-900 hover:text-white transition-all duration-200 shadow-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="bg-white border border-zinc-200 p-3 rounded-full hover:bg-zinc-900 hover:text-white transition-all duration-200 shadow-sm"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Slider Cards */}
          <div className="lg:col-span-7 relative flex items-center min-h-[300px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {[0, 1].map((offset) => {
                const index = (activeIndex + offset) % reviews.length;
                const review = reviews[index];
                return (
                  <div
                    key={review.id}
                    className="bg-white border border-zinc-100 rounded-[2rem] p-8 shadow-sm hover:shadow-lg transition-all duration-350 flex flex-col space-y-6 transform hover:translate-y-[-4px]"
                  >
                    {/* User profile row */}
                    <div className="flex items-center space-x-4">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-14 h-14 rounded-full object-cover border border-zinc-100"
                      />
                      <div>
                        <h4 className="font-fredoka text-lg font-bold text-zinc-950">
                          {review.name}
                        </h4>
                        <div className="flex space-x-0.5 pt-0.5">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Testimonial text */}
                    <p className="text-zinc-500 font-inter text-sm leading-relaxed">
                      "{review.text}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
