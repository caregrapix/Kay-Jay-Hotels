
import * as React from 'react';

const slides = [
  {
    image: "/public/images/kay-jay-beach-house/hero.jpg",
    title: "Unforgettable Stays in Sri Lanka",
    description: "Experience luxury in every detail across our collection of unique hotels, each offering a distinct taste of the island's diverse beauty."
  },
  {
    image: "/public/images/kayjay-amorea/beach.jpg", 
    title: "KayJay Amorea – Your Serene Coastal Retreat",
    description: "Discover your tranquil escape at KayJay Amorea, a boutique beach hotel in Wattala. Just 30 minutes from Colombo, it’s perfect for romantic getaways or peaceful family holidays."
  },
  {
    image: "/public/images/kay-jay-palms/hero.jpg",
    title: "Colonial Charm in Nature’s Embrace",
    description: "Relax in a 75-acre palm estate surrounded by lush greenery and timeless architecture."
  },
  {
    image: "/public/images/kay-jay-wild/hero.jpg",
    title: "Safari Adventures at Wilpattu",
    description: "Experience authentic wildlife escapes with guided safaris and bonfire nights."
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollToProperties = () => {
    const propertiesSection = document.getElementById('properties');
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { image, title, description } = slides[currentSlide];

  return (
    <div className="relative h-[calc(100vh-80px)] w-full flex items-center justify-center text-center text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      {/* Discount Banner */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20 text-center pointer-events-none">
        <div className="bg-brand-primary/95 text-white w-32 h-32 md:w-40 md:h-40 rounded-full flex flex-col items-center justify-center p-2 shadow-xl transform -rotate-12">
          <span className="text-3xl md:text-4xl font-extrabold leading-tight">15%</span>
          <span className="font-semibold uppercase tracking-wide text-sm md:text-base">OFF</span>
          <span className="text-xs md:text-sm leading-tight px-1">On Commercial & HNB Credit Cards</span>
        </div>
      </div>

      {/* Content */}
      <div key={currentSlide} className="relative z-10 p-6 animate-slide">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-sans drop-shadow-xl transition-opacity duration-1000">
          {title}
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto drop-shadow-lg transition-opacity duration-1000">
          {description}
        </p>
        <button
          onClick={scrollToProperties}
          className="mt-8 bg-brand-primary text-white font-bold py-3 px-8 rounded-md hover:bg-white hover:text-brand-primary transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Explore Our Properties
        </button>
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 p-3 rounded-full hover:bg-black/70 transition"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 p-3 rounded-full hover:bg-black/70 transition"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            } transition-all duration-300`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
