import * as React from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, placeholderClassName }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          observer.unobserve(img);
        }
      },
      {
        rootMargin: '100px', // Load images 100px before they enter the viewport
      }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  const placeholderStyle: React.CSSProperties = {
    backgroundColor: '#F3F4F6', // brand-gray
    transition: 'opacity 0.3s ease-in-out',
    opacity: isLoaded ? 0 : 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div 
        className={placeholderClassName}
        style={placeholderStyle}
      />
      <img
        ref={imgRef}
        data-src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleLoad}
        loading="lazy"
      />
    </div>
  );
};

export default LazyImage;
