import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { inSphere } from "maath/random";

interface StarFieldProps {
  count?: number;
  radius?: number;
  speed?: number;
}

const StarField = ({
  count = 5000,
  radius = 1.5,
  speed = 0.15,
}: StarFieldProps) => {
  const ref = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    inSphere(positions, radius);
    return positions;
  }, [count, radius]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.05 * speed;
      ref.current.rotation.y -= delta * 0.075 * speed;
    }
  });

  return (
    <Points
      ref={ref}
      positions={particlesPosition}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#38BDF8"
        size={0.01}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const FloatingGrid = () => {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.position.z = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
      gridRef.current.material.opacity = THREE.MathUtils.lerp(
        gridRef.current.material.opacity,
        0.1 + Math.sin(clock.getElapsedTime() * 0.4) * 0.05,
        0.1
      );
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[30, 50, "#38BDF8", "#1E293B"]}
      position={[0, -3, 0]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <primitive
        object={new THREE.GridHelper(30, 50, "#38BDF8", "#1E293B").material}
        attach="material"
        transparent
        opacity={0.1}
      />
    </gridHelper>
  );
};

const BackgroundScene = () => {
  return (
    <>
      <color attach="background" args={["#0F172A"]} />
      <fog attach="fog" args={["#0F172A", 5, 20]} />
      <ambientLight intensity={0.1} />

      <StarField />
      <FloatingGrid />

      {/* Add a subtle glow */}
      <mesh position={[0, 0, -10]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.03} />
      </mesh>
    </>
  );
};

export default BackgroundScene;
