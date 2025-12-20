'use client';

import { useCallback, useMemo, useState } from 'react';

import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { TextLayer } from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map as MapGL } from 'react-map-gl/mapbox';
import styles from './JejuOceanMap.module.scss';

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoieW9uZ3dvb24iLCJhIjoiY21qNm93cXJlMGdyejNmcTJzMGVrZHNyZCJ9.MWEH1d2ExoNoykCYtndGGw';

// 시드 기반 랜덤 함수 (매번 같은 결과 생성)
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
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

const oceanData: DataPoint[] = [
  {
    id: '1',
    name: '애월해안',
    lat: 33.44639,
    lng: 126.29343,
    value: 140,
    level: 'high',
    status: '청정 - 방문 안전',
    lastCollected: '2025.12.08',
    temperature: '18°C',
    weather: '맑음',
    swimStatus: 'prohibited',
  },
  {
    id: '2',
    name: '조천해안',
    lat: 33.54323,
    lng: 126.66986,
    value: 114,
    level: 'high',
    status: '청정 - 방문 안전',
    lastCollected: '2025.12.10',
    temperature: '17°C',
    weather: '흐림',
    swimStatus: 'safe',
  },
  {
    id: '3',
    name: '예래해안',
    lat: 33.22843,
    lng: 126.47737,
    value: 87,
    level: 'high',
    status: '청정 - 방문 안전',
    lastCollected: '2025.12.09',
    temperature: '19°C',
    weather: '맑음',
    swimStatus: 'caution',
  },
  {
    id: '4',
    name: '한림해안',
    lat: 33.39511,
    lng: 126.24028,
    value: 53,
    level: 'medium',
    status: '양호 - 모니터링',
    lastCollected: '2025.12.11',
    temperature: '18°C',
    weather: '맑음',
    swimStatus: 'safe',
  },
  {
    id: '5',
    name: '성산해안',
    lat: 33.4733,
    lng: 126.93454,
    value: 115,
    level: 'high',
    status: '청정 - 방문 안전',
    lastCollected: '2025.12.07',
    temperature: '17°C',
    weather: '흐림',
    swimStatus: 'safe',
  },
  {
    id: '6',
    name: '중문해안',
    lat: 33.24421,
    lng: 126.41406,
    value: 73,
    level: 'medium',
    status: '양호 - 모니터링',
    lastCollected: '2025.12.12',
    temperature: '19°C',
    weather: '맑음',
    swimStatus: 'safe',
  },
  {
    id: '7',
    name: '구좌해안',
    lat: 33.55565,
    lng: 126.79566,
    value: 95,
    level: 'high',
    status: '청정 - 방문 안전',
    lastCollected: '2025.12.08',
    temperature: '18°C',
    weather: '맑음',
    swimStatus: 'caution',
  },
  {
    id: '8',
    name: '표선해안',
    lat: 33.32585,
    lng: 126.84252,
    value: 68,
    level: 'medium',
    status: '양호 - 모니터링',
    lastCollected: '2025.12.13',
    temperature: '19°C',
    weather: '맑음',
    swimStatus: 'safe',
  },
  {
    id: '9',
    name: '안덕해안',
    lat: 33.23,
    lng: 126.295,
    value: 82,
    level: 'high',
    status: '청정 - 방문 안전',
    lastCollected: '2025.12.10',
    temperature: '18°C',
    weather: '흐림',
    swimStatus: 'prohibited',
  },
  {
    id: '10',
    name: '남원해안',
    lat: 33.27262,
    lng: 126.66034,
    value: 45,
    level: 'medium',
    status: '양호 - 모니터링',
    lastCollected: '2025.12.14',
    temperature: '19°C',
    weather: '맑음',
    swimStatus: 'safe',
  },
  {
    id: '11',
    name: '대정해안',
    lat: 33.21641,
    lng: 126.25031,
    value: 59,
    level: 'medium',
    status: '양호 - 모니터링',
    lastCollected: '2025.12.11',
    temperature: '18°C',
    weather: '맑음',
    swimStatus: 'safe',
  },
];

export default function JejuOceanMap() {
  const [filter, setFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentBearing, setCurrentBearing] = useState(-17.6);
  const [currentPitch, setCurrentPitch] = useState(60);

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

    // 현재 카메라 방향으로 오프셋 계산 (막대 앞쪽에 배치)
    const bearingRad = currentBearing * (Math.PI / 180);
    // pitch에 따라 offset 조정 (pitch가 높을수록 offset 증가)
    const pitchFactor = currentPitch / 60; // 기준 pitch 60도
    const offset = -0.035 * pitchFactor; // pitch에 비례하여 조정

    return filteredData.map(point => ({
      position: [
        point.lng + offset * Math.sin(bearingRad),
        point.lat + offset * Math.cos(bearingRad), 
        point.value * 25 + 4000 // z 좌표 약간 낮춤
      ],
      text: point.name,
      value: point.value,
      name: point.name,
    }));
  }, [filter, currentBearing, currentPitch]);

  // 호버 핸들러 최적화 (같은 포인트에 호버 시 상태 업데이트 방지)
  const handleHover = useCallback((info: any): boolean => {
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
          return true;
        }
      }
    }
    setHoveredPoint(null);
    return false;
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

        // Size Configuration - pixels로 변경하여 크기 문제 해결
        getSize: 10,
        sizeScale: 1,
        sizeUnits: 'pixels',
        sizeMinPixels: 14,
        sizeMaxPixels: 20,

        // Color & Styling
        getColor: [255, 255, 255, 255],
        getTextAnchor: 'middle',
        getAlignmentBaseline: 'center',

        // 3D Billboard Mode
        billboard: true, // billboard 켜서 카메라를 향하게

        // Background for readability - 반투명 검은 배경 추가
        background: true,
        getBackgroundColor: [0, 0, 0, 160],
        backgroundPadding: [6, 3, 6, 3],

        // Outline - 얇고 밝게
        outlineWidth: 1,
        outlineColor: [255, 255, 255, 80],

        // Font settings
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        
        // 한글 문자셋 명시
        characterSet: 'auto',
        
        // Interaction
        onHover: handleHover,
      }),
    ],
    [hexagonData, labelData, handleHover]
  );

  return (
    <div className={styles.mapContainer}>
      {/* 필터 버튼 */}
      <div className={styles.filterContainer}>
        {/* 전체보기 */}
        <button
          onClick={() => setFilter('all')}
          className={`${styles.filterButton} ${styles.all} ${filter === 'all' ? styles.active : ''}`}
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
          전체보기
          <span className={styles.subText}>ALL</span>
        </button>

        {/* 낮음 */}
        <button
          onClick={() => setFilter('low')}
          className={`${styles.filterButton} ${styles.low} ${filter === 'low' ? styles.active : ''}`}
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          낮음
          <span className={styles.subText}>LOW</span>
        </button>

        {/* 보통 */}
        <button
          onClick={() => setFilter('medium')}
          className={`${styles.filterButton} ${styles.medium} ${filter === 'medium' ? styles.active : ''}`}
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h5V4a1 1 0 112 0v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          보통
          <span className={styles.subText}>MEDIUM</span>
        </button>

        {/* 높음 */}
        <button
          onClick={() => setFilter('high')}
          className={`${styles.filterButton} ${styles.high} ${filter === 'high' ? styles.active : ''}`}
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          높음
          <span className={styles.subText}>HIGH</span>
        </button>
      </div>

      {/* DeckGL + Mapbox 지도 */}
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        onViewStateChange={({ viewState }: any) => {
          setCurrentBearing(viewState.bearing || 0);
          setCurrentPitch(viewState.pitch || 60);
        }}
      >
        <MapGL
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
          maxBounds={[
            [126.0, 33.0], // 남서쪽 경계 (좌하단)
            [127.2, 33.8], // 북동쪽 경계 (우상단)
          ]}
        />
      </DeckGL>

      {/* 호버 팝업 */}
      {hoveredPoint && (
        <div
          className={styles.hoverPopup}
          style={{
            left: `${mousePos.x + 20}px`,
            top: `${mousePos.y - 100}px`,
          }}
        >
          <div className={styles.popupCard}>
            <div className={styles.popupContent}>
              <h3 className={styles.popupTitle}>{hoveredPoint.name}</h3>

              {/* Status Badge */}
              <div className={`${styles.statusBadge} ${styles[hoveredPoint.level]}`}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
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

              {/* Swim Status Icon */}
              <div className={styles.swimIconContainer}>
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

              {/* Information List */}
              <ul className={styles.infoList}>
                <li>
                  <span className={styles.infoBullet}>●</span>
                  <div className={styles.infoContent}>
                    <span className={styles.label}>현재 상태: </span>
                    <strong className={styles.value}>{hoveredPoint.status}</strong>
                  </div>
                </li>
                <li>
                  <span className={styles.infoBullet}>●</span>
                  <div className={styles.infoContent}>
                    <span className={styles.label}>예상 쓰레기량: </span>
                    <strong className={styles.value}>
                      {hoveredPoint.value}kg{' '}
                      <span className={styles.subValue}>(이번 주)</span>
                    </strong>
                  </div>
                </li>
                <li>
                  <span className={styles.infoBullet}>●</span>
                  <div className={styles.infoContent}>
                    <span className={styles.label}>최근 수거일: </span>
                    <strong className={styles.value}>{hoveredPoint.lastCollected}</strong>
                  </div>
                </li>
                <li>
                  <span className={styles.infoBullet}>●</span>
                  <div className={styles.infoContent}>
                    <span className={styles.label}>수온: </span>
                    <strong className={styles.value}>{hoveredPoint.temperature}</strong>
                    <span className={styles.label}> / 날씨: </span>
                    <strong className={styles.value}>{hoveredPoint.weather}</strong>
                  </div>
                </li>
              </ul>

              {/* Risk Level Progress Bar */}
              <div className={styles.riskSection}>
                <div className={styles.riskHeader}>
                  <span className={styles.riskLabel}>위험도</span>
                  <span className={styles.riskValue}>
                    {hoveredPoint.level === 'high' ? '높음' : hoveredPoint.level === 'medium' ? '보통' : '낮음'}
                  </span>
                </div>
                <div className={styles.progressBar}>
                  <div className={`${styles.progressFill} ${styles[hoveredPoint.level]}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
