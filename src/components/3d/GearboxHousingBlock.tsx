import React from 'react';
import * as THREE from 'three';
import { useGdtStore } from '../../store/useGdtStore';

const GearboxHousingBlock: React.FC = () => {
  const { activeExercise } = useGdtStore();

  return (
    <group position={[0, 0, 0]}>
      {/* Main Solid Metallic Gearbox Housing Body */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 2.4, 3.6]} />
        <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Top Raised Cylindrical Bearing Boss */}
      <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.4, 32]} />
        <meshStandardMaterial color="#334155" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Base Flange */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.8, 0.3, 4.2]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Central Large Bearing Bore Hole (Visual Rim) */}
      <mesh position={[0, 2.71, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.05, 32]} />
        <meshBasicMaterial color={activeExercise === 5 ? "#06b6d4" : "#94a3b8"} side={THREE.DoubleSide} />
      </mesh>

      {/* ---------------- HIGHLIGHTS PER QUESTION ---------------- */}

      {/* Q1 Highlight: Whole Body Outline / Emissive Shell */}
      {activeExercise === 1 && (
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[4.3, 2.5, 3.7]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.2} wireframe />
        </mesh>
      )}

      {/* Q2 Highlight: Bottom Primary Datum A Plane */}
      {activeExercise === 2 && (
        <group>
          <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[5.8, 5.2]} />
            <meshBasicMaterial color="#2563eb" transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[-2.8, 0.3, 2.2]}>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial color="#2563eb" />
          </mesh>
        </group>
      )}

      {/* Q3 Highlight: Side Machined Face (Datum B / Perpendicularity Face) */}
      {activeExercise === 3 && (
        <group>
          <mesh position={[2.12, 1.2, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[3.8, 2.6]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.45} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[2.5, 2.2, 1.6]}>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial color="#10b981" />
          </mesh>
        </group>
      )}

      {/* Q4 Highlight: 4-Bolt Pattern Holes Emissive Rings */}
      {activeExercise === 4 && (
        <group position={[0, 0.32, 0]}>
          {/* Hole 1: Top-Left */}
          <mesh position={[-1.8, 0, -1.5]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.2, 0.35, 32]} />
            <meshBasicMaterial color="#10b981" side={THREE.DoubleSide} />
          </mesh>
          {/* Hole 2: Top-Right */}
          <mesh position={[1.8, 0, -1.5]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.2, 0.35, 32]} />
            <meshBasicMaterial color="#10b981" side={THREE.DoubleSide} />
          </mesh>
          {/* Hole 3: Bottom-Left */}
          <mesh position={[-1.8, 0, 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.2, 0.35, 32]} />
            <meshBasicMaterial color="#10b981" side={THREE.DoubleSide} />
          </mesh>
          {/* Hole 4: Bottom-Right */}
          <mesh position={[1.8, 0, 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.2, 0.35, 32]} />
            <meshBasicMaterial color="#10b981" side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* Q5 Highlight: Central Bearing Bore Cylindrical Zone */}
      {activeExercise === 5 && (
        <mesh position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.92, 0.92, 2.6, 32]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.45} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
};

export default GearboxHousingBlock;
