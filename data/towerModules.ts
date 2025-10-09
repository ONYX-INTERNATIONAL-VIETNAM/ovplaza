// data/towerModules.ts
import * as THREE from "three";

export type TowerItem = {
  key: string;
  label: string;
  color: string;         // màu dot trong panel
  anchor: THREE.Vector3; // điểm neo trên thân tháp (x,y,z)
  side: "left"|"right";  // hướng bắn ra pill
  dist?: number;         // khoảng cách kéo pill ra ngoài
};

export const TOWER_MODULES: TowerItem[] = [
  { key: "ovlab",   label: "OVLAB",   color: "#6ee7ff", anchor: new THREE.Vector3( 0.35,  1.20, 0.02), side: "right", dist: 0.85 },
  { key: "ovvideo", label: "OVVIDEO", color: "#f5c842", anchor: new THREE.Vector3(-0.45,  0.45, 0.02), side: "left",  dist: 0.95 },
  { key: "ovtutor", label: "OVTUTOR", color: "#7b86ff", anchor: new THREE.Vector3( 0.28,  0.30, 0.02), side: "right", dist: 0.85 },
  { key: "ovcafe",  label: "OVCAFE",  color: "#ff6b9a", anchor: new THREE.Vector3(-0.40, -0.45, 0.02), side: "left",  dist: 1.00 },
  { key: "ovbay",   label: "OVBAY",   color: "#a88bff", anchor: new THREE.Vector3( 0.30, -0.50, 0.02), side: "right", dist: 1.00 },
];
