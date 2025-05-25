// src/pages/ApodPage.tsx
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { Image } from 'lucide-react';
import { fetchApod } from '../data/api';

export default function ApodPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApod()
      .then(json => setData(json))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <div className="mt-1 bg-accent-900/40 p-3 rounded-lg text-accent-400">
            <Image className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Astronomy Picture of the Day</h1>
            <p className="text-slate-400">
              {loading
                ? 'Fetching today’s cosmic snapshot…'
                : error
                  ? 'Oops—couldn’t load APOD.'
                  : data.title}
            </p>
          </div>
        </div>

        {/* Body */}
        {loading ? (
          <p className="text-slate-400">Loading…</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="bg-slate-800 bg-opacity-60 rounded-2xl overflow-hidden shadow-xl">
            <img
              src={data.url}
              alt={data.title}
              className="w-full object-cover"
            />
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-500 italic">{data.date}</p>
              <p className="text-base leading-relaxed text-white">
                {data.explanation}
              </p>
              {data.copyright && (
                <p className="text-xs text-slate-500">
                  © {data.copyright}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
