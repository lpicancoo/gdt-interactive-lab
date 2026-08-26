import React from 'react';
import { Html } from '@react-three/drei';
import { useGdtStore } from '../../store/useGdtStore';

const AssemblyStackBlock: React.FC = () => {
  const { 
    lengthHousing, 
    lengthShaft, 
    lengthWasher,
    showToleranceZones
  } = useGdtStore();

  const visualScale = 0.5; // Scale down mm dimensions to 3D scene units

  // Nominal reference dimensions
  const l1Norm = lengthHousing * visualScale; // Housing slot length
  const l2Norm = lengthShaft * visualScale;   // Shaft length
  const l3Norm = lengthWasher * visualScale;  // Washer thickness

  const gapMM = lengthHousing - (lengthShaft + lengthWasher);
  const isCollision = gapMM < 0.15;

  // Positioning along X axis from left datum wall (X = -l1Norm / 2)
  const leftWallX = -l1Norm / 2;
  const shaftX = leftWallX + (l2Norm / 2);
  const washerX = leftWallX + l2Norm + (l3Norm / 2);
  const rightWallX = l1Norm / 2;
  const gapCenterX = leftWallX + l2Norm + l3Norm + ((rightWallX - (leftWallX + l2Norm + l3Norm)) / 2);

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Translucent Housing (Carcaça com Rasgo Interno) */}
      <group>
        {/* Outer Housing Box (Translucent) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[l1Norm + 0.8, 3.2, 3.2]} />
          <meshStandardMaterial 
            color={isCollision ? "#ef4444" : "#94a3b8"} 
            transparent 
            opacity={0.35} 
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>

        {/* Housing Left Solid End-Wall */}
        <mesh position={[leftWallX - 0.4, 0, 0]}>
          <boxGeometry args={[0.8, 3.2, 3.2]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Housing Right Solid End-Wall */}
        <mesh position={[rightWallX + 0.4, 0, 0]}>
          <boxGeometry args={[0.8, 3.2, 3.2]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* 2. Metallic Shaft (Eixo Escalonado encostado na parece esquerda) */}
      <mesh position={[shaftX, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[1.0, 1.0, l2Norm, 32]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* 3. Thrust Washer (Arruela de Encosto no Eixo) */}
      <mesh position={[washerX, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.2, l3Norm, 32]} />
        <meshStandardMaterial 
          color={isCollision ? "#f87171" : "#fbbf24"} 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>

      {/* 4. Floating 3D Dimension Line & Real-time Gap Callout */}
      <group position={[gapCenterX, 1.8, 0]}>
        {/* Dimension Line Arrows */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[Math.max(0.1, (rightWallX - (leftWallX + l2Norm + l3Norm))), 0.04, 0.04]} />
          <meshBasicMaterial color={isCollision ? "#dc2626" : "#2563eb"} />
        </mesh>

        {/* HTML Real-time Gap Badge floating in 3D */}
        <Html position={[0, 0.4, 0]} center pointerEvents="none">
          <div className={`px-2.5 py-1 rounded-lg shadow-md font-mono text-xs font-bold flex items-center gap-1.5 whitespace-nowrap ${
            isCollision 
              ? 'bg-rose-600 text-white border border-rose-700 animate-bounce' 
              : 'bg-blue-600 text-white border border-blue-700'
          }`}>
            <span>Gap:</span>
            <span>{gapMM.toFixed(2)} mm</span>
            {isCollision && <span>(ALERTA)</span>}
          </div>
        </Html>
      </group>

      {/* Tolerance visual indicators */}
      {showToleranceZones && (
        <group>
          {/* Housing Slot boundary line */}
          <mesh position={[rightWallX, 0, 0]}>
            <boxGeometry args={[0.02, 3.4, 3.4]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.6} />
          </mesh>
        </group>
      )}
    </group>
  );
};

export default AssemblyStackBlock;
