import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Grid } from '@react-three/drei';
import FlangeModel from './FlangeModel';
import ToleranceZones from './ToleranceZones';
import VirtualGaugePins from './VirtualGaugePins';
import OnboardingBlock from './OnboardingBlock';
import FlatnessBlock from './FlatnessBlock';
import CylinderBlock from './CylinderBlock';
import ParallelBlock from './ParallelBlock';
import PerpendicularBlock from './PerpendicularBlock';
import SteppedShaftBlock from './SteppedShaftBlock';
import CurvedProfileBlock from './CurvedProfileBlock';
import AssemblyStackBlock from './AssemblyStackBlock';
import GearboxHousingBlock from './GearboxHousingBlock';
import { useGdtStore } from '../../store/useGdtStore';
import * as THREE from 'three';

const Viewport3D: React.FC = () => {
  const { showToleranceZones, activeModule, setHasInteractedWithCamera } = useGdtStore();
  const controlsRef = useRef<any>(null);

  const handleCameraChange = () => {
    if (activeModule === 0) {
      setHasInteractedWithCamera(true);
    }
  };

  return (
    <Canvas
      camera={{ position: [8, 8, 8], fov: 40 }}
      shadows
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <color attach="background" args={['#f8fafc']} /> {/* slate-50 */}
      
      <ambientLight intensity={0.6} />
      <hemisphereLight intensity={0.4} groundColor="#cbd5e1" color="#ffffff" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />

      <Grid 
        infiniteGrid 
        fadeDistance={30} 
        sectionColor="#cbd5e1" 
        cellColor="#e2e8f0" 
        position={[0, -0.01, 0]} 
      />

      <Suspense fallback={null}>
        {activeModule === 0 ? (
          <OnboardingBlock />
        ) : activeModule === 1 ? (
          <FlatnessBlock />
        ) : activeModule === 2 ? (
          <CylinderBlock />
        ) : activeModule === 3 ? (
          <ParallelBlock />
        ) : activeModule === 4 ? (
          <PerpendicularBlock />
        ) : activeModule === 5 ? (
          <group position={[0, 1, 0]}>
            <FlangeModel />
            {showToleranceZones && <ToleranceZones />}
            <VirtualGaugePins />
          </group>
        ) : activeModule === 6 ? (
          <SteppedShaftBlock />
        ) : activeModule === 7 ? (
          <CurvedProfileBlock />
        ) : activeModule === 8 ? (
          <AssemblyStackBlock />
        ) : activeModule === 9 ? (
          <GearboxHousingBlock />
        ) : null}
      </Suspense>

      <ContactShadows 
        position={[0, 0, 0]} 
        opacity={0.5} 
        scale={20} 
        blur={1.5} 
        far={10} 
      />
      
      <OrbitControls 
        ref={controlsRef}
        makeDefault 
        minPolarAngle={0} 
        maxPolarAngle={Math.PI / 2} 
        minDistance={5} 
        maxDistance={25}
        onChange={handleCameraChange}
      />
    </Canvas>
  );
};

export default Viewport3D;
