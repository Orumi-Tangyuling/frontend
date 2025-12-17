'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoieW9uZ3dvb24iLCJhIjoiY21qNm93cXJlMGdyejNmcTJzMGVrZHNyZCJ9.MWEH1d2ExoNoykCYtndGGw';

interface DataPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  value: number;
  level: 'low' | 'medium' | 'high';
}

const oceanData: DataPoint[] = [
  { id: '1', name: '애월해안', lat: 33.4672, lng: 126.3119, value: 140, level: 'high' },
  { id: '2', name: '조천해안', lat: 33.5440, lng: 126.7180, value: 114, level: 'high' },
  { id: '3', name: '예래해안', lat: 33.2526, lng: 126.2516, value: 87, level: 'high' },
  { id: '4', name: '한림해안', lat: 33.3960, lng: 126.2400, value: 53, level: 'medium' },
  { id: '5', name: '성산해안', lat: 33.4525, lng: 126.9246, value: 115, level: 'high' },
  { id: '6', name: '중문해안', lat: 33.2474, lng: 126.4133, value: 73, level: 'medium' },
  { id: '7', name: '구좌해안', lat: 33.5314, lng: 126.9885, value: 95, level: 'high' },
  { id: '8', name: '표선해안', lat: 33.3567, lng: 126.9136, value: 68, level: 'medium' },
  { id: '9', name: '안덕해안', lat: 33.2520, lng: 126.2520, value: 82, level: 'high' },
  { id: '10', name: '남원해안', lat: 33.2540, lng: 126.6440, value: 45, level: 'medium' },
  { id: '11', name: '대정해안', lat: 33.1928, lng: 126.2380, value: 59, level: 'medium' },
];

export default function JejuOceanMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [filter, setFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (map.current) return;

    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [126.5312, 33.4996],
      zoom: 9.5,
    });

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      markers.current.forEach(marker => marker.remove());
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (mapLoaded && map.current) {
      addMarkers();
    }
  }, [filter, mapLoaded]);

  const addMarkers = () => {
    if (!map.current || !mapLoaded) return;

    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    const filteredData = oceanData.filter(point => {
      if (filter === 'all') return true;
      return point.level === filter;
    });

    filteredData.forEach(point => {
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.width = '40px';
      el.style.display = 'flex';
      el.style.flexDirection = 'column';
      el.style.alignItems = 'center';
      el.style.cursor = 'pointer';

      const getColor = (level: string) => {
        switch (level) {
          case 'low': return '#60A5FA';
          case 'medium': return '#FBBF24';
          case 'high': return '#EF4444';
          default: return '#FBBF24';
        }
      };

      const height = Math.max(point.value / 2, 30);

      el.innerHTML = `
        <div style="
          background-color: #000;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: bold;
          margin-bottom: 4px;
          white-space: nowrap;
        ">${point.value}</div>
        <div style="
          width: 20px;
          height: ${height}px;
          background-color: ${getColor(point.level)};
          border-radius: 4px 4px 0 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>
      `;

      const marker = new mapboxgl.Marker(el)
        .setLngLat([point.lng, point.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div style="padding: 8px;">
                <strong>${point.name}</strong><br/>
                수치: ${point.value}
              </div>
            `)
        )
        .addTo(map.current!);
      
      markers.current.push(marker);
    });
  };

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* 필터 버튼 */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            filter === 'all'
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          전체보기 <span className="text-xs">ALL</span>
        </button>
        <button
          onClick={() => setFilter('low')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            filter === 'low'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          낮음 <span className="text-xs">LOW</span>
        </button>
        <button
          onClick={() => setFilter('medium')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            filter === 'medium'
              ? 'bg-yellow-500 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          보통 <span className="text-xs">MEDIUM</span>
        </button>
        <button
          onClick={() => setFilter('high')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            filter === 'high'
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          높음 <span className="text-xs">HIGH</span>
        </button>
      </div>

      {/* 지도 컨테이너 */}
      <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
