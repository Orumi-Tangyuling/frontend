'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { TextLayer } from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map as MapGL } from 'react-map-gl/mapbox';

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoieW9uZ3dvb24iLCJhIjoiY21qNm93cXJlMGdyejNmcTJzMGVrZHNyZCJ9.MWEH1d2ExoNoykCYtndGGw';

// 시드 기반 랜덤 함수 (매번 같은 결과 생성)
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// API 응답 타입 정의
interface ApiBeachData {
  name: string;
  date: string;
  location: {
    latitude: number;
    longitude: number;
  };
  prediction: {
    trash_amount: number;
  };
  status: 'LOW' | 'MEDIUM' | 'HIGH';
}

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

// API 데이터를 DataPoint로 변환하는 함수
function convertApiDataToDataPoint(apiData: ApiBeachData, index: number): DataPoint {
  const level = apiData.status.toLowerCase() as 'low' | 'medium' | 'high';
  
  // status 텍스트 매핑
  const statusText = 
    level === 'high' ? '청정 - 방문 안전' :
    level === 'medium' ? '양호 - 모니터링' :
    '주의 필요';
  
  // swimStatus는 쓰레기량에 따라 결정 (임시 로직)
  const swimStatus: 'safe' | 'caution' | 'prohibited' = 
    apiData.prediction.trash_amount > 100 ? 'prohibited' :
    apiData.prediction.trash_amount > 70 ? 'caution' : 'safe';
  
  return {
    id: String(index + 1),
    name: apiData.name,
    lat: apiData.location.latitude,
    lng: apiData.location.longitude,
    value: apiData.prediction.trash_amount,
    level,
    status: statusText,
    lastCollected: apiData.date,
    temperature: '18°C', // API에서 제공하지 않는 정보는 기본값
    weather: '맑음',
    swimStatus,
  };
}

export default function JejuOceanMap() {
  const [filter, setFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [oceanData, setOceanData] = useState<DataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // 클라이언트 사이드에서만 렌더링되도록 보장
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // API에서 데이터 가져오기
  useEffect(() => {
    const fetchBeachData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const apiHost = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8000';
        const predictionDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식
        const url = `${apiHost}/api/v1/trash/beach?prediction_date=${predictionDate}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`API 요청 실패: ${response.status}`);
        }
        
        const data: ApiBeachData[] = await response.json();
        const convertedData = data.map((item, index) => convertApiDataToDataPoint(item, index));
        
        setOceanData(convertedData);
      } catch (err) {
        console.error('해양 데이터 로딩 실패:', err);
        setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBeachData();
  }, []);

  const INITIAL_VIEW_STATE = {
    longitude: 126.5312,
    latitude: 33.38,
    zoom: 9.8,
    pitch: 60,
    bearing: -17.6,
  };

  // 각 데이터 포인트 주변에 여러 포인트를 생성하여 hexagon 시각화 개선 (메모이제이션)
  const hexagonData = useMemo(() => {
    const filteredData = oceanData.filter(point => {
      if (filter === 'all') return true;
      return point.level === filter;
    });

    const data: any[] = [];

    filteredData.forEach(point => {
      // 각 포인트 주변에 여러 데이터 포인트 생성
      const numPoints = Math.floor(point.value / 5); // value에 비례하여 포인트 생성

      for (let i = 0; i < numPoints; i++) {
        // 시드 기반 랜덤으로 고정된 위치 생성
        const seed = parseInt(point.id) * 1000 + i;
        const angle = seededRandom(seed) * Math.PI * 2;
        const distance = seededRandom(seed + 1) * 0.02; // 약 2km 반경
        const lng = point.lng + distance * Math.cos(angle);
        const lat = point.lat + distance * Math.sin(angle);

        data.push({
          position: [lng, lat],
          value: point.value,
          level: point.level,
          name: point.name,
          id: point.id,
          status: point.status,
          lastCollected: point.lastCollected,
          temperature: point.temperature,
          weather: point.weather,
          swimStatus: point.swimStatus,
        });
      }

      // 중심 포인트도 추가
      data.push({
        position: [point.lng, point.lat],
        value: point.value,
        level: point.level,
        name: point.name,
        id: point.id,
        status: point.status,
        lastCollected: point.lastCollected,
        temperature: point.temperature,
        weather: point.weather,
        swimStatus: point.swimStatus,
      });
    });

    return data;
  }, [filter]);

  // 해안 이름 라벨 데이터 계산 (메모이제이션)
  const labelData = useMemo(() => {
    const filteredData = oceanData.filter(point => {
      if (filter === 'all') return true;
      return point.level === filter;
    });

    return filteredData.map(point => ({
      position: [point.lng, point.lat, point.value * 20 + 3000],
      text: point.name,
      value: point.value,
      name: point.name,
    }));
  }, [filter]);

  // 호버 핸들러 최적화 (같은 포인트에 호버 시 상태 업데이트 방지)
  const handleHover = useCallback((info: any) => {
    if (info.object) {
      let pointName = null;

      // HexagonLayer인 경우
      if (info.object.points && info.object.points[0]) {
        pointName = info.object.points[0].name;
      }
      // TextLayer인 경우
      else if (info.object.name) {
        pointName = info.object.name;
      }

      if (pointName) {
        const point = oceanData.find(p => p.name === pointName);
        if (point) {
          // 같은 포인트에 이미 호버 중이면 상태 업데이트 스킵
          setHoveredPoint(prev => {
            if (prev?.name === point.name) return prev;
            return point;
          });
          setMousePos({ x: info.x, y: info.y });
          return;
        }
      }
    }
    setHoveredPoint(null);
  }, []);

  const layers = useMemo(
    () => [
      new HexagonLayer({
        id: 'hexagon-layer',
        data: hexagonData,
        pickable: true,
        extruded: true,
        radius: 1000, // 1km hexagon radius
        elevationScale: 20,
        getPosition: (d: any) => d.position,
        getElevationWeight: (d: any) => d.value,
        getColorWeight: (d: any) => d.value,
        colorRange: [
          [26, 152, 80, 200], // 녹색 (낮음)
          [102, 194, 165, 200],
          [171, 221, 164, 200],
          [254, 224, 139, 200], // 노란색 (중간)
          [253, 174, 97, 200],
          [244, 109, 67, 200], // 주황색
          [215, 48, 39, 200], // 빨간색 (높음)
        ],
        coverage: 0.9,
        onHover: handleHover,
      }),
      new TextLayer({
        id: 'ratio-labels',
        data: labelData,
        pickable: true,

        // Position & Text
        getPosition: (d: any) => d.position,
        getText: (d: any) => d.text,

        // Size Configuration
        getSize: 48,
        sizeScale: 1,
        sizeUnits: 'meters',
        sizeMinPixels: 18,
        sizeMaxPixels: 40,

        // Color & Styling
        getColor: [255, 255, 255, 255],
        getTextAnchor: 'middle',
        getAlignmentBaseline: 'center',

        // 3D Billboard Mode
        billboard: true,

        // Background for readability
        background: true,
        getBackgroundColor: [0, 0, 0, 180],
        backgroundPadding: [8, 4, 8, 4],

        // Outline for contrast
        outlineWidth: 2,
        outlineColor: [0, 0, 0, 255],

        // Font settings
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',

        // Interaction
        onHover: handleHover,
      }),
    ],
    [hexagonData, labelData, handleHover]
  );

  // 클라이언트 사이드가 아니면 null 반환
  if (!isMounted) {
    return null;
  }

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500 mx-auto"></div>
          <p className="text-lg text-gray-300">해양 데이터 로딩 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-gray-900">
        <div className="max-w-md rounded-lg bg-red-900/50 p-6 text-center">
          <svg className="mx-auto mb-4 h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mb-2 text-xl font-bold text-white">데이터 로딩 실패</h3>
          <p className="text-gray-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-red-600 px-6 py-2 text-white hover:bg-red-700 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 h-full w-full">
      {/* 필터 버튼 */}
      <div className="absolute top-6 left-1/2 z-10 flex -translate-x-1/2 transform gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`rounded-full px-6 py-2 font-medium transition-all ${
            filter === 'all'
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          전체보기 <span className="text-xs">ALL</span>
        </button>
        <button
          onClick={() => setFilter('low')}
          className={`rounded-full px-6 py-2 font-medium transition-all ${
            filter === 'low'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          낮음 <span className="text-xs">LOW</span>
        </button>
        <button
          onClick={() => setFilter('medium')}
          className={`rounded-full px-6 py-2 font-medium transition-all ${
            filter === 'medium'
              ? 'bg-yellow-500 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          보통 <span className="text-xs">MEDIUM</span>
        </button>
        <button
          onClick={() => setFilter('high')}
          className={`rounded-full px-6 py-2 font-medium transition-all ${
            filter === 'high'
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          높음 <span className="text-xs">HIGH</span>
        </button>
      </div>

      {/* DeckGL + Mapbox 지도 */}
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={{
          scrollZoom: true,
          dragPan: true,
          dragRotate: true,
          doubleClickZoom: true,
          touchZoom: true,
          touchRotate: true,
          keyboard: true,
          minZoom: 8.5,
          maxZoom: 12,
          minPitch: 0,
          maxPitch: 85,
        }}
        layers={layers}
      >
        <MapGL
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v11"
          maxBounds={[
            [126.0, 33.0], // 남서쪽 경계 (좌하단)
            [127.2, 33.8], // 북동쪽 경계 (우상단)
          ]}
        />
      </DeckGL>

      {/* 호버 팝업 */}
      {hoveredPoint && (
        <div
          className="pointer-events-none absolute z-50"
          style={{
            left: `${mousePos.x + 20}px`,
            top: `${mousePos.y - 100}px`,
          }}
        >
          <div className="animate-fadeInScale pointer-events-auto w-80 scale-95 transform rounded-2xl bg-white opacity-0 shadow-2xl transition-all duration-200 ease-out">
            <style jsx>{`
              @keyframes fadeInScale {
                from {
                  opacity: 0;
                  transform: scale(0.95) translateY(10px);
                }
                to {
                  opacity: 1;
                  transform: scale(1) translateY(0);
                }
              }
              .animate-fadeInScale {
                animation: fadeInScale 0.2s ease-out forwards;
              }
            `}</style>
            <div className="relative p-5">
              <h3 className="mb-4 text-xl font-bold text-gray-800">{hoveredPoint.name}</h3>

              <div
                className={`mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                  hoveredPoint.level === 'high'
                    ? 'bg-green-500 text-white'
                    : hoveredPoint.level === 'medium'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-blue-500 text-white'
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 20 20" fill="white">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {hoveredPoint.level === 'high'
                  ? '청정'
                  : hoveredPoint.level === 'medium'
                    ? '양호'
                    : '주의'}
              </div>

              <div className="mb-4 flex items-center justify-center rounded-xl bg-gray-50 p-4">
                {hoveredPoint.swimStatus === 'prohibited' ? (
                  <svg width="90" height="60" viewBox="0 0 120 80" style={{ opacity: 0.8 }}>
                    <rect
                      x="10"
                      y="30"
                      width="100"
                      height="20"
                      rx="10"
                      fill="#9ca3af"
                      stroke="#6b7280"
                      strokeWidth="3"
                    />
                    <circle cx="60" cy="20" r="8" fill="#6b7280" />
                    <path d="M40 40 L30 60 M80 40 L90 60" stroke="#6b7280" strokeWidth="3" />
                    <line
                      x1="20"
                      y1="10"
                      x2="100"
                      y2="70"
                      stroke="#ef4444"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="100"
                      y1="10"
                      x2="20"
                      y2="70"
                      stroke="#ef4444"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : hoveredPoint.swimStatus === 'caution' ? (
                  <svg width="45" height="45" viewBox="0 0 60 60">
                    <circle
                      cx="30"
                      cy="30"
                      r="26"
                      fill="#fbbf24"
                      stroke="#f59e0b"
                      strokeWidth="3"
                    />
                    <path d="M30 15 L30 33" stroke="white" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="30" cy="42" r="3" fill="white" />
                  </svg>
                ) : (
                  <svg width="75" height="45" viewBox="0 0 100 60">
                    <path
                      d="M20 35 Q30 25 40 35 Q50 25 60 35 Q70 25 80 35"
                      stroke="#10b981"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <circle cx="40" cy="15" r="5" fill="#10b981" />
                    <path
                      d="M35 20 L25 40 M45 20 L55 40"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </div>

              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="font-medium text-gray-800">•</span>
                  <div>
                    <span className="font-medium text-gray-600">현재 상태: </span>
                    <strong className="text-gray-900">{hoveredPoint.status}</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-gray-800">•</span>
                  <div>
                    <span className="font-medium text-gray-600">예상 쓰레기량: </span>
                    <strong className="text-gray-900">
                      {hoveredPoint.value}kg{' '}
                      <span className="text-sm text-gray-500">(이번 주)</span>
                    </strong>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-gray-800">•</span>
                  <div>
                    <span className="font-medium text-gray-600">최근 수거일: </span>
                    <strong className="text-gray-900">{hoveredPoint.lastCollected}</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-gray-800">•</span>
                  <div>
                    <span className="font-medium text-gray-600">수온: </span>
                    <strong className="text-gray-900">{hoveredPoint.temperature}</strong>
                    <span className="font-medium text-gray-600"> / 날씨: </span>
                    <strong className="text-gray-900">{hoveredPoint.weather}</strong>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
