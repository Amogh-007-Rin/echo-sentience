import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface AIGlobeProps {
  isListening: boolean;
  isSpeaking: boolean;
  emotionalState: 'neutral' | 'happy' | 'sad' | 'anxious' | 'calm';
}

function GlobeCore({ isListening, isSpeaking, emotionalState }: AIGlobeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Create particle system for ambient effects
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  // Professional color scheme - subtle variations of cyan/blue
  const getEmotionColor = () => {
    switch (emotionalState) {
      case 'happy': return '#00d4ff'; // Bright cyan
      case 'sad': return '#0099cc'; // Muted blue
      case 'anxious': return '#ff8c42'; // Professional orange
      case 'calm': return '#4a9eff'; // Soft blue
      default: return '#00bfff'; // Professional cyan
    }
  };

  useFrame((state) => {
    if (meshRef.current) {
      // Base rotation
      meshRef.current.rotation.y += 0.01;
      
      // Pulsing effect when speaking
      if (isSpeaking) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.1;
        meshRef.current.scale.setScalar(scale);
      } else if (isListening) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.05;
        meshRef.current.scale.setScalar(scale);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += 0.005;
      outerRingRef.current.rotation.x += 0.002;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Main Sphere - Dark core like the reference */}
      <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.2, 64, 64]} />
          <meshStandardMaterial
            color="#0a0a0a"
            transparent
            opacity={0.9}
            emissive="#001122"
            emissiveIntensity={0.1}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>

        {/* Energy Rings - Multiple rotating rings */}
        <mesh ref={outerRingRef}>
          <torusGeometry args={[1.4, 0.02, 8, 64]} />
          <meshStandardMaterial
            color={getEmotionColor()}
            transparent
            opacity={0.9}
            emissive={getEmotionColor()}
            emissiveIntensity={1.2}
          />
        </mesh>

        {/* Second Energy Ring */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.3, 0.015, 8, 64]} />
          <meshStandardMaterial
            color={getEmotionColor()}
            transparent
            opacity={0.7}
            emissive={getEmotionColor()}
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Third Energy Ring */}
        <mesh rotation={[0, Math.PI / 2, Math.PI / 4]}>
          <torusGeometry args={[1.35, 0.01, 8, 64]} />
          <meshStandardMaterial
            color={getEmotionColor()}
            transparent
            opacity={0.5}
            emissive={getEmotionColor()}
            emissiveIntensity={0.6}
          />
        </mesh>
      </Float>

      {/* Subtle Particle Field */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={getEmotionColor()}
          size={0.01}
          transparent
          opacity={0.3}
        />
      </points>

      {/* Professional Lighting Setup */}
      <pointLight
        position={[3, 3, 3]}
        intensity={isSpeaking ? 3 : isListening ? 2 : 1.5}
        color={getEmotionColor()}
        decay={2}
      />
      <pointLight
        position={[-2, -2, -2]}
        intensity={0.8}
        color="#ffffff"
        decay={2}
      />
      <spotLight
        position={[0, 5, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={0.5}
        color={getEmotionColor()}
        target-position={[0, 0, 0]}
      />
    </group>
  );
}

export default function AIGlobe({ isListening, isSpeaking, emotionalState }: AIGlobeProps) {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <GlobeCore
          isListening={isListening}
          isSpeaking={isSpeaking}
          emotionalState={emotionalState}
        />
      </Canvas>
      
      {/* Status Indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass rounded-full px-4 py-2 text-center">
          <div className="flex items-center gap-2">
            <motion.div
              className={`w-2 h-2 rounded-full ${
                isSpeaking ? 'bg-primary' : isListening ? 'bg-accent-blue' : 'bg-subtle-blue'
              }`}
              animate={{
                scale: isSpeaking || isListening ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 1,
                repeat: isSpeaking || isListening ? Infinity : 0,
              }}
            />
            <span className="text-sm font-mono glow-text-primary">
              {isSpeaking ? 'Speaking' : isListening ? 'Listening' : 'Ready'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}