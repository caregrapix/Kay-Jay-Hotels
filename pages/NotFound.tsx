
import * as React from 'react';
// FIX: Corrected import statement for react-router-dom to resolve module export errors.
import { Link } from 'react-router-dom';
import PageMetadata from '../components/PageMetadata';
import SearchBar from '../components/SearchBar';

const NotFound: React.FC = () => {
  return (
    <>
      <PageMetadata
        title="404: Page Not Found | Kayjay Hotels"
        description="The page you are looking for could not be found. Let us help you find your way."
      />
      <div className="relative bg-brand-gray">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/public/images/kay-jay-palms/garden.jpg')" }}
        />
        <div className="relative flex items-center justify-center min-h-[calc(100vh-200px)] py-16 px-6">
          <div className="text-center p-8 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-xl">
            <h1 className="text-6xl md:text-8xl font-extrabold text-brand-primary tracking-tight">404</h1>
            <h2 className="mt-2 text-2xl md:text-4xl font-sans font-bold text-brand-dark">
              Oops! Page Not Found.
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              It looks like you've taken a wrong turn. The page you're looking for doesn't exist or may have been moved.
            </p>

            <div className="mt-8 max-w-sm mx-auto">
              <p className="text-sm font-semibold text-gray-700 mb-2">Let's find what you're looking for:</p>
              <div className="w-full">
                <SearchBar />
              </div>
            </div>

            <div className="mt-10">
              <p className="text-sm text-gray-600 mb-4">Or, navigate to one of our main pages:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/"
                  className="bg-brand-primary text-white font-bold py-3 px-6 rounded-md hover:bg-brand-dark transition-all duration-300"
                >
                  Go to Homepage
                </Link>
                <Link
                  to="/properties"
                  className="bg-gray-700 text-white font-bold py-3 px-6 rounded-md hover:bg-brand-dark transition-all duration-300"
                >
                  View Our Properties
                </Link>
                <Link
                  to="/contact"
                  className="bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-md hover:bg-gray-300 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;