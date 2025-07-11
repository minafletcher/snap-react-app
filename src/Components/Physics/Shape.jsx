import { ConvexGeometry } from 'three-stdlib';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber';

export default function Shape({shapeObj}) {

    const drawTriangle = (size) => {
        // Define 6 points: 3 for the front face, 3 for the back
        const points = [
        new THREE.Vector3(-size, -size, 0),  // front bottom left
        new THREE.Vector3(size, -size, 0),   // front bottom right
        new THREE.Vector3(0, size, 0),    // front top

        new THREE.Vector3(-size, -size, -size), // back bottom left
        new THREE.Vector3(size, -size, -size),  // back bottom right
        new THREE.Vector3(0, size, -size),   // back top
        ];

        return new ConvexGeometry(points)
}

  const floatRef = useRef();

  useFrame(({ clock }) => {
    if (floatRef.current) {
      const t = clock.getElapsedTime();
      floatRef.current.position.y = shapeObj.position.y + Math.sin(t + shapeObj.id) * 0.1; // small bobbing
    }
  });


    return <group ref={floatRef} position={shapeObj.position}>
      <RigidBody type="fixed" colliders="cuboid" >
    return <mesh rotation={[0, 0, shapeObj.rotate]} castShadow>
            {
            // if the random shape is a square
            shapeObj.choice == "box" ? 
            <>
            <boxGeometry args ={[shapeObj.size, shapeObj.size, shapeObj.size]}/>
            <meshStandardMaterial color={shapeObj.color} />
            </> :
            // if the random shape is a rectangle
            shapeObj.choice == "rect" ? 
            <>
            <boxGeometry args ={[shapeObj.size, 1, 1]}/>
            <meshStandardMaterial color={shapeObj.color} />
            </> :
            // if the random shape is a sphere
            shapeObj.choice == "sphere" ? 
            <>
            <sphereGeometry args={[shapeObj.size]}/>
            <meshStandardMaterial color={shapeObj.color} />
            </> :
            // otherwise, the shape is a triangle
            <>

            {/* PRISM */}
            <primitive object={drawTriangle(shapeObj.size)} attach="geometry" />
            <meshStandardMaterial color={shapeObj.color} />
            </>
            }
        </mesh>
        </RigidBody>
     </group>
}