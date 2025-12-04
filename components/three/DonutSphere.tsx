"use client";
import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame, extend } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, TorusGeometry } from "three";

// Environment: Component tạo môi trường ánh sáng xung quanh scene (warehouse preset = nhà kho)
// MeshTransmissionMaterial: Material tạo hiệu ứng trong suốt, như thủy tin
// useFrame: Hook chạy animation mỗi frame (60fps)
// extend: Đăng ký geometry/material custom với React Three Fiber
// Mesh, TorusGeometry: Các class từ Three.js (Mesh = đối tượng 3D, TorusGeometry = hình xuyến)

extend({ TorusGeometry });

export default function DonutSphere() {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;
    // Giảm giá trị để chuyển động chậm lại
    // 0.01 → 0.005 (chậm hơn)
    // 0.01 → 0.002 (rất chậm)
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.x += 0.002;
  });

  return (
    <>
      {/* Ambient Light: Ánh sáng xung quanh toàn cảnh; intensity={10.1}: Độ sáng = 10.1 (cao = sáng hơn) */}
      <ambientLight intensity={10.1} />

      {/* Directional Light: Ánh sáng từ hướng nhất định (như mặt trời); position=[2, 20, 10]: Vị trí: x=2, y=20 (trên cao), z=10 (phía trước)*/}
      <directionalLight position={[2, 20, 10]} />
      <Environment preset="sunset" />

      {/* 
        Điều chỉnh vị trí:
        - position-x: chuyển động trái (-) / phải (+)
        - position-y: chuyển động xuống (-) / lên (+)
        - position-z: chuyển động xa (-) / gần (+)
        - scale: phóng to / thu nhỏ
      */}
      <mesh position={[0, 0, -4]} scale={1} ref={meshRef}>
        {/*args=[2.8, 0.8, 100, 100]:
          2.8 = bán kính chính (radius)
          0.8 = bán kính ống (tube radius)
          100 = số segments ngang (chi tiết)
          100 = số segments dọc (chi tiết) */}
        <torusGeometry args={[2.8, 0.8, 100, 100]} attach="geometry" />

        {/*transmission={1}: Độ trong suốt (1 = hoàn toàn trong suốt, 0 = không trong suốt)
          samples={1}: Số lần sample cho hiệu ứng (1 = nhanh nhưng kém chất lượng)
          anisotropy={0}: Hiệu ứng phản xạ theo hướng (0 = không có)
          chromaticAberration={0}: Tách màu (0 = không, >0 = tạo hiệu ứng cầu vồng) */}
        <MeshTransmissionMaterial
          transmission={1}
          samples={1}
          anisotropy={0}
          chromaticAberration={0}
        />
      </mesh>
    </>
  );
}
