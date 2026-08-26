import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGdtStore } from '../../store/useGdtStore';
import { Geometry, Base, Subtraction } from '@react-three/csg';
import { Html } from '@react-three/drei';

const OnboardingBlock: React.FC = () => {
  const { showFabricationErrors, onboardingStep } = useGdtStore();
  const groupRef = useRef<THREE.Group>(null);
  const blockRef = useRef<THREE.Group>(null);

  const metalMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#e2e8f0', 
    roughness: 0.3,
    metalness: 0.7,
  }), []);

  // Animate the block descending to touch the Datum Simulator (Step 4)
  useFrame((state, delta) => {
    if (blockRef.current) {
      const targetY = onboardingStep === 4 ? 0 : 2;
      blockRef.current.position.y = THREE.MathUtils.lerp(
        blockRef.current.position.y,
        targetY,
        delta * 3
      );
      
      // If showing fabrication errors, the block will tilt when resting on the datum
      const targetRotationZ = (onboardingStep === 4 && showFabricationErrors) ? 0.05 : 0;
      blockRef.current.rotation.z = THREE.MathUtils.lerp(
        blockRef.current.rotation.z,
        targetRotationZ,
        delta * 3
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Datum A Simulator (Surface Plate) */}
      {onboardingStep === 4 && (
        <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial color="#2563eb" transparent opacity={0.3} side={THREE.DoubleSide} />
          <Html position={[0, -4, 0.1]} center>
            <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap font-bold">
              Plano de Referência Exato (Datum A)
            </div>
          </Html>
        </mesh>
      )}

      {/* Main Block */}
      <group ref={blockRef} position={[0, 2, 0]}>
        <mesh receiveShadow castShadow position={[0, 1, 0]}>
          <Geometry useGroups>
            {/* The Block */}
            <Base material={metalMaterial}>
              <boxGeometry args={[4, 2, 4]} />
            </Base>
            
            {/* Center Hole */}
            <Subtraction position={[0, 0, 0]}>
              <cylinderGeometry args={[0.8, 0.8, 3, 32]} />
            </Subtraction>

            {/* Fabrication Error: Angled cut on the bottom */}
            {showFabricationErrors && (
              <Subtraction position={[0, -1.2, 0]} rotation={[0, 0, 0.05]}>
                <boxGeometry args={[6, 0.5, 6]} />
              </Subtraction>
            )}
          </Geometry>
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Highlight Zone for Step 3 */}
        {onboardingStep >= 3 && (
          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.9, 0.9, 2.1, 32]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.4} depthWrite={false} />
            <Html position={[1.5, 1, 0]} center>
              <div className="bg-emerald-600 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap font-bold">
                Zona de Tolerância (⌀ 0.20)
              </div>
            </Html>
          </mesh>
        )}

        {/* Imperfect Surface Tooltip */}
        {showFabricationErrors && (
          <Html position={[-2, 0.2, 2]} center>
            <div className="bg-rose-600 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap font-bold">
              Superfície Real Imperfeita
            </div>
          </Html>
        )}
      </group>
    </group>
  );
};

export default OnboardingBlock;
