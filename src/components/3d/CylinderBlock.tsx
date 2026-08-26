import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGdtStore } from '../../store/useGdtStore';

const CylinderBlock: React.FC = () => {
  const { 
    cylinderFormType,
    errorOvality,
    errorTaper,
    showToleranceZones
  } = useGdtStore();

  const meshRef = useRef<THREE.Mesh>(null);
  const isStraightness2D = cylinderFormType === 'circularidade';

  const baseRadius = 1.2;
  const height = 3.6;
  const visualScale = 4.0; // Scale 0.05mm error visually

  // Create cylinder base geometry
  const baseGeometry = useMemo(() => {
    return new THREE.CylinderGeometry(baseRadius, baseRadius, height, 64, 32, false);
  }, [baseRadius, height]);

  // Clone geometry for dynamic vertex manipulation
  const deformedGeometry = useMemo(() => {
    return baseGeometry.clone();
  }, [baseGeometry]);

  useFrame(() => {
    if (!meshRef.current) return;

    const positionAttr = deformedGeometry.attributes.position;
    const baseAttr = baseGeometry.attributes.position;

    for (let i = 0; i < positionAttr.count; i++) {
      const origX = baseAttr.getX(i);
      const origY = baseAttr.getY(i);
      const origZ = baseAttr.getZ(i);

      // Radial angle in X-Z plane
      const angle = Math.atan2(origZ, origX);
      const origR = Math.sqrt(origX * origX + origZ * origZ);

      if (origR > 0.01) { // Apply deformation to side surface
        // Ovality (ellipse deformation: +2theta modulation)
        const ovalityDelta = errorOvality * visualScale * Math.cos(2 * angle);
        
        // Taper (cone deformation along Y axis)
        const normY = origY / (height / 2); // -1 at bottom to +1 at top
        const taperDelta = errorTaper * visualScale * normY;

        const deformedR = origR + ovalityDelta + taperDelta;

        positionAttr.setX(i, deformedR * Math.cos(angle));
        positionAttr.setY(i, origY);
        positionAttr.setZ(i, deformedR * Math.sin(angle));
      }
    }

    positionAttr.needsUpdate = true;
    deformedGeometry.computeVertexNormals();
  });

  // Calculate pass/fail status
  const measuredDeviation = isStraightness2D 
    ? errorOvality 
    : Math.max(errorOvality, errorTaper);
  const isPass = measuredDeviation <= 0.050;

  const tolOffset = 0.05 * visualScale * 0.5;

  return (
    <group position={[0, height / 2 + 0.2, 0]}>
      {/* Metallic Shaft Mesh */}
      <mesh ref={meshRef} geometry={deformedGeometry} castShadow receiveShadow>
        <meshStandardMaterial 
          color={isPass ? "#94a3b8" : "#f87171"} 
          metalness={0.7} 
          roughness={0.25} 
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Chamfered Ends Accent Rings */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[baseRadius * 0.98, baseRadius, 0.05, 64]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -height / 2, 0]}>
        <cylinderGeometry args={[baseRadius, baseRadius * 0.98, 0.05, 64]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Tolerance Zones */}
      {showToleranceZones && (
        <>
          {isStraightness2D ? (
            /* Circularity (2D): Concentric green ring slice around center cross section */
            <group position={[0, 0, 0]}>
              {/* Outer Ring */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[baseRadius + tolOffset - 0.015, baseRadius + tolOffset, 64]} />
                <meshBasicMaterial color="#10b981" side={THREE.DoubleSide} transparent opacity={0.8} />
              </mesh>
              {/* Inner Ring */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[baseRadius - tolOffset, baseRadius - tolOffset + 0.015, 64]} />
                <meshBasicMaterial color="#10b981" side={THREE.DoubleSide} transparent opacity={0.8} />
              </mesh>
              {/* Thin translucent disc envelope */}
              <mesh>
                <cylinderGeometry args={[baseRadius + tolOffset, baseRadius + tolOffset, 0.08, 64, 1, true]} />
                <meshBasicMaterial color="#34d399" transparent opacity={0.25} side={THREE.DoubleSide} />
              </mesh>
            </group>
          ) : (
            /* Cylindricity (3D): Two concentric translucent green cylinders enclosing full piece */
            <group>
              {/* Outer Cylinder Zone */}
              <mesh>
                <cylinderGeometry args={[baseRadius + tolOffset, baseRadius + tolOffset, height, 64, 1, true]} />
                <meshBasicMaterial color="#10b981" transparent opacity={0.3} side={THREE.DoubleSide} />
              </mesh>
              {/* Inner Cylinder Zone */}
              <mesh>
                <cylinderGeometry args={[baseRadius - tolOffset, baseRadius - tolOffset, height, 64, 1, true]} />
                <meshBasicMaterial color="#34d399" transparent opacity={0.25} side={THREE.DoubleSide} />
              </mesh>
            </group>
          )}
        </>
      )}
    </group>
  );
};

export default CylinderBlock;
