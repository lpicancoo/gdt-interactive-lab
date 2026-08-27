import React from 'react';
import * as THREE from 'three';
import { useGdtStore } from '../../store/useGdtStore';
import { Text } from '@react-three/drei';

const BlockSingleHole: React.FC = () => {
  const { sliderValues, showDatums } = useGdtStore();

  const holeDiameter = sliderValues.holeDiameter ?? 3.000;
  const devX = (sliderValues.deviationX ?? 0) * 10;
  const devY = (sliderValues.deviationY ?? 0) * 10;

  // MMC calculation for Module 1 (MMC = 3.000, Base Tol = 0.014)
  const mmc = 3.000;
  const bonus = Math.max(0, holeDiameter - mmc);
  const totalTol = 0.014 + bonus;
  const tolZoneRadius = (totalTol / 2) * 10 + 0.15; // scaled for 3D view

  const blockWidth = 5.0;
  const blockLength = 3.5;
  const blockHeight = 1.5;
  const holeRadius = (holeDiameter / 3.000) * 0.8;

  return (
    <group position={[0, blockHeight / 2, 0]}>
      {/* Base Plate Mesh */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[blockWidth, blockHeight, blockLength]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Actual Machined Hole representation */}
      <group position={[devX, 0, devY]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[holeRadius, holeRadius, blockHeight + 0.05, 32]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>

        {/* Centerline */}
        <mesh>
          <cylinderGeometry args={[0.015, 0.015, blockHeight + 1, 16]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      </group>

      {/* Cylindrical Tolerance Zone (Green Transparent Cylinder) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[tolZoneRadius, tolZoneRadius, blockHeight + 0.4, 32]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.3} wireframe={false} side={THREE.DoubleSide} />
      </mesh>

      {/* Datum A (Bottom Base Plane) */}
      {showDatums && (
        <group position={[0, -blockHeight / 2 - 0.02, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[blockWidth * 1.2, blockLength * 1.2]} />
            <meshBasicMaterial color="#2563eb" transparent opacity={0.2} side={THREE.DoubleSide} />
          </mesh>
          <DatumLabel label="A" position={[-blockWidth / 2 - 0.6, 0, blockLength / 2 + 0.4]} />
        </group>
      )}

      {/* Datum B (Side Plane) */}
      {showDatums && (
        <group position={[-blockWidth / 2 - 0.02, 0, 0]}>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[blockLength * 1.1, blockHeight * 1.2]} />
            <meshBasicMaterial color="#2563eb" transparent opacity={0.25} side={THREE.DoubleSide} />
          </mesh>
          <DatumLabel label="B" position={[0, blockHeight / 2 + 0.4, -blockLength / 2 - 0.4]} />
        </group>
      )}

      {/* Datum C (Front Plane) */}
      {showDatums && (
        <group position={[0, 0, blockLength / 2 + 0.02]}>
          <mesh>
            <planeGeometry args={[blockWidth * 1.1, blockHeight * 1.2]} />
            <meshBasicMaterial color="#2563eb" transparent opacity={0.25} side={THREE.DoubleSide} />
          </mesh>
          <DatumLabel label="C" position={[blockWidth / 2 + 0.4, blockHeight / 2 + 0.4, 0]} />
        </group>
      )}
    </group>
  );
};

const DatumLabel = ({ label, position }: { label: string; position: [number, number, number] }) => (
  <group position={position}>
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.05]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
    <mesh position={[0, 0, -0.02]}>
      <boxGeometry args={[0.55, 0.55, 0.02]} />
      <meshBasicMaterial color="#1e293b" />
    </mesh>
    <Text position={[0, 0, 0.04]} fontSize={0.35} color="#1e293b" font={undefined}>
      {label}
    </Text>
  </group>
);

export default BlockSingleHole;
