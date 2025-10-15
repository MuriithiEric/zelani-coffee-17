export const StorySection = () => {
  return (
    <section id="story" className="py-20 bg-cream-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-coffee-800 mb-6">
            The Nomad's Journey
          </h2>
          
          <div className="w-20 h-1 bg-gold-500 mx-auto mb-8"></div>
          
          <p className="text-lg md:text-xl text-coffee-700 leading-relaxed mb-6">
            <span className="font-semibold text-gold-600">Zelani</span> means <em>nomad</em> or <em>traveler</em> — 
            a tribute to those who seek, explore, and embrace the journey.
          </p>
          
          <p className="text-lg text-coffee-600 leading-relaxed mb-6">
            Rooted in the rich volcanic soils of <strong>Kirinyaga County</strong>, our coffee is grown by 
            smallholder farmers who pour their heritage into every bean. We believe great coffee starts 
            with ethical sourcing and ends with a cup that celebrates movement, creativity, and human connection.
          </p>
          
          <p className="text-lg text-coffee-600 leading-relaxed">
            Every bag you brew supports a <strong>purpose-driven supply chain</strong> — one that values 
            quality, transparency, and the stories behind each harvest. Whether you're fueling an adventure 
            or savoring a quiet moment, Zelani is coffee for those who choose to live fully.
          </p>
        </div>
      </div>
    </section>
  );
};
