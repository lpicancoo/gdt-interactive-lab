import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGdtStore } from '../../store/useGdtStore';

const SteppedShaftBlock: React.FC = () => {
  const { 
    eccentricity,
    circularityError,
    showToleranceZones,
    showDatums
  } = useGdtStore();

  const shaftGroupRef = useRef<THREE.Group>(null);
  const midMeshRef = useRef<THREE.Mesh>(null);
  const probeGroupRef = useRef<THREE.Group>(null);

  const visualScale = 8.0;

  // Dimensions along X axis
  const journalRadius = 0.8;
  const journalLength = 2.0;

  const midRadius = 1.6;
  const midLength = 3.2;

  // Geometry for middle cylinder with high segment count for ovalization
  const baseMidGeometry = useMemo(() => {
    // CylinderGeometry along Y axis by default, we will rotate it to orient along X axis
    return new THREE.CylinderGeometry(midRadius, midRadius, midLength, 64, 16);
  }, [midRadius, midLength]);

  const deformedMidGeometry = useMemo(() => {
    return baseMidGeometry.clone();
  }, [baseMidGeometry]);

  const currentRotationRef = useRef<number>(0);

  useFrame((_, delta) => {
    // Rotate shaft continuously around X axis
    currentRotationRef.current += delta * 1.5;
    if (shaftGroupRef.current) {
      shaftGroupRef.current.rotation.x = currentRotationRef.current;
    }

    // Apply vertex deformation for ovalization on middle cylinder
    if (midMeshRef.current) {
      const posAttr = deformedMidGeometry.attributes.position;
      const baseAttr = baseMidGeometry.attributes.position;

      for (let i = 0; i < posAttr.count; i++) {
        const x = baseAttr.getX(i);
        const y = baseAttr.getY(i);
        const z = baseAttr.getZ(i);

        const angle = Math.atan2(z, x);
        const radius = Math.sqrt(x * x + z * z);

        // Ovalization modulation cos(2 * angle)
        const ovalDelta = (circularityError * visualScale) * Math.cos(2 * angle);
        const newRadius = radius + ovalDelta;

        posAttr.setX(i, Math.cos(angle) * newRadius);
        posAttr.setZ(i, Math.sin(angle) * newRadius);
        posAttr.setY(i, y);
      }

      posAttr.needsUpdate = true;
      deformedMidGeometry.computeVertexNormals();
    }

    // Dynamic Probe (Relógio Comparador) tracking the oscillating top surface
    if (probeGroupRef.current) {
      const rot = currentRotationRef.current;
      // Instantaneous displacement due to eccentricity and ovalization at top contact point
      const eccShift = (eccentricity * visualScale) * Math.sin(rot);
      const ovalShift = (circularityError * visualScale) * Math.cos(2 * rot);
      
      const currentSurfaceY = midRadius + eccShift + ovalShift;
      probeGroupRef.current.position.y = currentSurfaceY;
    }
  });

  const measuredDeviation = (eccentricity * 2) + circularityError;
  const isPass = measuredDeviation <= 0.050;

  const innerRadiusZone = midRadius - (0.05 * visualScale / 2);
  const outerRadiusZone = midRadius + (0.05 * visualScale / 2);

  return (
    <group position={[0, 0, 0]}>
      {/* Dashed Line for Datum Axis A-B along X Axis */}
      {showDatums && (
        <group>
          {/* Axis line */}
          <line>
            <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(-5.5, 0, 0),
              new THREE.Vector3(5.5, 0, 0)
            ])} />
            <lineDashedMaterial attach="material" color="#2563eb" dashSize={0.3} gapSize={0.15} linewidth={2} />
          </line>
          
          {/* Datum A Label Box (Left Journal) */}
          <mesh position={[-3.8, -1.5, 0]}>
            <boxGeometry args={[0.7, 0.7, 0.7]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>

          {/* Datum B Label Box (Right Journal) */}
          <mesh position={[3.8, -1.5, 0]}>
            <boxGeometry args={[0.7, 0.7, 0.7]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
        </group>
      )}

      {/* Rotating Stepped Shaft Group */}
      <group ref={shaftGroupRef}>
        {/* Left Journal (Datum A Cylinder) */}
        <mesh position={[-2.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[journalRadius, journalRadius, journalLength, 32]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Right Journal (Datum B Cylinder) */}
        <mesh position={[2.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[journalRadius, journalRadius, journalLength, 32]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Middle Central Cylinder (with Eccentricity Offset & Ovalization) */}
        <mesh 
          ref={midMeshRef} 
          geometry={deformedMidGeometry}
          position={[0, eccentricity * visualScale, 0]} 
          rotation={[0, 0, Math.PI / 2]} 
          castShadow 
          receiveShadow
        >
          <meshStandardMaterial 
            color={isPass ? "#94a3b8" : "#f87171"} 
            metalness={0.75} 
            roughness={0.25} 
            envMapIntensity={1.2}
          />
        </mesh>
      </group>

      {/* Static Concentric Green Tolerance Ring / Cylindrical Envelope Zone */}
      {showToleranceZones && (
        <group position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[outerRadiusZone, outerRadiusZone, midLength + 0.2, 32, 1, true]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.35} side={THREE.DoubleSide} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[innerRadiusZone, innerRadiusZone, midLength + 0.2, 32, 1, true]} />
            <meshBasicMaterial color="#34d399" transparent opacity={0.3} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* Dial Indicator (Relógio Comparador) at X=0 touching surface */}
      <group ref={probeGroupRef} position={[0, midRadius, 0]}>
        {/* Contact Sphere */}
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Indicator Stem / Rod */}
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 1.9, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Dial Gauge Body */}
        <mesh position={[0, 2.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.3, 32]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        
        {/* Dial Face */}
        <mesh position={[0, 2.4, 0.16]}>
          <circleGeometry args={[0.48, 32]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
};

export default SteppedShaftBlock;
