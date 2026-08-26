import React from 'react';
import { useGdtStore } from '../../store/useGdtStore';

const ToleranceZones: React.FC = () => {
  const { holeDiameter, deviationX, deviationY, showRealAxis, highlightToleranceZones } = useGdtStore();
  
  // Math
  const MMC = 10.00;
  const tolPositionMMC = 0.20;
  const bonus = Math.max(0, holeDiameter - MMC);
  const totalTol = tolPositionMMC + bonus;
  
  // Scale for 3D visualization (multiplier to make it visible)
  const scaleVisual = 2.0; 
  const radiusVisual = (totalTol / 2) * scaleVisual;

  const holePatternRadius = 2.75;
  const flangeThickness = 0.5;

  const positions = [
    [holePatternRadius * Math.cos(Math.PI/4), -holePatternRadius * Math.sin(Math.PI/4)], 
    [holePatternRadius * Math.cos(3*Math.PI/4), -holePatternRadius * Math.sin(3*Math.PI/4)],
    [holePatternRadius * Math.cos(5*Math.PI/4), -holePatternRadius * Math.sin(5*Math.PI/4)],
    [holePatternRadius * Math.cos(7*Math.PI/4), -holePatternRadius * Math.sin(7*Math.PI/4)],
  ];

  const devXVisual = deviationX * scaleVisual;
  const devYVisual = deviationY * scaleVisual; // Note: mapped to Z axis in 3D
  
  const measuredDeviation = 2 * Math.sqrt(deviationX ** 2 + deviationY ** 2);
  const isPass = measuredDeviation <= totalTol;

  return (
    <group>
      {positions.map((pos, i) => (
        <group key={i} position={[pos[0], flangeThickness, pos[1]]}>
          {/* True Position Axis (Theoretical) */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 2]} />
            <meshBasicMaterial color="#000000" />
          </mesh>

          {/* Tolerance Zone Cylinder */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[radiusVisual, radiusVisual, 1.5, 32]} />
            <meshBasicMaterial 
              color={highlightToleranceZones ? "#059669" : "#10b981"} // darker emerald when highlighted
              transparent 
              opacity={highlightToleranceZones ? 0.7 : 0.3} 
              depthWrite={false}
            />
          </mesh>

          {/* Real Axis (Deviated) - Only for the first hole for this exercise */}
          {i === 0 && showRealAxis && (
            <group position={[devXVisual, 0, devYVisual]}>
              <mesh>
                <cylinderGeometry args={[0.02, 0.02, 2.5]} />
                <meshBasicMaterial color={isPass ? "#10b981" : "#e11d48"} /> 
              </mesh>
            </group>
          )}
        </group>
      ))}
    </group>
  );
};

export default ToleranceZones;
