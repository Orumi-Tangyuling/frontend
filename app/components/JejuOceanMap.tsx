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
  status: string;
  lastCollected: string;
  temperature: string;
  weather: string;
  swimStatus: 'safe' | 'caution' | 'prohibited';
}

const oceanData: DataPoint[] = [
  { id: '1', name: '애월해안', lat: 33.44639, lng: 126.29343, value: 140, level: 'high', status: '청정 - 방문 안전', lastCollected: '2025.12.08', temperature: '18°C', weather: '맑음', swimStatus: 'prohibited' },
  { id: '2', name: '조천해안', lat: 33.54323, lng: 126.66986, value: 114, level: 'high', status: '청정 - 방문 안전', lastCollected: '2025.12.10', temperature: '17°C', weather: '흐림', swimStatus: 'safe' },
  { id: '3', name: '예래해안', lat: 33.22843, lng: 126.47737, value: 87, level: 'high', status: '청정 - 방문 안전', lastCollected: '2025.12.09', temperature: '19°C', weather: '맑음', swimStatus: 'caution' },
  { id: '4', name: '한림해안', lat: 33.39511, lng: 126.24028, value: 53, level: 'medium', status: '양호 - 모니터링', lastCollected: '2025.12.11', temperature: '18°C', weather: '맑음', swimStatus: 'safe' },
  { id: '5', name: '성산해안', lat: 33.47330, lng: 126.93454, value: 115, level: 'high', status: '청정 - 방문 안전', lastCollected: '2025.12.07', temperature: '17°C', weather: '흐림', swimStatus: 'safe' },
  { id: '6', name: '중문해안', lat: 33.24421, lng: 126.41406, value: 73, level: 'medium', status: '양호 - 모니터링', lastCollected: '2025.12.12', temperature: '19°C', weather: '맑음', swimStatus: 'safe' },
  { id: '7', name: '구좌해안', lat: 33.55565, lng: 126.79566, value: 95, level: 'high', status: '청정 - 방문 안전', lastCollected: '2025.12.08', temperature: '18°C', weather: '맑음', swimStatus: 'caution' },
  { id: '8', name: '표선해안', lat: 33.32585, lng: 126.84252, value: 68, level: 'medium', status: '양호 - 모니터링', lastCollected: '2025.12.13', temperature: '19°C', weather: '맑음', swimStatus: 'safe' },
  { id: '9', name: '안덕해안', lat: 33.23000, lng: 126.29500, value: 82, level: 'high', status: '청정 - 방문 안전', lastCollected: '2025.12.10', temperature: '18°C', weather: '흐림', swimStatus: 'prohibited' },
  { id: '10', name: '남원해안', lat: 33.27262, lng: 126.66034, value: 45, level: 'medium', status: '양호 - 모니터링', lastCollected: '2025.12.14', temperature: '19°C', weather: '맑음', swimStatus: 'safe' },
  { id: '11', name: '대정해안', lat: 33.21641, lng: 126.25031, value: 59, level: 'medium', status: '양호 - 모니터링', lastCollected: '2025.12.11', temperature: '18°C', weather: '맑음', swimStatus: 'safe' },
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
      center: [126.5312, 33.3800],
      zoom: 9.8,
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
          new mapboxgl.Popup({ 
            offset: 25,
            maxWidth: '400px',
            className: 'custom-popup'
          })
            .setHTML(`
              <div style="
                background: white;
                border-radius: 16px;
                padding: 0;
                min-width: 350px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                position: relative;
              ">
                <!-- 닫기 버튼 -->
                <button onclick="this.closest('.mapboxgl-popup').remove()" style="
                  position: absolute;
                  top: 12px;
                  right: 12px;
                  width: 32px;
                  height: 32px;
                  border-radius: 50%;
                  background: #f3f4f6;
                  border: none;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  transition: background 0.2s;
                  z-index: 10;
                " onmouseover="this.style.background='#e5e7eb'" onmouseout="this.style.background='#f3f4f6'">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="2" stroke-linecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>

                <!-- 헤더 -->
                <div style="
                  padding: 20px;
                  border-bottom: 1px solid #e5e7eb;
                ">
                  <h3 style="
                    margin: 0 0 12px 0;
                    font-size: 20px;
                    font-weight: bold;
                    color: #1f2937;
                    padding-right: 40px;
                  ">${point.name}</h3>
                  
                  <!-- 청정 상태 버튼 -->
                  <div style="
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: ${point.level === 'high' ? '#10b981' : point.level === 'medium' ? '#f59e0b' : '#60a5fa'};
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 12px;
                  ">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="white">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    ${point.level === 'high' ? '청정' : point.level === 'medium' ? '양호' : '주의'}
                  </div>
                </div>

                <!-- 수영 상태 아이콘 -->
                <div style="
                  padding: 16px 20px;
                  background: ${point.swimStatus === 'prohibited' ? '#fee2e2' : point.swimStatus === 'caution' ? '#fef3c7' : '#d1fae5'};
                  border-radius: 12px;
                  margin: 16px 20px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 12px;
                ">
                  ${point.swimStatus === 'prohibited' ? `
                    <svg width="60" height="40" viewBox="0 0 60 40" style="opacity: 0.7;">
                      <rect x="5" y="15" width="50" height="10" rx="5" fill="#9ca3af" stroke="#6b7280" stroke-width="2"/>
                      <circle cx="30" cy="10" r="4" fill="#6b7280"/>
                      <path d="M20 20 L15 30 M40 20 L45 30" stroke="#6b7280" stroke-width="2"/>
                      <line x1="10" y1="5" x2="50" y2="35" stroke="#ef4444" stroke-width="3"/>
                      <line x1="50" y1="5" x2="10" y2="35" stroke="#ef4444" stroke-width="3"/>
                    </svg>
                  ` : point.swimStatus === 'caution' ? `
                    <svg width="40" height="40" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="18" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
                      <path d="M20 10 L20 22" stroke="white" stroke-width="3" stroke-linecap="round"/>
                      <circle cx="20" cy="28" r="2" fill="white"/>
                    </svg>
                  ` : `
                    <svg width="60" height="40" viewBox="0 0 60 40">
                      <path d="M15 20 Q20 15 25 20 Q30 15 35 20 Q40 15 45 20" stroke="#10b981" stroke-width="2" fill="none"/>
                      <circle cx="25" cy="10" r="3" fill="#10b981"/>
                      <path d="M20 15 L15 25 M30 15 L35 25" stroke="#10b981" stroke-width="2"/>
                    </svg>
                  `}
                </div>

                <!-- 정보 리스트 -->
                <div style="padding: 0 20px 20px 20px;">
                  <ul style="
                    list-style: none;
                    padding: 0;
                    margin: 0;
                  ">
                    <li style="
                      padding: 10px 0;
                      border-bottom: 1px solid #f3f4f6;
                      color: #4b5563;
                      font-size: 14px;
                    ">
                      <span style="color: #6b7280;">현재 상태:</span> 
                      <strong style="color: #1f2937;">${point.status}</strong>
                    </li>
                    <li style="
                      padding: 10px 0;
                      border-bottom: 1px solid #f3f4f6;
                      color: #4b5563;
                      font-size: 14px;
                    ">
                      <span style="color: #6b7280;">예상 쓰레기량:</span> 
                      <strong style="color: #1f2937;">${point.value}kg</strong> <span style="color: #9ca3af;">(이번 주)</span>
                    </li>
                    <li style="
                      padding: 10px 0;
                      border-bottom: 1px solid #f3f4f6;
                      color: #4b5563;
                      font-size: 14px;
                    ">
                      <span style="color: #6b7280;">최근 수거일:</span> 
                      <strong style="color: #1f2937;">${point.lastCollected}</strong>
                    </li>
                    <li style="
                      padding: 10px 0;
                      color: #4b5563;
                      font-size: 14px;
                    ">
                      <span style="color: #6b7280;">수온:</span> 
                      <strong style="color: #1f2937;">${point.temperature}</strong> / 
                      <span style="color: #6b7280;">날씨:</span> 
                      <strong style="color: #1f2937;">${point.weather}</strong>
                    </li>
                  </ul>
                </div>
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
