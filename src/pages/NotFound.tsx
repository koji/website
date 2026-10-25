import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-notion-surface">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-6xl font-bold text-notion-ink mb-4">404</h1>
        <p className="text-xl text-notion-slate mb-8">Oops! Page not found</p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="text-notion-purple hover:text-notion-purple-pressed underline transition-colors"
          >
            Return to Home
          </Link>
          <Link
            to="/terminal"
            className="text-notion-purple hover:text-notion-purple-pressed underline transition-colors"
          >
            Open the terminal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
