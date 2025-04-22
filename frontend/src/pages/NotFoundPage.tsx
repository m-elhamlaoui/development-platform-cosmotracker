import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4 text-center">
        <h1 className="text-7xl font-bold text-primary-500 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-slate-400 max-w-md mb-8">
          The cosmic coordinates you're looking for don't exist in this universe. 
          Let's navigate back to a known location.
        </p>
        <Button>
          <Home className="mr-2 h-4 w-4" />
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFoundPage;