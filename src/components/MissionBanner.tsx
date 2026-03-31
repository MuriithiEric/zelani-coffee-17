export const MissionBanner = () => {
  return (
    <section className="py-20 bg-cream-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-coffee-800 mb-6">
          Our mission is to bring incredible Kenyan coffee to the world — ethically and sustainably.
        </h2>
        <div className="flex flex-wrap justify-center gap-8 mt-10 text-coffee-600 font-semibold text-lg">
          <span>Grown in Kirinyaga.</span>
          <span className="text-gold-600">•</span>
          <span>Roasted with Purpose.</span>
          <span className="text-gold-600">•</span>
          <span>Delivered to You.</span>
        </div>
      </div>
    </section>
  );
};
