export const ExploreSection = () => {
  const categories = [
    {
      title: "Brewing Workshops",
      description: "Learn the art of crafting the perfect pour-over, espresso, and latte art with our master baristas.",
      buttonText: "BOOK A WORKSHOP",
      icon: (
        <svg className="w-16 h-16 text-zinc-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeDasharray="3 3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 12h2a2 2 0 002-2V8a2 2 0 00-2-2h-2" />
        </svg>
      )
    },
    {
      title: "Micro-Lot Beans",
      description: "Take the experience home with our ethically sourced, fresh single-origin beans and custom roasts.",
      buttonText: "SHOP ROASTS",
      icon: (
        <svg className="w-16 h-16 text-zinc-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14l1 12H4L5 8z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 8V5a3 3 0 016 0v3" />
        </svg>
      )
    },
    {
      title: "Guided Tastings",
      description: "Join guided cupping sessions led by our roasters to explore unique flavour notes and origins.",
      buttonText: "RESERVE SPOT",
      icon: (
        <svg className="w-16 h-16 text-zinc-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c2.5 0 4.5-2 4.5-4.5S14.5 5 12 5 7.5 7 7.5 9.5 9.5 14 12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 21h6" />
        </svg>
      )
    }
  ];

  return (
    <section id="speciality" className="relative py-24 bg-white overflow-hidden">
      {/* Floating cup top-view ornament on the left */}
      <div className="absolute left-[-80px] top-[10%] w-48 h-48 opacity-25 pointer-events-none transform -rotate-45">
        <img
          src="/lovable-uploads/f42a61be-a3d1-4468-969e-6f230e8f47e9.png"
          alt="Decorative Coffee Cup Top View"
          className="w-full h-auto"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="font-fredoka text-4xl sm:text-5xl font-bold text-zinc-900">
            Explore Our Zelani Coffee
          </h2>
          <p className="text-zinc-500 font-inter text-sm sm:text-base leading-relaxed">
            A slice of heaven. Buy Zelani Coffee from the convenience of your own home and office.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="bg-white border border-zinc-100/80 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center space-y-6 group hover:translate-y-[-4px]"
            >
              {/* Icon Container */}
              <div className="bg-zinc-50 p-6 rounded-2xl group-hover:bg-zinc-100/50 transition-colors duration-300">
                {category.icon}
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="font-fredoka text-xl font-bold text-zinc-900">
                  {category.title}
                </h3>
                <p className="text-zinc-500 text-sm font-inter leading-relaxed max-w-[240px]">
                  {category.description}
                </p>
              </div>

              {/* Action Button */}
              <button className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-6 py-3 text-xs font-semibold tracking-wider transition-all duration-200 mt-auto shadow-sm group-hover:shadow-md">
                {category.buttonText}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
