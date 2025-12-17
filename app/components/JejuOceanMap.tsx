'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Mapbox 토큰 설정
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
  { id: '1', name: 'Hangyeong', lat: 33.3168, lng: 126.2339, value: 140, level: 'high' },
  { id: '2', name: 'Gujwa', lat: 33.5545, lng: 126.9273, value: 114, level: 'high' },
  { id: '3', name: 'Seogwipo', lat: 33.2541, lng: 126.5601, value: 87, level: 'high' },
  { id: '4', name: 'Pyoseon', lat: 33.3236, lng: 126.8365, value: 53, level: 'medium' },
  { id: '5', name: 'Seongsan', lat: 33.0956, lng: 126.6816, value: 73, level: 'medium' },
  { id: '6', name: 'Hallim', lat: 33.4084, lng: 126.2706, value: 115, level: 'high' },
];

export default function JejuOceanMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [filter, setFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // 지도 초기화
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [126.5312, 33.4996],
      zoom: 9.5,
      pitch: 0,
    });

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      markers.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (mapLoaded && map.current) {
      addMarkers();
    }
  }, [filter, mapLoaded]);

  const addMarkers = () => {
    if (!map.current || !mapLoaded) return;

    // 기존 마커 제거
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
      <div ref={mapContainer} className="absolute inset-0 w-full h-full" style={{ minHeight: '500px' }} />
    </div>
  );
}
