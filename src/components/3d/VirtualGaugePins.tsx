import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGdtStore } from '../../store/useGdtStore';

const VirtualGaugePins: React.FC = () => {
  const { gaugeAnimationActive, setGaugeAnimationActive } = useGdtStore();
  const groupRef = useRef<THREE.Group>(null);
  const holePatternRadius = 2.75;

  const positions = [
    [holePatternRadius * Math.cos(Math.PI/4), -holePatternRadius * Math.sin(Math.PI/4)], 
    [holePatternRadius * Math.cos(3*Math.PI/4), -holePatternRadius * Math.sin(3*Math.PI/4)],
    [holePatternRadius * Math.cos(5*Math.PI/4), -holePatternRadius * Math.sin(5*Math.PI/4)],
    [holePatternRadius * Math.cos(7*Math.PI/4), -holePatternRadius * Math.sin(7*Math.PI/4)],
  ];

  // Virtual condition = MMC (10.00) - Geometric Tolerance (0.20) = 9.80mm
  // In 3D scale (10.00mm = 0.4 radius) -> (9.80 / 10.0) * 0.4 = 0.392 radius
  const vcRadiusVisual = 0.392;

  const animatingRef = useRef(false);

  useFrame((state, delta) => {
    if (gaugeAnimationActive && groupRef.current) {
      if (groupRef.current.position.y > -0.2) {
        groupRef.current.position.y -= delta * 2;
        animatingRef.current = true;
      } else if (animatingRef.current) {
        animatingRef.current = false;
        setTimeout(() => {
          if (groupRef.current) groupRef.current.position.y = 3;
          setGaugeAnimationActive(false);
        }, 2000);
      }
    } else if (groupRef.current && !gaugeAnimationActive) {
        groupRef.current.position.y = 3;
    }
  });

  if (!gaugeAnimationActive) return null;

  return (
    <group ref={groupRef} position={[0, 3, 0]}>
      {positions.map((pos, i) => (
        <mesh key={i} position={[pos[0], 0, pos[1]]}>
          <cylinderGeometry args={[vcRadiusVisual, vcRadiusVisual, 2, 32]} />
          <meshStandardMaterial color="#dc2626" roughness={0.2} metalness={0.8} />
        </mesh>
      ))}
      
      {/* Base of the gauge connecting the pins */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[4, 4, 0.2, 64]} />
        <meshStandardMaterial color="#ef4444" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
};

export default VirtualGaugePins;
