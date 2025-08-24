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

  // Color based on emotional state
  const getEmotionColor = () => {
    switch (emotionalState) {
      case 'happy': return '#00ffff'; // Cyan
      case 'sad': return '#6366ff'; // Blue
      case 'anxious': return '#ff6b6b'; // Red
      case 'calm': return '#9d4edd'; // Purple
      default: return '#00d4ff'; // Default blue
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
      {/* Ambient Particles */}
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
          size={0.02}
          transparent
          opacity={0.6}
        />
      </points>

      {/* Main Globe */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            color={getEmotionColor()}
            transparent
            opacity={0.8}
            emissive={getEmotionColor()}
            emissiveIntensity={0.2}
            wireframe={false}
          />
        </mesh>
        
        {/* Inner Core */}
        <mesh>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial
            color={getEmotionColor()}
            transparent
            opacity={0.3}
            emissive={getEmotionColor()}
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Outer Ring */}
        <mesh ref={outerRingRef}>
          <torusGeometry args={[1.5, 0.05, 16, 100]} />
          <meshStandardMaterial
            color={getEmotionColor()}
            transparent
            opacity={0.7}
            emissive={getEmotionColor()}
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      {/* Dynamic Lighting */}
      <pointLight
        position={[2, 2, 2]}
        intensity={isSpeaking ? 2 : isListening ? 1.5 : 1}
        color={getEmotionColor()}
      />
      <pointLight
        position={[-2, -2, -2]}
        intensity={0.5}
        color={getEmotionColor()}
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
                isSpeaking ? 'bg-neon-cyan' : isListening ? 'bg-neon-purple' : 'bg-neon-blue'
              }`}
              animate={{
                scale: isSpeaking || isListening ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 1,
                repeat: isSpeaking || isListening ? Infinity : 0,
              }}
            />
            <span className="text-sm font-orbitron glow-text-cyan">
              {isSpeaking ? 'Speaking' : isListening ? 'Listening' : 'Ready'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}