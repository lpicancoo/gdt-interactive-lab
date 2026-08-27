import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGdtStore } from '../../store/useGdtStore';
import { Text } from '@react-three/drei';

const SteppedShaftBlock: React.FC = () => {
  const { 
    sliderValues,
    activeModule,
    activeConceptIndex
  } = useGdtStore();

  const shaftGroupRef = useRef<THREE.Group>(null);

  // Chapter 2 Thermal parameters
  const temp = sliderValues.temperature ?? 20;
  const l20 = sliderValues.machinedTolerance ?? 100.000;

  // Thermal expansion scaling for 3D visual feedback
  const deltaT = temp - 20;
  // Exaggerate thermal expansion factor for visual 3D demonstration
  const expansionFactor = 1 + (deltaT * 0.0035);

  const isChapter2 = activeModule === 1;

  // Geometry dimensions
  const journalRadius = 0.8;
  const journalLength = 2.0 * (isChapter2 ? expansionFactor : 1);

  const midRadius = 1.4;
  const midLength = 3.5 * (isChapter2 ? expansionFactor : 1);

  // Slow rotation for 3D inspection view
  useFrame((_, delta) => {
    if (shaftGroupRef.current && !isChapter2) {
      shaftGroupRef.current.rotation.x += delta * 0.8;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Rotating / Static Stepped Shaft Group */}
      <group ref={shaftGroupRef} scale={[isChapter2 ? expansionFactor : 1, 1, 1]}>
        {/* Left Journal */}
        <mesh position={[-2.6, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[journalRadius, journalRadius, journalLength, 32]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Right Journal */}
        <mesh position={[2.6, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[journalRadius, journalRadius, journalLength, 32]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Middle Central Body */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[midRadius, midRadius, midLength, 64]} />
          <meshStandardMaterial 
            color={temp > 25 ? "#f97316" : temp < 15 ? "#0284c7" : "#94a3b8"} 
            metalness={0.75} 
            roughness={0.25} 
          />
        </mesh>
      </group>

      {/* CMM PROBE / APALPADOR DE MEDIÇÃO ENCOSTADO NA SUPERFÍCIE */}
      <group position={[0, midRadius + 0.15, 0]}>
        {/* Ruby Probe Tip Sphere */}
        <mesh position={[0, 0.12, 0]}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial color="#ef4444" roughness={0.1} metalness={0.9} />
        </mesh>

        {/* Probe Stylus Shaft */}
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 1.4, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* CMM Probe Sensor Head */}
        <mesh position={[0, 1.8, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.5, 32]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>

        <Text position={[0, 2.3, 0]} fontSize={0.22} color="#1e293b">
          Apalpador CMM (Inspeção a {temp}°C)
        </Text>
      </group>

      {/* COTAS LINEARES 3D (LINHAS DE EXTENSÃO E SETAS DIMENSIONAIS) */}
      {isChapter2 && (
        <group>
          {/* Cota do Comprimento Total (100.000 ± 0.020 mm) */}
          <group position={[0, -2.2, 0]}>
            {/* Horizontal dimension line */}
            <mesh>
              <boxGeometry args={[7.2 * expansionFactor, 0.03, 0.03]} />
              <meshBasicMaterial color="#2563eb" />
            </mesh>
            {/* Left extension line */}
            <mesh position={[-3.6 * expansionFactor, 1.1, 0]}>
              <boxGeometry args={[0.03, 2.2, 0.03]} />
              <meshBasicMaterial color="#94a3b8" />
            </mesh>
            {/* Right extension line */}
            <mesh position={[3.6 * expansionFactor, 1.1, 0]}>
              <boxGeometry args={[0.03, 2.2, 0.03]} />
              <meshBasicMaterial color="#94a3b8" />
            </mesh>
            {/* Dimension Text */}
            <Text position={[0, -0.4, 0]} fontSize={0.28} color="#1e293b font-bold">
              Comprimento Nominal: {l20.toFixed(3)} mm (a 20°C)
            </Text>
          </group>

          {/* Cota do Diâmetro Central (Ø 40 mm) */}
          <group position={[0, 0, 1.8]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.03, midRadius * 2, 0.03]} />
              <meshBasicMaterial color="#059669" />
            </mesh>
            <Text position={[0.6, 0, 0]} fontSize={0.25} color="#059669 font-bold">
              ⌀ 40.000 mm
            </Text>
          </group>

          {/* Callout da Regra Selecionada no Painel Esquerdo */}
          {activeConceptIndex !== undefined && (
            <group position={[0, 3.0, 0]}>
              <Text position={[0, 0, 0]} fontSize={0.24} color="#2563eb font-bold">
                Foco ASME Rule #{activeConceptIndex + 1}: Inspeção Metrológica
              </Text>
            </group>
          )}
        </group>
      )}
    </group>
  );
};

export default SteppedShaftBlock;
