import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGdtStore } from '../../store/useGdtStore';

const PerpendicularBlock: React.FC = () => {
  const { 
    angularError,
    warpForm,
    showToleranceZones,
    showDatums
  } = useGdtStore();

  const legMeshRef = useRef<THREE.Mesh>(null);

  // L-Bracket dimensions
  const baseWidth = 4.0;
  const baseHeight = 0.8;
  const baseDepth = 3.2;

  const legHeight = 3.6;
  const legThickness = 0.8;

  const visualScale = 8.0; // Visual scale for deformation

  // High density geometry for vertical leg deformation
  const baseLegGeometry = useMemo(() => {
    return new THREE.BoxGeometry(baseWidth, legHeight, legThickness, 32, 32, 16);
  }, [baseWidth, legHeight, legThickness]);

  const deformedLegGeometry = useMemo(() => {
    return baseLegGeometry.clone();
  }, [baseLegGeometry]);

  useFrame(() => {
    if (!legMeshRef.current) return;

    const positionAttr = deformedLegGeometry.attributes.position;
    const baseAttr = baseLegGeometry.attributes.position;

    const halfH = legHeight / 2;
    const halfW = baseWidth / 2;

    for (let i = 0; i < positionAttr.count; i++) {
      const origX = baseAttr.getX(i);
      const origY = baseAttr.getY(i);
      const origZ = baseAttr.getZ(i);

      // Height ratio normalized from 0 at bottom of leg to 1 at top of leg
      const heightRatio = (origY + halfH) / legHeight;

      // Angular tilt along Z: tilt increases proportionally with height from Datum A
      const tiltDeltaZ = (angularError * visualScale) * heightRatio;

      // Front face curvature (warpForm) along X
      const normX = origX / halfW;
      const warpDeltaZ = (origZ > 0) ? (warpForm * visualScale) * (1 - normX * normX) : 0;

      positionAttr.setZ(i, origZ + tiltDeltaZ + warpDeltaZ);
      positionAttr.setY(i, origY);
      positionAttr.setX(i, origX);
    }

    positionAttr.needsUpdate = true;
    deformedLegGeometry.computeVertexNormals();
  });

  const measuredDeviation = Math.abs(angularError) + warpForm;
  const isPass = measuredDeviation <= 0.050;

  const tolZoneOffset = 0.05 * visualScale * 0.5;

  return (
    <group position={[0, baseHeight / 2, 0]}>
      {/* Base Horizontal Plate of L-Bracket */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[baseWidth, baseHeight, baseDepth]} />
        <meshStandardMaterial 
          color={isPass ? "#94a3b8" : "#f87171"} 
          metalness={0.75} 
          roughness={0.25} 
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Deformed Vertical Leg of L-Bracket */}
      <mesh 
        ref={legMeshRef} 
        geometry={deformedLegGeometry} 
        position={[0, baseHeight / 2 + legHeight / 2, -baseDepth / 2 + legThickness / 2]} 
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

      {/* Datum A Primary Reference Plane (Bottom Surface Simulator - Mesa de Desempeno) */}
      {showDatums && (
        <group position={[0, -baseHeight / 2 - 0.04, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[baseWidth + 1.6, baseDepth + 1.6]} />
            <meshStandardMaterial 
              color="#3b82f6" 
              transparent 
              opacity={0.35} 
              side={THREE.DoubleSide} 
              depthWrite={false}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[baseWidth + 1.6, baseDepth + 1.6]} />
            <meshBasicMaterial color="#2563eb" wireframe transparent opacity={0.6} />
          </mesh>
        </group>
      )}

      {/* Vertical Perpendicular Tolerance Zone (2 Vertical Green Planes Flanking the Vertical Leg) */}
      {showToleranceZones && (
        <group position={[0, baseHeight / 2 + legHeight / 2, -baseDepth / 2 + legThickness / 2]}>
          {/* Front Vertical Zone Plane */}
          <mesh position={[0, 0, legThickness / 2 + tolZoneOffset]}>
            <planeGeometry args={[baseWidth + 0.6, legHeight + 0.6]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.35} side={THREE.DoubleSide} />
          </mesh>

          {/* Back Vertical Zone Plane */}
          <mesh position={[0, 0, -legThickness / 2 - tolZoneOffset]}>
            <planeGeometry args={[baseWidth + 0.6, legHeight + 0.6]} />
            <meshBasicMaterial color="#34d399" transparent opacity={0.3} side={THREE.DoubleSide} />
          </mesh>

          {/* Connecting Translucent Envelope Box */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[baseWidth + 0.6, legHeight + 0.6, legThickness + tolZoneOffset * 2]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.12} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}
    </group>
  );
};

export default PerpendicularBlock;
