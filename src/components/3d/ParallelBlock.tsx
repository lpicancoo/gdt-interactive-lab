import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGdtStore } from '../../store/useGdtStore';

const ParallelBlock: React.FC = () => {
  const { 
    tiltZ,
    warpForm,
    showToleranceZones,
    showDatums
  } = useGdtStore();

  const meshRef = useRef<THREE.Mesh>(null);

  const blockWidth = 4.0;  // X axis width
  const blockHeight = 1.2; // Y axis height
  const blockDepth = 2.4;  // Z axis depth
  const visualScale = 8.0; // Visual scale multiplier for error representation

  // Create base box geometry with high segment density for vertex deformation
  const baseGeometry = useMemo(() => {
    return new THREE.BoxGeometry(blockWidth, blockHeight, blockDepth, 32, 16, 32);
  }, [blockWidth, blockHeight, blockDepth]);

  const deformedGeometry = useMemo(() => {
    return baseGeometry.clone();
  }, [baseGeometry]);

  useFrame(() => {
    if (!meshRef.current) return;

    const positionAttr = deformedGeometry.attributes.position;
    const baseAttr = baseGeometry.attributes.position;

    const halfH = blockHeight / 2;
    const halfD = blockDepth / 2;
    const halfW = blockWidth / 2;

    for (let i = 0; i < positionAttr.count; i++) {
      const origX = baseAttr.getX(i);
      const origY = baseAttr.getY(i);
      const origZ = baseAttr.getZ(i);

      // Only deform the TOP face vertices (Y > halfH - 0.05)
      if (origY > halfH - 0.05) {
        // Tilt along Z axis (normalized z from -1 to 1)
        const normZ = origZ / halfD;
        const tiltDelta = (tiltZ * visualScale) * normZ;

        // Curvature / Form Warp along X axis (parabolic concave/convex)
        const normX = origX / halfW;
        const warpDelta = (warpForm * visualScale) * (1 - normX * normX);

        positionAttr.setY(i, origY + tiltDelta + warpDelta);
      } else {
        positionAttr.setY(i, origY);
      }

      positionAttr.setX(i, origX);
      positionAttr.setZ(i, origZ);
    }

    positionAttr.needsUpdate = true;
    deformedGeometry.computeVertexNormals();
  });

  const measuredDeviation = tiltZ + warpForm;
  const isPass = measuredDeviation <= 0.050;

  const tolPlaneOffset = 0.05 * visualScale * 0.5;

  return (
    <group position={[0, blockHeight / 2 + 0.1, 0]}>
      {/* Metallic Rectangular Guide Block Mesh */}
      <mesh ref={meshRef} geometry={deformedGeometry} castShadow receiveShadow>
        <meshStandardMaterial 
          color={isPass ? "#94a3b8" : "#f87171"} 
          metalness={0.75} 
          roughness={0.25} 
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Datum A Primary Reference Plane (Bottom Surface Simulator - Mesa de Desempeno) */}
      {showDatums && (
        <group position={[0, -blockHeight / 2 - 0.04, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[blockWidth + 1.6, blockDepth + 1.6]} />
            <meshStandardMaterial 
              color="#3b82f6" 
              transparent 
              opacity={0.35} 
              side={THREE.DoubleSide} 
              depthWrite={false}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[blockWidth + 1.6, blockDepth + 1.6]} />
            <meshBasicMaterial color="#2563eb" wireframe transparent opacity={0.6} />
          </mesh>
        </group>
      )}

      {/* Parallel Tolerance Zone (2 Horizontal Green Planes Floating Over Top Face) */}
      {showToleranceZones && (
        <group position={[0, blockHeight / 2, 0]}>
          {/* Upper Parallel Zone Plane */}
          <mesh position={[0, tolPlaneOffset, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[blockWidth + 0.6, blockDepth + 0.6]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.35} side={THREE.DoubleSide} />
          </mesh>

          {/* Lower Parallel Zone Plane */}
          <mesh position={[0, -tolPlaneOffset, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[blockWidth + 0.6, blockDepth + 0.6]} />
            <meshBasicMaterial color="#34d399" transparent opacity={0.3} side={THREE.DoubleSide} />
          </mesh>

          {/* Connecting Translucent Envelope Box */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[blockWidth + 0.6, tolPlaneOffset * 2, blockDepth + 0.6]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.12} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}
    </group>
  );
};

export default ParallelBlock;
