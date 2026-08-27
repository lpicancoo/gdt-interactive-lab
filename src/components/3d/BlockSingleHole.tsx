import React from 'react';
import * as THREE from 'three';
import { useGdtStore } from '../../store/useGdtStore';
import { Text } from '@react-three/drei';

const BlockSingleHole: React.FC = () => {
  const { sliderValues, showDatums, activeConceptIndex } = useGdtStore();

  const holeDiameter = sliderValues.holeDiameter ?? 3.000;
  const rawDevX = sliderValues.deviationX ?? 0.000;
  const rawDevY = sliderValues.deviationY ?? 0.000;

  // Scale offset for 3D visual clarity (0.005 in -> 0.30 units)
  const devX = rawDevX * 60;
  const devY = rawDevY * 60;

  const blockWidth = 5.0;
  const blockLength = 3.5;
  const blockHeight = 1.5;
  const holeRadius = (holeDiameter / 3.000) * 0.75;

  // Zone Dimensions (Square Tol 0.010 -> 0.60 units | Cylindrical Tol 0.014 -> 0.84 units / radius 0.42)
  const squareHalfSide = 0.30;
  const cylinderRadius = 0.42;

  // Concept 2 tilt when active
  const groupRotation: [number, number, number] = activeConceptIndex === 2 
    ? [0.15, 0.20, -0.1] 
    : [0, 0, 0];

  const hideDatumsInConcept2 = activeConceptIndex === 2 ? false : showDatums;

  return (
    <group position={[0, blockHeight / 2, 0]} rotation={groupRotation}>
      {/* Base Metal Plate Mesh */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[blockWidth, blockHeight, blockLength]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.35} metalness={0.65} />
      </mesh>

      {/* Actual Machined Hole & Centerline */}
      <group position={[devX, 0, devY]}>
        {/* Hole Subtraction Void */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[holeRadius, holeRadius, blockHeight + 0.05, 32]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>

        {/* Machined Centerline Axis (Red Line) */}
        <mesh>
          <cylinderGeometry args={[0.02, 0.02, blockHeight + 1.2, 16]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      </group>

      {/* VISUALIZAÇÃO DE ZONAS (Conceito 0 e 1) */}
      <group>
        {/* 1. PRIMA QUADRADO TRANSLÚCIDO VERMELHO (Tolerância Linear ±0.005 / Lado 0.010) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[squareHalfSide * 2, blockHeight + 0.5, squareHalfSide * 2]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={0.25} wireframe={false} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[squareHalfSide * 2, blockHeight + 0.51, squareHalfSide * 2]} />
          <meshBasicMaterial color="#dc2626" wireframe />
        </mesh>

        {/* 2. CILINDRO TRANSLÚCIDO VERDE CIRCUNSCRITO (GD&T ⌀ 0.014 / Raio 0.42) */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[cylinderRadius, cylinderRadius, blockHeight + 0.55, 32]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[cylinderRadius, cylinderRadius, blockHeight + 0.56, 32]} />
          <meshBasicMaterial color="#059669" wireframe side={THREE.DoubleSide} />
        </mesh>

        {/* 3D Callout Labels for Concept 0 */}
        {activeConceptIndex === 0 && (
          <group position={[0, blockHeight / 2 + 0.6, 0]}>
            <Text position={[0, 0.5, 0]} fontSize={0.22} color="#1e293b">
              Prisma Linear (±0.005) vs Cilindro GD&T (⌀0.014)
            </Text>
            <Text position={[0, 0.2, 0]} fontSize={0.18} color="#059669 font-bold">
              +57% Mais Área Útil sem alterar o Parafuso!
            </Text>
          </group>
        )}

        {/* 3D Callout Labels for Concept 1 (Falha do Sistema Coordenado em X=0.006, Y=0.006) */}
        {activeConceptIndex === 1 && (
          <group position={[devX, blockHeight / 2 + 0.6, devY]}>
            <Text position={[0, 0.5, 0]} fontSize={0.20} color="#dc2626">
              ❌ Fora do Quadrado ±0.005 (Reprovado no Linear)
            </Text>
            <Text position={[0, 0.2, 0]} fontSize={0.20} color="#059669">
              ✅ Dentro do Cilindro ⌀0.014 (Aprovado pelo GD&T!)
            </Text>
          </group>
        )}
      </group>

      {/* Conceito 2: Datums Implícitos vs Explícitos - Setas de Medição e Dúvida */}
      {activeConceptIndex === 2 && (
        <group position={[0, blockHeight / 2 + 0.6, 0]}>
          <Text position={[0, 0.6, 0]} fontSize={0.22} color="#dc2626">
            ⚠️ Datums Implícitos (Sem Precedência Declarada)
          </Text>
          <Text position={[0, 0.25, 0]} fontSize={0.18} color="#1e293b">
            Medir a partir da base horizontal ou da face lateral esquerda?
          </Text>

          {/* Opposing measurement arrows */}
          <group position={[-blockWidth / 2 - 0.4, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
              <meshBasicMaterial color="#f59e0b" />
            </mesh>
          </group>
          <group position={[0, -blockHeight - 0.4, 0]}>
            <mesh>
              <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
              <meshBasicMaterial color="#f59e0b" />
            </mesh>
          </group>
        </group>
      )}

      {/* Datums Visualizations (Shown when not in Concept 2) */}
      {hideDatumsInConcept2 && (
        <group>
          {/* Datum A (Bottom Base Plane) */}
          <group position={[0, -blockHeight / 2 - 0.02, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[blockWidth * 1.2, blockLength * 1.2]} />
              <meshBasicMaterial color="#2563eb" transparent opacity={0.2} side={THREE.DoubleSide} />
            </mesh>
            <DatumLabel label="A" position={[-blockWidth / 2 - 0.6, 0, blockLength / 2 + 0.4]} />
          </group>

          {/* Datum B (Side Plane) */}
          <group position={[-blockWidth / 2 - 0.02, 0, 0]}>
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[blockLength * 1.1, blockHeight * 1.2]} />
              <meshBasicMaterial color="#2563eb" transparent opacity={0.25} side={THREE.DoubleSide} />
            </mesh>
            <DatumLabel label="B" position={[0, blockHeight / 2 + 0.4, -blockLength / 2 - 0.4]} />
          </group>

          {/* Datum C (Front Plane) */}
          <group position={[0, 0, blockLength / 2 + 0.02]}>
            <mesh>
              <planeGeometry args={[blockWidth * 1.1, blockHeight * 1.2]} />
              <meshBasicMaterial color="#2563eb" transparent opacity={0.25} side={THREE.DoubleSide} />
            </mesh>
            <DatumLabel label="C" position={[blockWidth / 2 + 0.4, blockHeight / 2 + 0.4, 0]} />
          </group>
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
    <Text position={[0, 0, 0.04]} fontSize={0.35} color="#1e293b">
      {label}
    </Text>
  </group>
);

export default BlockSingleHole;
