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
  const [filter, setFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null);

  useEffect(() => {
    if (map.current) return;

    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [126.5312, 33.3800],
      zoom: 9.8,
      pitch: 60,
      bearing: -17.6,
      antialias: true
    });

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (mapLoaded && map.current) {
      add3DLayers();
    }
  }, [filter, mapLoaded]);

  const add3DLayers = () => {
    if (!map.current || !mapLoaded) return;

    // 기존 레이어와 소스 제거
    if (map.current.getLayer('ocean-3d-layer')) {
      map.current.removeLayer('ocean-3d-layer');
    }
    if (map.current.getSource('ocean-data')) {
      map.current.removeSource('ocean-data');
    }

    const filteredData = oceanData.filter(point => {
      if (filter === 'all') return true;
      return point.level === filter;
    });

    // GeoJSON 데이터 생성
    const geojsonData: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features: filteredData.map(point => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [point.lng, point.lat]
        },
        properties: {
          id: point.id,
          name: point.name,
          value: point.value,
          level: point.level,
          height: point.value * 50, // 높이 스케일
          status: point.status,
          lastCollected: point.lastCollected,
          temperature: point.temperature,
          weather: point.weather,
          swimStatus: point.swimStatus,
          color: point.level === 'high' ? '#ef4444' : point.level === 'medium' ? '#fbbf24' : '#60a5fa'
        }
      }))
    };

    // 데이터 소스 추가
    map.current.addSource('ocean-data', {
      type: 'geojson',
      data: geojsonData
    });

    // 3D extrusion 레이어 추가
    map.current.addLayer({
      id: 'ocean-3d-layer',
      type: 'fill-extrusion',
      source: 'ocean-data',
      paint: {
        'fill-extrusion-color': ['get', 'color'],
        'fill-extrusion-height': ['get', 'height'],
        'fill-extrusion-base': 0,
        'fill-extrusion-opacity': 0.8
      }
    });

    // 원형 베이스 추가를 위한 버퍼 생성
    const circleFeatures = filteredData.map(point => {
      const radius = 0.015; // 원 반경
      const steps = 32;
      const coordinates: number[][] = [];
      
      for (let i = 0; i <= steps; i++) {
        const angle = (i / steps) * Math.PI * 2;
        const dx = radius * Math.cos(angle);
        const dy = radius * Math.sin(angle);
        coordinates.push([point.lng + dx, point.lat + dy]);
      }

      return {
        type: 'Feature' as const,
        geometry: {
          type: 'Polygon' as const,
          coordinates: [coordinates]
        },
        properties: {
          id: point.id,
          name: point.name,
          value: point.value,
          level: point.level,
          height: point.value * 50,
          status: point.status,
          lastCollected: point.lastCollected,
          temperature: point.temperature,
          weather: point.weather,
          swimStatus: point.swimStatus,
          color: point.level === 'high' ? '#ef4444' : point.level === 'medium' ? '#fbbf24' : '#60a5fa'
        }
      };
    });

    // 기존 원형 레이어 제거
    if (map.current.getLayer('ocean-3d-circles')) {
      map.current.removeLayer('ocean-3d-circles');
    }
    if (map.current.getSource('ocean-circles')) {
      map.current.removeSource('ocean-circles');
    }

    // 원형 소스 및 레이어 추가
    map.current.addSource('ocean-circles', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: circleFeatures
      }
    });

    map.current.addLayer({
      id: 'ocean-3d-circles',
      type: 'fill-extrusion',
      source: 'ocean-circles',
      paint: {
        'fill-extrusion-color': ['get', 'color'],
        'fill-extrusion-height': ['get', 'height'],
        'fill-extrusion-base': 0,
        'fill-extrusion-opacity': 0.8
      }
    });

    // 클릭 이벤트 추가
    map.current.on('click', 'ocean-3d-circles', (e) => {
      if (e.features && e.features.length > 0) {
        const feature = e.features[0];
        const props = feature.properties;
        
        const point: DataPoint = {
          id: props.id,
          name: props.name,
          lat: 0,
          lng: 0,
          value: props.value,
          level: props.level,
          status: props.status,
          lastCollected: props.lastCollected,
          temperature: props.temperature,
          weather: props.weather,
          swimStatus: props.swimStatus
        };
        
        setSelectedPoint(point);
      }
    });

    // 마우스 커서 변경
    map.current.on('mouseenter', 'ocean-3d-circles', () => {
      if (map.current) map.current.getCanvas().style.cursor = 'pointer';
    });

    map.current.on('mouseleave', 'ocean-3d-circles', () => {
      if (map.current) map.current.getCanvas().style.cursor = '';
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

      {/* 팝업 모달 */}
      {selectedPoint && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={() => setSelectedPoint(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full m-4" onClick={(e) => e.stopPropagation()}>
            <div className="relative p-6">
              {/* 닫기 버튼 */}
              <button
                onClick={() => setSelectedPoint(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 pr-8">{selectedPoint.name}</h3>
              
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                selectedPoint.level === 'high' ? 'bg-green-500 text-white' : 
                selectedPoint.level === 'medium' ? 'bg-yellow-500 text-white' : 
                'bg-blue-500 text-white'
              }`}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="white">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                {selectedPoint.level === 'high' ? '청정' : selectedPoint.level === 'medium' ? '양호' : '주의'}
              </div>

              <div className={`p-4 rounded-xl mb-4 flex items-center justify-center ${
                selectedPoint.swimStatus === 'prohibited' ? 'bg-red-50' :
                selectedPoint.swimStatus === 'caution' ? 'bg-yellow-50' :
                'bg-green-50'
              }`}>
                {selectedPoint.swimStatus === 'prohibited' ? (
                  <svg width="60" height="40" viewBox="0 0 60 40" style={{opacity: 0.7}}>
                    <rect x="5" y="15" width="50" height="10" rx="5" fill="#9ca3af" stroke="#6b7280" strokeWidth="2"/>
                    <circle cx="30" cy="10" r="4" fill="#6b7280"/>
                    <path d="M20 20 L15 30 M40 20 L45 30" stroke="#6b7280" strokeWidth="2"/>
                    <line x1="10" y1="5" x2="50" y2="35" stroke="#ef4444" strokeWidth="3"/>
                    <line x1="50" y1="5" x2="10" y2="35" stroke="#ef4444" strokeWidth="3"/>
                  </svg>
                ) : selectedPoint.swimStatus === 'caution' ? (
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="18" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2"/>
                    <path d="M20 10 L20 22" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="20" cy="28" r="2" fill="white"/>
                  </svg>
                ) : (
                  <svg width="60" height="40" viewBox="0 0 60 40">
                    <path d="M15 20 Q20 15 25 20 Q30 15 35 20 Q40 15 45 20" stroke="#10b981" strokeWidth="2" fill="none"/>
                    <circle cx="25" cy="10" r="3" fill="#10b981"/>
                    <path d="M20 15 L15 25 M30 15 L35 25" stroke="#10b981" strokeWidth="2"/>
                  </svg>
                )}
              </div>

              <ul className="space-y-3">
                <li className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">현재 상태:</span>
                  <strong className="text-gray-900">{selectedPoint.status}</strong>
                </li>
                <li className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">예상 쓰레기량:</span>
                  <strong className="text-gray-900">{selectedPoint.value}kg <span className="text-gray-400 text-sm">(이번 주)</span></strong>
                </li>
                <li className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">최근 수거일:</span>
                  <strong className="text-gray-900">{selectedPoint.lastCollected}</strong>
                </li>
                <li className="flex justify-between py-2">
                  <span className="text-gray-600">수온 / 날씨:</span>
                  <strong className="text-gray-900">{selectedPoint.temperature} / {selectedPoint.weather}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
