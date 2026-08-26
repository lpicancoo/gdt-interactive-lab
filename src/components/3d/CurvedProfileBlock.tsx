import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGdtStore } from '../../store/useGdtStore';

const CurvedProfileBlock: React.FC = () => {
  const { 
    peakDeviation, 
    valleySink,
    showToleranceZones, 
    showDatums 
  } = useGdtStore();

  const visualScale = 12.0;

  const width = 5.0;
  const depth = 3.2;
  const segX = 40;
  const segZ = 24;

  const meshRef = useRef<THREE.Mesh>(null);

  // Base nominal geometry for curved top surface
  const baseGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(width, depth, segX, segZ);
    geom.rotateX(-Math.PI / 2); // Orient horizontally along XZ plane

    const posAttr = geom.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);

      // Smooth Bezier/Spline-like aerodynamic curve
      const normX = (x / width) * Math.PI; // -PI/2 to PI/2
      const nominalY = Math.cos(normX) * 0.8 + Math.sin(z * 1.2) * 0.15 + 1.2;
      posAttr.setY(i, nominalY);
    }
    geom.computeVertexNormals();
    return geom;
  }, [width, depth, segX, segZ]);

  // Shell envelopes for tolerance zones (Upper +0.10mm, Lower -0.10mm)
  const upperZoneGeometry = useMemo(() => {
    const geom = baseGeometry.clone();
    const posAttr = geom.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      posAttr.setY(i, posAttr.getY(i) + (0.10 * visualScale));
    }
    return geom;
  }, [baseGeometry, visualScale]);

  const lowerZoneGeometry = useMemo(() => {
    const geom = baseGeometry.clone();
    const posAttr = geom.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      posAttr.setY(i, posAttr.getY(i) - (0.10 * visualScale));
    }
    return geom;
  }, [baseGeometry, visualScale]);

  // Dynamic deformed geometry with vertex colors for Heatmap
  const deformedGeometry = useMemo(() => {
    const geom = baseGeometry.clone();
    // Add vertex colors attribute
    const count = geom.attributes.position.count;
    const colors = new Float32Array(count * 3);
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geom;
  }, [baseGeometry]);

  useFrame(() => {
    if (!meshRef.current) return;

    const posAttr = deformedGeometry.attributes.position;
    const basePos = baseGeometry.attributes.position;
    const colorAttr = deformedGeometry.attributes.color;

    const green = new THREE.Color('#22c55e');
    const red = new THREE.Color('#ef4444');
    const darkBlue = new THREE.Color('#1e3a8a');

    const tolLimit = 0.10; // ±0.10 mm bilateral

    for (let i = 0; i < posAttr.count; i++) {
      const x = basePos.getX(i);
      const z = basePos.getZ(i);
      const nominalY = basePos.getY(i);

      // Spatial modulation for peak and valley deformations
      const peakFactor = Math.max(0, Math.sin(x * 1.5 + 0.5) * Math.cos(z * 2.0));
      const valleyFactor = Math.max(0, Math.cos(x * 1.2) * Math.sin(z * 1.5 + 1.0));

      const realDevMM = (peakDeviation * peakFactor) - (valleySink * valleyFactor);
      const actualY = nominalY + (realDevMM * visualScale);

      posAttr.setY(i, actualY);

      // Vertex Heatmap Logic
      let vertexColor = green.clone();
      if (realDevMM > tolLimit) {
        // Exceeding upper shell -> Red gradient
        const factor = Math.min(1.0, (realDevMM - tolLimit) / 0.15);
        vertexColor.lerp(red, factor);
      } else if (realDevMM < -tolLimit) {
        // Sinking below lower shell -> Dark Blue gradient
        const factor = Math.min(1.0, (-realDevMM - tolLimit) / 0.15);
        vertexColor.lerp(darkBlue, factor);
      } else {
        // Inside green zone
        vertexColor = green;
      }

      colorAttr.setXYZ(i, vertexColor.r, vertexColor.g, vertexColor.b);
    }

    posAttr.needsUpdate = true;
    colorAttr.needsUpdate = true;
    deformedGeometry.computeVertexNormals();
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Datum A Simulator (Bottom Base Plane) */}
      {showDatums && (
        <group>
          {/* Datum A Bottom Plane */}
          <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[width + 1.2, depth + 1.2]} />
            <meshBasicMaterial color="#2563eb" transparent opacity={0.3} side={THREE.DoubleSide} />
          </mesh>

          {/* Datum A Label */}
          <mesh position={[-width / 2 - 0.8, 0.3, depth / 2 + 0.4]}>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>

          {/* Datum B Side Plane (Back side) */}
          <mesh position={[0, 0.8, -depth / 2 - 0.02]} rotation={[0, 0, 0]}>
            <planeGeometry args={[width + 0.8, 1.8]} />
            <meshBasicMaterial color="#0284c7" transparent opacity={0.25} side={THREE.DoubleSide} />
          </mesh>

          {/* Datum B Label */}
          <mesh position={[width / 2 + 0.8, 0.8, -depth / 2 - 0.4]}>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
        </group>
      )}

      {/* Solid Metal Base Body */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.8, depth]} />
        <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Sculpted Aerodynamic Top Surface with Heatmap Material */}
      <mesh 
        ref={meshRef} 
        geometry={deformedGeometry} 
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial 
          vertexColors 
          metalness={0.4} 
          roughness={0.4} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Upper & Lower Translucent Green Tolerance Envelope Shells */}
      {showToleranceZones && (
        <group>
          {/* Upper Envelope (+0.10mm) */}
          <mesh geometry={upperZoneGeometry}>
            <meshBasicMaterial color="#10b981" transparent opacity={0.4} side={THREE.DoubleSide} wireframe={false} />
          </mesh>

          {/* Lower Envelope (-0.10mm) */}
          <mesh geometry={lowerZoneGeometry}>
            <meshBasicMaterial color="#34d399" transparent opacity={0.35} side={THREE.DoubleSide} wireframe={false} />
          </mesh>
        </group>
      )}
    </group>
  );
};

export default CurvedProfileBlock;
