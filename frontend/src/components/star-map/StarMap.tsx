import React, { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import * as Astronomy from 'astronomy-engine';

interface CelestialBody {
  name: string;
  size: number;
  color: string;
  type: 'star' | 'planet';
  distance: number; // in AU
  velocity: number; // in km/s
  angle: number; // orbital angle in radians
}

const AU_IN_PIXELS = 60;
const AU_KM = 149597870.7;

const getSize = (name: string) => {
  const map: Record<string, number> = {
    Mercury: 6, Venus: 10, Earth: 12, Mars: 9,
    Jupiter: 16, Saturn: 14, Uranus: 13, Neptune: 13
  };
  return map[name] || 8;
};

const getColor = (name: string) => {
  const map: Record<string, string> = {
    Mercury: '#A0522D', Venus: '#DEB887', Earth: '#4169E1', Mars: '#CD5C5C',
    Jupiter: '#DAA520', Saturn: '#F4A460', Uranus: '#40E0D0', Neptune: '#4682B4'
  };
  return map[name] || '#FFFFFF';
};

const getVelocity = (sideralOrbitDays: number) => {
  const T = sideralOrbitDays * 86400;
  return T ? (2 * Math.PI * AU_KM) / T : 0;
};

const getAngle = (planetName: string) => {
  try {
    const date = new Date();
    const planet = Astronomy.Body[planetName as keyof typeof Astronomy.Body];
    const vec = Astronomy.HelioVector(planet, date);
    return Math.atan2(vec.y, vec.x);
  } catch {
    return Math.random() * 2 * Math.PI; // fallback
  }
};

const planetNameMap: Record<string, string> = {
  Mercury: 'Mercury',
  Venus: 'Venus',
  Earth: 'Earth',
  Mars: 'Mars',
  Jupiter: 'Jupiter',
  Saturn: 'Saturn',
  Uranus: 'Uranus',
  Neptune: 'Neptune'
};

const StarMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bodies, setBodies] = useState<CelestialBody[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const res = await fetch("https://api.le-systeme-solaire.net/rest/bodies/");
        const data = await res.json();

        const planets = data.bodies
          .filter((body: any) => body.isPlanet && planetNameMap[body.englishName])
          .map((body: any): CelestialBody => ({
            name: body.englishName,
            size: getSize(body.englishName),
            color: getColor(body.englishName),
            type: 'planet',
            distance: body.semimajorAxis / AU_KM,
            velocity: getVelocity(body.sideralOrbit),
            angle: getAngle(planetNameMap[body.englishName])
          }));

        setBodies([
          {
            name: 'Sun',
            size: 20,
            color: '#FFD700',
            type: 'star',
            distance: 0,
            velocity: 0,
            angle: 0
          },
          ...planets
        ]);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch planetary data:', err);
        setError('Could not load planetary data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || bodies.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    bodies.forEach(body => {
      const r = body.distance * AU_IN_PIXELS;
      const x = centerX + r * Math.cos(body.angle);
      const y = centerY + r * Math.sin(body.angle);

      if (body.type === 'planet') {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(x, y, body.size, 0, 2 * Math.PI);
      ctx.fillStyle = body.color;
      ctx.fill();

      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(body.name, x, y + body.size + 12);
    });
  }, [bodies]);

  return (
    <div className="relative w-full h-[400px] bg-slate-900 rounded-lg overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
          <div className="text-white text-center">
            <Star className="h-8 w-8 animate-spin mx-auto mb-2" />
            <p>Loading planetary data...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-4 bg-slate-800/80 p-2 rounded-lg text-sm text-slate-300">
        <p>Planet Positions Viewer</p>
        <p className="text-xs text-slate-400">
          Real-time orbital angles • Snapshot at: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default StarMap;