import React, { useState, useEffect } from 'react';
import Canvas3D from './components/Canvas3D';
import Header from './components/Header';
import BuildingModal from './components/BuildingModal';
import NavigationHUD from './components/NavigationHUD';
import TourController from './components/TourController';
import MiniMap from './components/MiniMap';
import QuickViewPresets from './components/QuickViewPresets';
import MeasureToolHUD from './components/MeasureToolHUD';
import FPControlsHUD from './components/FPControlsHUD';
import EventsModal from './components/EventsModal';
import AboutModal from './components/AboutModal';
import { BUILDINGS_DATA, CAMERA_PRESETS } from './data/campusData';
import { TOUR_STEPS } from './data/tourSteps';
import { findPath } from './utils/pathfinding';
import { soundEngine } from './utils/audioEffects';

export default function App() {
  // Building Selection & Inspector State
  const [activeBuilding, setActiveBuilding] = useState(null);
  const [isExploded, setIsExploded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  // Environment & View State
  const [timeOfDay, setTimeOfDay] = useState('day'); // 'day' | 'sunset' | 'night' | 'rain'
  const [cameraPreset, setCameraPreset] = useState(CAMERA_PRESETS[0]);
  const [onScreenLabels, setOnScreenLabels] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);

  // Guided Drone Tour State
  const [isTouring, setIsTouring] = useState(false);
  const [tourStepIndex, setTourStepIndex] = useState(0);
  const [isTourPlaying, setIsTourPlaying] = useState(false);

  // Wayfinding & Navigation State
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [startBuildingId, setStartBuildingId] = useState('gate-1-main');
  const [endBuildingId, setEndBuildingId] = useState(null);
  const [activeRoute, setActiveRoute] = useState(null);

  // Distance Measurement State
  const [isMeasureActive, setIsMeasureActive] = useState(false);
  const [measurePoints, setMeasurePoints] = useState([]);

  // First-Person Mode State
  const [isFPMode, setIsFPMode] = useState(false);
  const [fpMoveVector, setFpMoveVector] = useState({ x: 0, y: 0 });

  // Dialog Modals State
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Handle Wayfinding calculation whenever start or destination changes
  useEffect(() => {
    if (startBuildingId && endBuildingId && startBuildingId !== endBuildingId) {
      const route = findPath(startBuildingId, endBuildingId);
      setActiveRoute(route);
    } else {
      setActiveRoute(null);
    }
  }, [startBuildingId, endBuildingId]);

  // Handle building selection
  const handleSelectBuilding = (building) => {
    setActiveBuilding(building);
    setIsExploded(false);
    // If tour is playing, pause tour
    if (isTouring) {
      setIsTourPlaying(false);
    }
  };

  // Close building modal
  const handleCloseBuilding = () => {
    setActiveBuilding(null);
    setIsExploded(false);
  };

  // "Directions to here" from building card
  const handleNavigateToBuilding = (targetBuildingId) => {
    setEndBuildingId(targetBuildingId);
    if (!startBuildingId || startBuildingId === targetBuildingId) {
      setStartBuildingId('gate-1-main');
    }
    setIsNavOpen(true);
    setActiveBuilding(null);
    setIsExploded(false);
  };

  // Start Drone Tour
  const handleStartTour = () => {
    setIsTouring(true);
    setTourStepIndex(0);
    setIsTourPlaying(true);
    setActiveBuilding(null);
    setIsExploded(false);
    setIsNavOpen(false);
    setIsFPMode(false);
    setIsMeasureActive(false);
  };

  // Exit Drone Tour
  const handleExitTour = () => {
    setIsTouring(false);
    setIsTourPlaying(false);
    setCameraPreset(CAMERA_PRESETS[0]);
  };

  // Toggle Navigation
  const handleToggleNavigation = () => {
    setIsNavOpen(!isNavOpen);
    if (!isNavOpen) {
      setIsTouring(false);
      setIsMeasureActive(false);
    }
  };

  // Toggle Measurement Tool
  const handleToggleMeasure = () => {
    setIsMeasureActive(!isMeasureActive);
    setMeasurePoints([]);
    if (!isMeasureActive) {
      setIsNavOpen(false);
      setIsTouring(false);
      setActiveBuilding(null);
    }
  };

  // Start Walking Route in First Person Mode
  const handleStartWalkingMode = () => {
    setIsFPMode(true);
    setIsNavOpen(false);
    setActiveBuilding(null);
  };

  // Select Camera Preset
  const handleSelectPreset = (preset) => {
    setCameraPreset(preset);
    setActiveBuilding(null);
    setIsExploded(false);
    setIsTouring(false);
    setIsFPMode(false);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-slate-950">
      {/* 3D WebGL Canvas */}
      <Canvas3D
        activeBuilding={activeBuilding}
        setActiveBuilding={handleSelectBuilding}
        isExploded={isExploded}
        timeOfDay={timeOfDay}
        cameraPreset={cameraPreset}
        tourCurrentStep={TOUR_STEPS[tourStepIndex]}
        isTouring={isTouring}
        activeRoute={activeRoute}
        measureMode={isMeasureActive}
        measurePoints={measurePoints}
        setMeasurePoints={setMeasurePoints}
        isFPMode={isFPMode}
        fpMoveVector={fpMoveVector}
        onScreenLabels={onScreenLabels}
      />

      {/* Header Navigation Bar */}
      {!isTouring && !isFPMode && (
        <Header
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onSelectBuilding={handleSelectBuilding}
          timeOfDay={timeOfDay}
          setTimeOfDay={setTimeOfDay}
          isAudioOn={isAudioOn}
          setIsAudioOn={setIsAudioOn}
          onStartTour={handleStartTour}
          onToggleNavigation={handleToggleNavigation}
          onToggleMeasure={handleToggleMeasure}
          isMeasureActive={isMeasureActive}
          onOpenEvents={() => setIsEventsOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
          onScreenLabels={onScreenLabels}
          setOnScreenLabels={setOnScreenLabels}
        />
      )}

      {/* Building Details & Multi-Floor Exploder Drawer */}
      {activeBuilding && !isTouring && !isFPMode && (
        <BuildingModal
          building={activeBuilding}
          onClose={handleCloseBuilding}
          isExploded={isExploded}
          setIsExploded={setIsExploded}
          onNavigateTo={handleNavigateToBuilding}
        />
      )}

      {/* Wayfinding & Navigation HUD */}
      {isNavOpen && !isTouring && !isFPMode && (
        <NavigationHUD
          startBuildingId={startBuildingId}
          setStartBuildingId={setStartBuildingId}
          endBuildingId={endBuildingId}
          setEndBuildingId={setEndBuildingId}
          activeRoute={activeRoute}
          onClose={() => setIsNavOpen(false)}
          onStartWalkingMode={handleStartWalkingMode}
        />
      )}

      {/* Guided Drone Tour Controller */}
      {isTouring && (
        <TourController
          currentStepIndex={tourStepIndex}
          setCurrentStepIndex={setTourStepIndex}
          isPlaying={isTourPlaying}
          setIsPlaying={setIsTourPlaying}
          onExitTour={handleExitTour}
        />
      )}

      {/* Distance Measurement Tool HUD */}
      {isMeasureActive && (
        <MeasureToolHUD
          measurePoints={measurePoints}
          onReset={() => setMeasurePoints([])}
          onClose={() => setIsMeasureActive(false)}
        />
      )}

      {/* First-Person Walk Mode HUD */}
      {isFPMode && (
        <FPControlsHUD
          onExitFP={() => setIsFPMode(false)}
          setFpMoveVector={setFpMoveVector}
        />
      )}

      {/* Camera Viewpoint Presets Toolbar */}
      {!isTouring && !isFPMode && !activeBuilding && (
        <QuickViewPresets
          activePreset={cameraPreset}
          onSelectPreset={handleSelectPreset}
        />
      )}

      {/* 2D Top-Down Mini Radar Map */}
      {!isTouring && !isFPMode && (
        <MiniMap
          activeBuilding={activeBuilding}
          onSelectBuilding={handleSelectBuilding}
          activeRoute={activeRoute}
        />
      )}

      {/* Campus Events & Fests Modal */}
      <EventsModal
        isOpen={isEventsOpen}
        onClose={() => setIsEventsOpen(false)}
        onSelectBuilding={handleSelectBuilding}
      />

      {/* About KIET University Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </main>
  );
}
