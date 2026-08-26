import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useGdtStore } from '../../store/useGdtStore';

const FlatnessBlock: React.FC = () => {
  const { warpConcave, warpTwist, showToleranceZones, formType } = useGdtStore();
  const topMeshRef = useRef<THREE.Mesh>(null);

  // Dimensions of sealing block
  const width = 5;
  const length = 3.5;
  const height = 1;
  
  // Visual scale: 0.05 mm tolerance = 0.12 units in 3D space
  const tolVal = 0.05;
  const visualScale = 2.4; // 0.05 * 2.4 = 0.12 units
  const tolZoneHeight = tolVal * visualScale; 

  const isStraightness = formType === 'retilineidade';
  // Straightness evaluates center slice (Z=0) where normZ=0 -> twistY = 0 -> measured = warpConcave!
  const measuredDev = isStraightness ? warpConcave : Math.max(warpConcave, warpTwist);
  const isFail = measuredDev > tolVal;

  // Base metallic material
  const bodyMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#cbd5e1',
    roughness: 0.4,
    metalness: 0.6,
  }), []);

  // Top surface geometry with high resolution for smooth deformation
  const topGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, length, 32, 32);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, [width, length]);

  // Update vertex heights dynamically when sliders change
  useFrame(() => {
    if (!topMeshRef.current) return;

    const pos = topGeometry.attributes.position as THREE.BufferAttribute;
    const array = pos.array as Float32Array;

    const halfW = width / 2;
    const halfL = length / 2;

    for (let i = 0; i < array.length; i += 3) {
      const x = array[i];
      const z = array[i + 2];

      const normX = x / halfW; // -1 to 1
      const normZ = z / halfL; // -1 to 1

      // Parabolic concave/convex deformation
      const concaveY = warpConcave * visualScale * (1 - normX * normX);

      // Saddle twist deformation along diagonals
      const twistY = warpTwist * visualScale * normX * normZ;

      // Base top height is 0 (positioned at Y=height)
      array[i + 1] = concaveY + twistY;
    }

    pos.needsUpdate = true;
    topGeometry.computeVertexNormals();
  });

  const zoneDepth = isStraightness ? 0.35 : length + 0.4;

  return (
    <group position={[0, 0, 0]}>
      {/* Base Solid Block */}
      <mesh position={[0, height / 2, 0]} material={bodyMaterial} castShadow receiveShadow>
        <boxGeometry args={[width, height, length]} />
      </mesh>

      {/* Deformable Top Surface */}
      <mesh 
        ref={topMeshRef} 
        geometry={topGeometry} 
        position={[0, height + 0.001, 0]}
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial 
          color={isFail ? '#f87171' : '#60a5fa'} 
          roughness={0.2} 
          metalness={0.5}
          side={THREE.DoubleSide} 
        />
      </mesh>

      {/* Wireframe overlay on top surface */}
      <mesh geometry={topGeometry} position={[0, height + 0.002, 0]}>
        <meshBasicMaterial 
          color={isFail ? '#dc2626' : '#2563eb'} 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </mesh>

      {/* 3D Tolerance Zone: Planes (Planeza) or Narrow Slice Ribbon (Retilineidade) */}
      {showToleranceZones && (
        <group position={[0, height + tolZoneHeight / 2, 0]}>
          {/* Upper Tolerance Boundary Plane/Ribbon */}
          <mesh position={[0, tolZoneHeight / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[width + 0.4, zoneDepth]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.45} side={THREE.DoubleSide} />
          </mesh>

          {/* Lower Tolerance Boundary Plane/Ribbon */}
          <mesh position={[0, -tolZoneHeight / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[width + 0.4, zoneDepth]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.45} side={THREE.DoubleSide} />
          </mesh>

          {/* Connective Translucent Zone Volume */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[width + 0.4, tolZoneHeight, zoneDepth]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.15} depthWrite={false} />
          </mesh>

          {/* HTML Label */}
          <Html position={[width / 2 + 0.3, 0, 0]} center>
            <div className={`px-2.5 py-1 rounded shadow-md text-xs font-bold whitespace-nowrap border ${
              isFail ? 'bg-rose-600 text-white border-rose-700' : 'bg-emerald-600 text-white border-emerald-700'
            }`}>
              {isStraightness ? 'Zona de Retilineidade 2D (0.05 mm)' : 'Zona de Planeza 3D (0.05 mm)'}
            </div>
          </Html>
        </group>
      )}

      {/* Indicator when deform exceeds tolerance */}
      {isFail && (
        <Html position={[0, height + tolZoneHeight + 0.6, 0]} center>
          <div className="bg-rose-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg animate-bounce border border-rose-300 flex items-center gap-1">
            ⚠️ Empenamento Excede 0.05 mm!
          </div>
        </Html>
      )}
    </group>
  );
};

export default FlatnessBlock;
