import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Grid } from '@react-three/drei';
import FlangeModel from './FlangeModel';
import ToleranceZones from './ToleranceZones';
import VirtualGaugePins from './VirtualGaugePins';
import { useGdtStore } from '../../store/useGdtStore';
import * as THREE from 'three';

const Viewport3D: React.FC = () => {
  const { showToleranceZones } = useGdtStore();

  return (
    <Canvas
      camera={{ position: [8, 8, 8], fov: 40 }}
      shadows
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <color attach="background" args={['#f8fafc']} /> {/* slate-50 */}
      
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      
      <Environment preset="studio" environmentIntensity={0.5} />

      <Grid 
        infiniteGrid 
        fadeDistance={30} 
        sectionColor="#cbd5e1" 
        cellColor="#e2e8f0" 
        position={[0, -0.01, 0]} 
      />

      <Suspense fallback={null}>
        <group position={[0, 1, 0]}>
          <FlangeModel />
          {showToleranceZones && <ToleranceZones />}
          <VirtualGaugePins />
        </group>
      </Suspense>

      <ContactShadows 
        position={[0, 0, 0]} 
        opacity={0.5} 
        scale={20} 
        blur={1.5} 
        far={10} 
      />
      
      <OrbitControls 
        makeDefault 
        minPolarAngle={0} 
        maxPolarAngle={Math.PI / 2} 
        minDistance={5} 
        maxDistance={25}
      />
    </Canvas>
  );
};

export default Viewport3D;
