import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useGdtStore } from '../../store/useGdtStore';
import { Text } from '@react-three/drei';
import { Geometry, Base, Subtraction } from '@react-three/csg';

const FlangeModel: React.FC = () => {
  const { showDatums, selectedDatumInFCF, deviationX, deviationY, holeDiameter } = useGdtStore();
  
  const metalMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#e2e8f0', 
    roughness: 0.35,
    metalness: 0.65,
  }), []);

  const flangeRadius = 4;
  const flangeThickness = 0.5;
  const centerHoleRadius = 1.5;
  const holePatternRadius = 2.75;
  
  const positions = [
    [holePatternRadius * Math.cos(Math.PI/4), -holePatternRadius * Math.sin(Math.PI/4)], 
    [holePatternRadius * Math.cos(3*Math.PI/4), -holePatternRadius * Math.sin(3*Math.PI/4)],
    [holePatternRadius * Math.cos(5*Math.PI/4), -holePatternRadius * Math.sin(5*Math.PI/4)],
    [holePatternRadius * Math.cos(7*Math.PI/4), -holePatternRadius * Math.sin(7*Math.PI/4)],
  ];

  return (
    <group>
      {/* Main Flange Body built with CSG */}
      <mesh position={[0, flangeThickness/2, 0]} receiveShadow castShadow>
        <Geometry useGroups>
          <Base material={metalMaterial}>
            <cylinderGeometry args={[flangeRadius, flangeRadius, flangeThickness, 64]} />
          </Base>
          
          {/* Datum B: Center Hole */}
          <Subtraction position={[0, 0, 0]}>
            <cylinderGeometry args={[centerHoleRadius, centerHoleRadius, flangeThickness + 0.1, 32]} />
          </Subtraction>

          {/* Datum C: Keyway */}
          <Subtraction position={[centerHoleRadius, 0, 0]}>
            <boxGeometry args={[0.5, flangeThickness + 0.1, 0.8]} />
          </Subtraction>

          {/* 4 Pattern Holes */}
          {positions.map((pos, index) => {
            // Apply deviation and diameter scaling only to the first hole for this MVP demo
            const x = index === 0 ? pos[0] + (deviationX * 2.0) : pos[0];
            const y = index === 0 ? pos[1] + (deviationY * 2.0) : pos[1]; 
            const radius = (index === 0 ? holeDiameter : 10.0) / 10.0 * 0.4;
            
            return (
              <Subtraction key={index} position={[x, 0, y]}>
                <cylinderGeometry args={[radius, radius, flangeThickness + 0.1, 32]} />
              </Subtraction>
            );
          })}
        </Geometry>
        <meshStandardMaterial color="#e2e8f0" roughness={0.35} metalness={0.65} />
      </mesh>

      {/* Datums Visualizations */}
      {showDatums && (
        <group>
          {/* Datum A (Bottom Face) */}
          <group position={[0, -0.05, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[flangeRadius * 2.2, flangeRadius * 2.2]} />
              <meshBasicMaterial 
                color={selectedDatumInFCF === 'A' ? '#f59e0b' : '#2563eb'} 
                transparent 
                opacity={selectedDatumInFCF === 'A' ? 0.3 : 0.1} 
                side={THREE.DoubleSide}
              />
            </mesh>
            <DatumTag label="A" position={[-flangeRadius - 1, 0, flangeRadius + 1]} active={selectedDatumInFCF === 'A'} />
          </group>

          {/* Datum B (Center Axis) */}
          <group>
            <mesh position={[0, flangeThickness, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 3]} />
              <meshBasicMaterial color={selectedDatumInFCF === 'B' ? '#f59e0b' : '#2563eb'} />
            </mesh>
            <DatumTag label="B" position={[0, 2, 0]} active={selectedDatumInFCF === 'B'} />
          </group>

          {/* Datum C (Keyway plane) */}
          <group position={[centerHoleRadius, flangeThickness, 0]}>
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[0.8, 1]} />
              <meshBasicMaterial 
                color={selectedDatumInFCF === 'C' ? '#f59e0b' : '#2563eb'} 
                transparent 
                opacity={selectedDatumInFCF === 'C' ? 0.5 : 0.2} 
                side={THREE.DoubleSide}
              />
            </mesh>
            <DatumTag label="C" position={[1, 0.6, 0]} active={selectedDatumInFCF === 'C'} />
          </group>
        </group>
      )}
    </group>
  );
};

const DatumTag = ({ label, position, active }: { label: string, position: [number, number, number], active: boolean }) => (
  <group position={position}>
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[0.4, 0.4, 0.05]} />
      <meshBasicMaterial color={active ? '#f59e0b' : '#ffffff'} />
    </mesh>
    <mesh position={[0, 0, -0.03]}>
      <boxGeometry args={[0.45, 0.45, 0.02]} />
      <meshBasicMaterial color="#000000" />
    </mesh>
    <Text position={[0, 0, 0.03]} fontSize={0.3} color={active ? '#ffffff' : '#000000'}>
      {label}
    </Text>
  </group>
);

export default FlangeModel;
