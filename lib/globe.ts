import * as THREE from "three";

// Convert lat/lng (deg) -> position on sphere
export function latLngToVector3(radius: number, lat: number, lng: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z =  radius * Math.sin(phi) * Math.sin(theta);
  const y =  radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}
