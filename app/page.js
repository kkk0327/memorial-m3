"use client";

import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import { Flower2, Landmark, NotebookPen, X } from 'lucide-react';

const SCENE_CONFIG = {
  'Panorama01': { 
    isOutdoor: true, 
    img: '/images/Panorama01.png', 
    hotspots: [
      { type: 'room', target: 'bong1234', text: '봉안당 1', pitch: 12, yaw: -55 },
      { type: 'room', target: 'res', text: '레스토랑', pitch: 2, yaw: -48 },
      { type: 'room', target: 'office', text: '오피스', pitch: 4, yaw: 32 },
      { type: 'room', target: 'dis', text: '전시관', pitch: 3, yaw: 55 },
      { type: 'room', target: 'jip', text: '집회장', pitch: -8, yaw: 45 },
      { type: 'nav', target: 'Panorama02', color: '#ef4444', pitch: -22, yaw: -26, targetYaw: 0 }
    ]
  },
  'Panorama02': { 
    isOutdoor: true, 
    img: '/images/Panorama02.png', 
    hotspots: [
      { type: 'room', target: 'bong1234', text: '봉안당 1', pitch: 10, yaw: -50 },
      { type: 'room', target: 'res', text: '레스토랑', pitch: 0, yaw: -45 }, 
      { type: 'room', target: 'bong02', text: '봉안당 2', pitch: 8, yaw: 12 }, 
      { type: 'room', target: 'office', text: '오피스', pitch: 8, yaw: 100 }, 
      { type: 'room', target: 'dis', text: '전시관', pitch: 12, yaw: 120 },   
      { type: 'room', target: 'jip', text: '집회장', pitch: -2, yaw: 110 },   
      { type: 'nav', target: 'Panorama03', color: '#ef4444', pitch: -18, yaw: 0, targetYaw: 0 }, 
      { type: 'nav', target: 'Panorama01', color: '#3b82f6', pitch: -25, yaw: 0, targetYaw: -26, rotate: '180deg' } 
    ]
  },
  'Panorama03': { 
    isOutdoor: true, 
    img: '/images/Panorama03.png', 
    hotspots: [
      { type: 'room', target: 'bong1234', text: '봉안당 1', pitch: 10, yaw: -30 },
      { type: 'room', target: 'res', text: '레스토랑', pitch: 0, yaw: -25 }, 
      { type: 'room', target: 'bong02', text: '봉안당 2', pitch: 10, yaw: 25 }, 
      { type: 'nav', target: 'Panorama04', color: '#ef4444', pitch: -16, yaw: 0, targetYaw: 0 },
      { type: 'nav', target: 'Panorama02', color: '#3b82f6', pitch: -25, yaw: 0, targetYaw: 0, rotate: '180deg' }
    ]
  },
  'Panorama04': { 
    isOutdoor: true, 
    img: '/images/Panorama04.png', 
    hotspots: [
      { type: 'room', target: 'bong1234', text: '봉안당 1', pitch: 10, yaw: -35 },
      { type: 'room', target: 'bong02', text: '봉안당 2', pitch: 10, yaw: 35 }, 
      { type: 'room', target: 'bong03', text: '봉안당 3', pitch: 12, yaw: 0 },
      { type: 'nav', target: 'Panorama07', color: '#ef4444', pitch: -10, yaw: 15, targetYaw: 0, rotate: '90deg', w: 60, h: 90 },
      { type: 'nav', target: 'Panorama06', color: '#10b981', pitch: -10, yaw: -15, targetYaw: 0, rotate: '-90deg', w: 60, h: 90 },
      { type: 'nav', target: 'Panorama03', color: '#3b82f6', pitch: -15, yaw: 0, targetYaw: 0, rotate: '180deg', w: 60, h: 90 }
    ]
  },
  'Panorama06': { 
    isOutdoor: true, 
    img: '/images/Panorama06.png', 
    hotspots: [
      { type: 'room', target: 'bong1234', text: '봉안당 1', pitch: 10, yaw: -45 },
      { type: 'room', target: 'res', text: '레스토랑', pitch: 0, yaw: -40 }, 
      { type: 'room', target: 'bong03', text: '봉안당 3', pitch: 10, yaw: 35 },
      { type: 'room', target: 'cafe', text: '카페', pitch: 10, yaw: 10 }, 
      { type: 'nav', target: 'Panorama04', color: '#3b82f6', pitch: -20, yaw: 0, targetYaw: 0, rotate: '180deg' }
    ]
  },
  'Panorama07': { 
    isOutdoor: true, 
    img: '/images/Panorama07.png', 
    hotspots: [
      { type: 'room', target: 'bong02', text: '봉안당 2', pitch: 2, yaw: -45 },
      { type: 'room', target: 'bong03', text: '봉안당 3', pitch: 2, yaw: 45 },
      { type: 'nav', target: 'Panorama08', color: '#ef4444', pitch: -16, yaw: 0, targetYaw: 0 },
      { type: 'nav', target: 'Panorama04', color: '#3b82f6', pitch: -25, yaw: 0, targetYaw: 0, rotate: '180deg' }
    ]
  },
  'Panorama08': { 
    isOutdoor: true, 
    img: '/images/Panorama08.png', 
    hotspots: [
      { type: 'room', target: 'hotel', text: '호텔', pitch: 10, yaw: -5 },
      { type: 'room', target: 'pat', text: '팻시설', pitch: 10, yaw: 15 },
      { type: 'nav', target: 'Panorama07', color: '#3b82f6', pitch: -20, yaw: 0, targetYaw: 0, rotate: '180deg' }
    ]
  },
  'bong1234': { isFlat: true, img: '/images/bong1234.jpg', title: '봉안당 1 내부' },
  'yu': { isFlat: true, img: '/images/yu.jpg', title: 'D-4 유골함' },
  'per': { isOutdoor: false, img: '/images/per.jpg', title: '개인추모실', hotspots: [] },
  'res': { title: '레스토랑', img: '/images/res.jpg', hotspots: [] },
  'office': { title: '오피스', img: '/images/office.jpg', hotspots: [] },
  'dis': { title: '전시관', img: '/images/dis.jpg', hotspots: [] },
  'jip': { title: '집회장', img: '/images/jip.jpg', hotspots: [] },
  'cafe': { title: '카페', img: '/images/cafe.jpg', hotspots: [] }, 
  'hotel': { title: '호텔', img: '/images/hotel.jpg', hotspots: [] }, 
  'pat': { title: '팻시설', img: '/images/pat.jpg', hotspots: [] }, 
  'bong02': { title: '봉안당 2', img: '/images/bong02.jpg', hotspots: [] },
  'bong03': { title: '봉안당 3', img: '/images/bong03.jpg', hotspots: [] }
};

export default function MemorialApp() {
  const [activeMenu, setActiveMenu] = useState('main'); 
  const [currentScene, setCurrentScene] = useState('Panorama01');
  const [lastOutdoorScene, setLastOutdoorScene] = useState('Panorama01');
  const [initView, setInitView] = useState({ pitch: 0, yaw: -26 });
  const [isPannellumLoaded, setIsPannellumLoaded] = useState(false);
  const [hasFlowered, setHasFlowered] = useState(false);
  const [isFlowering, setIsFlowering] = useState(false);
  const [toastMessage, setToastMessage] = useState([]);
  const [showToast, setShowToast] = useState(false);
  
  const [imgError, setImgError] = useState(false);

  const viewerRef = useRef(null);
  const pannellumInstance = useRef(null);

  const startGallery = () => {
    setCurrentScene('Panorama01');
    setInitView({ pitch: 0, yaw: -26 });
    setActiveMenu('gallery');
  };

  const handleExit = () => {
    if (SCENE_CONFIG[currentScene]?.isOutdoor) {
      setActiveMenu('main');
    } else if (currentScene === 'bong1234') {
      setCurrentScene(lastOutdoorScene);
    } else if (currentScene === 'yu') {
      setCurrentScene('bong1234');
    } else if (currentScene === 'per') {
      setCurrentScene('yu');
    } else {
      setCurrentScene(lastOutdoorScene);
    }
  };

  const handleHotspotClick = (hs) => {
    if (SCENE_CONFIG[currentScene]?.isOutdoor && !SCENE_CONFIG[hs.target]?.isOutdoor) {
      setLastOutdoorScene(currentScene);
    }
    setInitView({ pitch: 0, yaw: hs.targetYaw || 0 });
    setCurrentScene(hs.target);
  };

  useEffect(() => {
    setImgError(false);
  }, [currentScene]);

  useEffect(() => {
    if (pannellumInstance.current) {
      try {
        pannellumInstance.current.destroy();
      } catch (e) {
        console.error("Pannellum destroy error:", e);
      }
      pannellumInstance.current = null;
    }

    if (activeMenu === 'gallery' && isPannellumLoaded && window.pannellum) {
      const data = SCENE_CONFIG[currentScene];
      
      if (!data?.isFlat && viewerRef.current) {
        const isMobile = window.innerWidth <= 768;
        const startHfov = isMobile ? 50 : 120;

        pannellumInstance.current = window.pannellum.viewer(viewerRef.current, {
          type: "equirectangular", panorama: data.img,
          pitch: initView.pitch, yaw: initView.yaw,
          hfov: startHfov, maxHfov: 120, minHfov: 50,
          autoLoad: true, showControls: false,
          hotSpots: (data.hotspots || []).map(hs => ({
            pitch: hs.pitch, yaw: hs.yaw,
            cssClass: "custom-hotspot",
            createTooltipFunc: (div) => {
              if (hs.type === 'nav') { 
                const width = hs.w || 55; const height = hs.h || 85;
                div.innerHTML = `<div class="road-arrow-3d" style="width:${width}px; height:${height}px; background-color:${hs.color}; transform: translate(-50%, -50%) rotateX(65deg) rotate(${hs.rotate || '0deg'});"></div>`; 
              } else { div.innerHTML = `<div class="room-tag-red">${hs.text}</div>`; }
            },
            clickHandlerFunc: () => handleHotspotClick(hs)
          }))
        });
      }
    }
  }, [activeMenu, currentScene, isPannellumLoaded, initView]);

  return (
    <div className="app-container">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css" />
      <Script src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js" strategy="afterInteractive" onLoad={() => setIsPannellumLoaded(true)} />
      
      {activeMenu === 'main' && (
        <div className="main-viewport">
          <img src="/images/main.jpg" className="full-bg" />
          <div className="main-overlay">
            <div className="main-header">
              <h1 className="main-title">추모관</h1>
              <p className="main-subtitle">영원한 안식, 함께 기억합니다.</p>
            </div>
            <div className="bottom-menu">
              <button onClick={() => {
                if (hasFlowered) {
                  setToastMessage(["이미 헌화하셨습니다.", "따뜻한 마음 감사합니다."]);
                  setShowToast(true); setTimeout(() => setShowToast(false), 3000);
                } else {
                  setHasFlowered(true); setIsFlowering(true);
                  setTimeout(() => setIsFlowering(false), 2600);
                }
              }}><Flower2 color="white" /><span>헌화</span></button>
              <button onClick={() => setActiveMenu('video')}><Landmark color="white" /><span>추모관</span></button>
              <button onClick={() => {}}><NotebookPen color="white" /><span>방명록</span></button>
            </div>
          </div>
          {isFlowering && <div className="flower-anim"><img src="/images/guk.png" /></div>}
        </div>
      )}

      {activeMenu === 'video' && (
        <div className="video-full-viewport">
          <video src="/videos/mo01.mp4" autoPlay playsInline onEnded={startGallery} className="full-video-element" />
          <button className="video-exit-button" onClick={startGallery}><X size={32} color="white" /></button>
        </div>
      )}

      {activeMenu === 'gallery' && (
        <div className="gallery-full-viewport">
          
          {SCENE_CONFIG[currentScene]?.isFlat && (
            <div className="flat-scene-wrapper">
              <img 
                src={SCENE_CONFIG[currentScene].img} 
                className="flat-scene-img" 
                alt="평면 사진" 
                onError={() => setImgError(true)}
              />
              
              {imgError && (
                <div className="img-error-msg">
                  <strong>이미지 로드 실패</strong><br/>
                  경로에 파일이 없거나 대소문자가 틀립니다:<br/>
                  <span style={{color: 'yellow'}}>{SCENE_CONFIG[currentScene].img}</span>
                </div>
              )}

              {currentScene === 'bong1234' && !imgError && (
                <div className="flat-grid-wrapper">
                  <div className="grid-item">A-1</div>
                  <div className="grid-item">B-1</div>
                  <div className="grid-item">C-1</div>
                  <div className="grid-item">D-1</div>

                  <div className="grid-item">A-2</div>
                  <div className="grid-item">B-2</div>
                  <div className="grid-item">C-2</div>
                  <div className="grid-item">D-2</div>

                  <div className="grid-item">A-3</div>
                  <div className="grid-item">B-3</div>
                  <div className="grid-item">C-3</div>
                  <div className="grid-item">D-3</div>

                  <div className="grid-item">A-4</div>
                  <div className="grid-item">B-4</div>
                  <div className="grid-item">C-4</div>
                  <div className="grid-item clickable" onClick={() => setCurrentScene('yu')}>D-4</div>
                </div>
              )}

              {currentScene === 'yu' && !imgError && (
                <div className="yu-clickbox" onClick={() => setCurrentScene('per')}></div>
              )}
            </div>
          )}

          {!SCENE_CONFIG[currentScene]?.isFlat && (
            <div ref={viewerRef} className="viewer-canvas" />
          )}

          {SCENE_CONFIG[currentScene]?.title && (
            <div className="scene-title-badge">{SCENE_CONFIG[currentScene].title}</div>
          )}

          <button className="exit-button" onClick={handleExit}><X size={32} /></button>
        </div>
      )}

      {showToast && <div className="toast-center">{toastMessage.map((line, i) => <div key={i}>{line}</div>)}</div>}

      <style jsx global>{`
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; background: #000; overflow: hidden; font-family: 'Noto Serif KR', serif; }
        .app-container { width: 100vw; height: 100vh; display: flex; justify-content: center; align-items: center; }
        .main-viewport { position: relative; width: 100%; height: 100%; max-width: 450px; background: #000; }
        .full-bg { width: 100%; height: 100%; object-fit: cover; }
        .main-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; padding: 15vh 0 8vh; background: linear-gradient(to bottom, rgba(255,255,255,0.3), transparent, rgba(0,0,0,0.6)); z-index: 20; }
        .main-title { font-size: 3.8rem; margin: 0; color: #1a1a1a; font-weight: 700; text-shadow: 0 2px 8px rgba(255,255,255,0.7); text-align: center; }
        .main-subtitle { font-size: 1.1rem; color: #222; margin: -5px 0 0 0; font-weight: 500; text-shadow: 0 1px 4px rgba(255,255,255,0.8); text-align: center; }
        .bottom-menu { display: flex; justify-content: space-around; width: 100%; }
        .bottom-menu button { background: none; border: none; color: white; display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; }
        .video-full-viewport { position: fixed; inset: 0; background: #000; z-index: 150; }
        .full-video-element { width: 100%; height: 100%; object-fit: cover; }
        .video-exit-button { position: absolute; top: 30px; right: 30px; background: rgba(0,0,0,0.5); border: 1px solid white; border-radius: 50%; width: 50px; height: 50px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .gallery-full-viewport { position: fixed; inset: 0; z-index: 100; background: #000; }
        .viewer-canvas { width: 100%; height: 100%; background: #000; }
        
        .flat-scene-wrapper { position: absolute; inset: 0; width: 100vw; height: 100vh; background: #111; z-index: 105; display: block; }
        .flat-scene-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; z-index: 106; }
        .img-error-msg { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.8); color: #ff5555; border: 2px solid #ff5555; padding: 25px; border-radius: 12px; font-size: 1.2rem; text-align: center; z-index: 120; line-height: 1.6; }
        
        .flat-grid-wrapper { 
          position: absolute; 
          top: 25%; 
          left: 10%; 
          display: grid; 
          grid-template-columns: repeat(4, auto); 
          gap: 4vh 4vw; 
          z-index: 115; 
        }
        .grid-item { 
          color: #ef4444; 
          font-weight: 900; 
          font-size: 3.2rem; 
          text-shadow: 2px 2px 0px #fff, -2px -2px 0px #fff, 2px -2px 0px #fff, -2px 2px 0px #fff; 
          font-family: 'Arial', sans-serif; 
          pointer-events: none; 
          text-align: center;
        }
        .grid-item.clickable { 
          pointer-events: auto; 
          cursor: pointer; 
          transition: transform 0.2s; 
        }
        .grid-item.clickable:hover { 
          transform: scale(1.1); 
          color: #dc2626; 
        }
        
        .yu-clickbox { 
          position: absolute; 
          top: 6%;      
          left: 4%;     
          width: 9%;    
          height: 28%;  
          cursor: pointer; 
          z-index: 115; 
          pointer-events: auto; 
          background: transparent; 
        }
        
        .scene-title-badge { position: absolute; top: 10px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.75); border: 2px solid #ef4444; color: white; padding: 10px 30px; border-radius: 8px; font-weight: bold; z-index: 130; }
        .exit-button { position: absolute; top: 10px; right: 30px; z-index: 130; background: rgba(0,0,0,0.5); border: 1px solid #fff; border-radius: 50%; width: 50px; height: 50px; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .room-tag-red { background: rgba(0,0,0,0.8); border: 2.5px solid #ef4444; color: white; padding: 7px 18px; border-radius: 8px; font-weight: bold; white-space: nowrap; cursor: pointer; }
        .road-arrow-3d { clip-path: polygon(50% 0%, 15% 100%, 50% 80%, 85% 100%); cursor: pointer; }
        
        /* -------------------------------------------------------------------------- */
        /* 기본 (데스크탑 PC) 전용 스타일 - 화면 상단(25%~60%)으로 크게 올라가게 유지 */
        /* -------------------------------------------------------------------------- */
        .toast-center { 
          position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
          background: rgba(0,0,0,0.85); color: white; padding: 22px 45px; 
          border-radius: 20px; z-index: 500; text-align: center; 
        }
        .flower-anim { 
          position: absolute; left: 50%; bottom: 25%; transform: translateX(-50%); 
          z-index: 20; animation: flower-up-desktop 2.6s forwards; 
        }
        .flower-anim img { width: auto; max-width: 150px; }
        
        @keyframes flower-up-desktop { 
          0% { bottom: 25%; opacity: 0; } 
          20% { opacity: 1; } 
          100% { bottom: 60%; opacity: 0; } 
        }

        /* -------------------------------------------------------------------------- */
        /* 모바일 (스마트폰) 전용 스타일 - 768px 이하일 때 덮어쓰기 */
        /* -------------------------------------------------------------------------- */
        @media (max-width: 768px) {
          .toast-center {
            padding: 18px 30px;
            white-space: nowrap; /* 줄바꿈 절대 방지 (2줄 유지) */
            font-size: 0.95rem;
            line-height: 1.5;
          }
          .flower-anim {
            bottom: 10%;
            animation: flower-up-mobile 2.6s forwards;
          }
          .flower-anim img { width: 120px; }
        }
        
        @keyframes flower-up-mobile {
          0% { bottom: 10%; opacity: 0; } 
          20% { opacity: 1; } 
          100% { bottom: 45%; opacity: 0; } 
        }
      `}</style>
    </div>
  );
}