import React from 'react';
import * as THREE from 'three';
import { useGdtStore } from '../../store/useGdtStore';
import { Text } from '@react-three/drei';

const DatumTargetsPlateBlock: React.FC = () => {
  const { sliderValues, showDatums } = useGdtStore();

  const surfaceError = (sliderValues.datumSurfaceError ?? 0.020) * 15;
  const shiftVal = (sliderValues.shiftMovement ?? 0.000) * 20;

  const width = 4.5;
  const length = 3.0;
  const height = 1.0;

  return (
    <group position={[shiftVal, height / 2 + surfaceError, 0]}>
      {/* Physical Plate with Surface Undulation/Error */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, length]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* DATUM TARGETS (Pinos de Encosto Esféricos) */}
      {showDatums && (
        <group>
          {/* Datum Targets A1, A2, A3 (3 pontos sob a base A) */}
          <group position={[0, -height / 2 - surfaceError, 0]}>
            {/* A1 Target Sphere */}
            <mesh position={[-width / 3, -0.2, -length / 4]}>
              <sphereGeometry args={[0.18, 32, 32]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.8} />
            </mesh>
            <TargetText label="A1" position={[-width / 3, -0.6, -length / 4]} />

            {/* A2 Target Sphere */}
            <mesh position={[width / 3, -0.2, -length / 4]}>
              <sphereGeometry args={[0.18, 32, 32]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.8} />
            </mesh>
            <TargetText label="A2" position={[width / 3, -0.6, -length / 4]} />

            {/* A3 Target Sphere */}
            <mesh position={[0, -0.2, length / 3]}>
              <sphereGeometry args={[0.18, 32, 32]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.8} />
            </mesh>
            <TargetText label="A3" position={[0, -0.6, length / 3]} />

            {/* Simulated Datum Simulator Plane A */}
            <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[width * 1.2, length * 1.2]} />
              <meshBasicMaterial color="#2563eb" transparent opacity={0.25} side={THREE.DoubleSide} />
            </mesh>
          </group>

          {/* Datum Targets B1, B2 (2 pontos na face traseira B) */}
          <group position={[0, 0, -length / 2]}>
            <mesh position={[-width / 3, 0, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.4, 32]} />
              <meshStandardMaterial color="#10b981" roughness={0.2} metalness={0.8} />
            </mesh>
            <TargetText label="B1" position={[-width / 3, height / 2 + 0.4, -0.4]} />

            <mesh position={[width / 3, 0, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.4, 32]} />
              <meshStandardMaterial color="#10b981" roughness={0.2} metalness={0.8} />
            </mesh>
            <TargetText label="B2" position={[width / 3, height / 2 + 0.4, -0.4]} />
          </group>

          {/* Datum Target C1 (1 ponto na face lateral C) */}
          <group position={[-width / 2, 0, 0]}>
            <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.12, 0.12, 0.4, 32]} />
              <meshStandardMaterial color="#ec4899" roughness={0.2} metalness={0.8} />
            </mesh>
            <TargetText label="C1" position={[-0.6, height / 2 + 0.4, 0]} />
          </group>
        </group>
      )}
    </group>
  );
};

const TargetText = ({ label, position }: { label: string; position: [number, number, number] }) => (
  <group position={position}>
    <mesh>
      <circleGeometry args={[0.25, 32]} />
      <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
    </mesh>
    <mesh position={[0, 0, -0.01]}>
      <circleGeometry args={[0.28, 32]} />
      <meshBasicMaterial color="#1e293b" side={THREE.DoubleSide} />
    </mesh>
    <Text position={[0, 0, 0.02]} fontSize={0.25} color="#1e293b">
      {label}
    </Text>
  </group>
);

export default DatumTargetsPlateBlock;
