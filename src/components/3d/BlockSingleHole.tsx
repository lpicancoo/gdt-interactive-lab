import React from 'react';
import * as THREE from 'three';
import { useGdtStore } from '../../store/useGdtStore';
import { Text } from '@react-three/drei';

const BlockSingleHole: React.FC = () => {
  const { sliderValues, showDatums, activeConceptIndex, activeModule } = useGdtStore();

  const rawDevX = sliderValues.deviationX ?? 0.000;
  const rawDevY = sliderValues.deviationY ?? 0.000;

  // Scale offset for 3D visual clarity (0.005 in -> 0.30 units)
  const devX = rawDevX * 60;
  const devY = rawDevY * 60;

  const blockWidth = 5.0;
  const blockLength = 3.5;
  const blockHeight = 1.5;
  const holeRadius = 0.65; // Visual 3D hole radius

  // Nominal Stationary Tolerance Zone Dimensions
  // Square Linear Zone (±0.005 -> side 0.60, half 0.30)
  const squareHalfSide = 0.30;
  // Cylindrical GD&T Zone (⌀ 0.014 -> radius 0.42)
  const cylinderRadius = 0.42;

  // Real-time calculations for status badges
  const absRawX = Math.abs(rawDevX);
  const absRawY = Math.abs(rawDevY);
  const isLinearPass = absRawX <= 0.005001 && absRawY <= 0.005001;
  
  const radialDist = 2 * Math.sqrt(rawDevX * rawDevX + rawDevY * rawDevY);
  const isGdtPass = radialDist <= 0.014001;
  const isSavedByGdt = !isLinearPass && isGdtPass;

  // Concept 2 tilt when active
  const groupRotation: [number, number, number] = activeConceptIndex === 2 
    ? [0.15, 0.20, -0.1] 
    : [0, 0, 0];

  // RULE 1: Datums are strictly HIDDEN in Chapter 1 (activeModule === 0)
  // Datums are only shown if activeModule !== 0 OR in explicit Concept 2
  const shouldRenderDatums = activeModule !== 0 
    ? showDatums 
    : (activeConceptIndex === 2);

  return (
    <group position={[0, blockHeight / 2, 0]} rotation={groupRotation}>
      {/* 1. BASE METAL BLOCK MESH WITH HOLE CUTOUT */}
      <group>
        {/* Main Base Plate */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[blockWidth, blockHeight, blockLength]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.35} metalness={0.65} />
        </mesh>
      </group>

      {/* 2. ELEMENTO A: ZONAS DE TOLERÂNCIA NOMINAIS ESTACIONÁRIAS (FIXAS EM X=0, Y=0) */}
      <group position={[0, 0, 0]}>
        {/* Prisma Quadrado Linear Translúcido (Vermelho) - Zona ±0.005 (0.010 x 0.010 in) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[squareHalfSide * 2, blockHeight + 0.5, squareHalfSide * 2]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={0.30} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[squareHalfSide * 2, blockHeight + 0.51, squareHalfSide * 2]} />
          <meshBasicMaterial color="#dc2626" wireframe />
        </mesh>

        {/* Cilindro GD&T Translúcido (Verde) - Zona ⌀ 0.014 in Circunscrita */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[cylinderRadius, cylinderRadius, blockHeight + 0.55, 32]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.35} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[cylinderRadius, cylinderRadius, blockHeight + 0.56, 32]} />
          <meshBasicMaterial color="#059669" wireframe side={THREE.DoubleSide} />
        </mesh>

        {/* Indicador Teórico do Centro Nominal (True Position X=0, Y=0) */}
        <mesh position={[0, blockHeight / 2 + 0.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.02, 0.08, 32]} />
          <meshBasicMaterial color="#2563eb" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 3. ELEMENTO B: FURO REAL USINADO (DINÂMICO) E EIXO VERMELHO SÓLIDO DA FERRAMENTA */}
      <group position={[devX, 0, devY]}>
        {/* Cavidade Interna Retificada do Furo Físico Usinado Real */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[holeRadius, holeRadius, blockHeight + 0.06, 32, 1, true]} />
          <meshStandardMaterial 
            color="#475569" 
            roughness={0.2} 
            metalness={0.85} 
            side={THREE.DoubleSide} 
          />
        </mesh>

        {/* Fundo escuro do furo para dar profundidade de corte */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[holeRadius - 0.01, holeRadius - 0.01, blockHeight + 0.04, 32]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>

        {/* Eixo Central da Ferramenta de Furação (Linha Vermelha Sólida) */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, blockHeight + 1.4, 16]} />
          <meshBasicMaterial color="#dc2626" />
        </mesh>

        {/* Esfera / Marcador da Ponta da Ferramenta no topo */}
        <mesh position={[0, blockHeight / 2 + 0.7, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#dc2626" />
        </mesh>
      </group>

      {/* 4. CALLOUTS & BADGES 3D EM TEMPO REAL */}
      <group position={[devX, blockHeight / 2 + 0.8, devY]}>
        {isSavedByGdt ? (
          <group>
            <Text position={[0, 0.5, 0]} fontSize={0.20} color="#dc2626">
              ❌ Fora do Quadrado ±0.005 (Reprovado no Linear)
            </Text>
            <Text position={[0, 0.2, 0]} fontSize={0.22} color="#059669">
              🎉 Salvo pelo GD&T! (Dentro do Cilindro ⌀0.014)
            </Text>
          </group>
        ) : isLinearPass ? (
          <group>
            <Text position={[0, 0.3, 0]} fontSize={0.20} color="#059669">
              ✅ Aprovado em Ambos os Sistemas (±0.005 e ⌀0.014)
            </Text>
          </group>
        ) : (
          <group>
            <Text position={[0, 0.5, 0]} fontSize={0.20} color="#dc2626">
              ❌ Fora do Quadrado ±0.005 (Reprovado no Linear)
            </Text>
            <Text position={[0, 0.2, 0]} fontSize={0.20} color="#dc2626">
              ❌ Fora do Cilindro ⌀0.014 (Reprovado no GD&T)
            </Text>
          </group>
        )}
      </group>

      {/* 5. CONCEITO 2: DATUMS IMPLÍCITOS VS EXPLÍCITOS (Exibido apenas quando selecionado) */}
      {activeConceptIndex === 2 && (
        <group position={[0, blockHeight / 2 + 0.6, 0]}>
          <Text position={[0, 0.6, 0]} fontSize={0.22} color="#dc2626">
            ⚠️ Datums Implícitos (Sem Precedência Declarada)
          </Text>
          <Text position={[0, 0.25, 0]} fontSize={0.18} color="#1e293b">
            Medir a partir da base horizontal ou da face lateral esquerda?
          </Text>

          <group position={[-blockWidth / 2 - 0.4, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
              <meshBasicMaterial color="#f59e0b" />
            </mesh>
          </group>
          <group position={[0, -blockHeight - 0.4, 0]}>
            <mesh>
              <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
              <meshBasicMaterial color="#f59e0b" />
            </mesh>
          </group>
        </group>
      )}

      {/* 6. PLANOS E ETIQUETAS DE DATUM (Totalmente OCULTOS no Capítulo 1 por padrão) */}
      {shouldRenderDatums && (
        <group>
          {/* Datum A (Bottom Base Plane) */}
          <group position={[0, -blockHeight / 2 - 0.02, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[blockWidth * 1.2, blockLength * 1.2]} />
              <meshBasicMaterial color="#2563eb" transparent opacity={0.2} side={THREE.DoubleSide} />
            </mesh>
            <DatumLabel label="A" position={[-blockWidth / 2 - 0.6, 0, blockLength / 2 + 0.4]} />
          </group>

          {/* Datum B (Side Plane) */}
          <group position={[-blockWidth / 2 - 0.02, 0, 0]}>
            <mesh rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[blockLength * 1.1, blockHeight * 1.2]} />
              <meshBasicMaterial color="#2563eb" transparent opacity={0.25} side={THREE.DoubleSide} />
            </mesh>
            <DatumLabel label="B" position={[0, blockHeight / 2 + 0.4, -blockLength / 2 - 0.4]} />
          </group>

          {/* Datum C (Front Plane) */}
          <group position={[0, 0, blockLength / 2 + 0.02]}>
            <mesh>
              <planeGeometry args={[blockWidth * 1.1, blockHeight * 1.2]} />
              <meshBasicMaterial color="#2563eb" transparent opacity={0.25} side={THREE.DoubleSide} />
            </mesh>
            <DatumLabel label="C" position={[blockWidth / 2 + 0.4, blockHeight / 2 + 0.4, 0]} />
          </group>
        </group>
      )}
    </group>
  );
};

const DatumLabel = ({ label, position }: { label: string; position: [number, number, number] }) => (
  <group position={position}>
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.05]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
    <mesh position={[0, 0, -0.02]}>
      <boxGeometry args={[0.55, 0.55, 0.02]} />
      <meshBasicMaterial color="#1e293b" />
    </mesh>
    <Text position={[0, 0, 0.04]} fontSize={0.35} color="#1e293b">
      {label}
    </Text>
  </group>
);

export default BlockSingleHole;
