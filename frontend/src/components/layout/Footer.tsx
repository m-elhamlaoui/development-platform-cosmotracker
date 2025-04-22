import React from 'react';
import { Moon, Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Moon className="h-6 w-6 text-primary-500" />
            <span className="ml-2 text-lg font-bold text-white">CosmoTracker</span>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-slate-400 hover:text-primary-500 transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-primary-500 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-primary-500 transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} CosmoTracker. All rights reserved.
            </p>
          </div>
        </div>
        
        <div className="mt-8 border-t border-slate-800 pt-8 text-center md:text-start">
          <p className="text-xs text-slate-500">
            Data sources include NASA, International Meteor Organization, and other astronomical institutions.
            CosmoTracker is not affiliated with these organizations.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;