import { ConvexGeometry } from 'three-stdlib';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber';

export default function Shape({ shapeObj }) {

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
      floatRef.current.position.y = shapeObj.position.y + Math.sin(t + shapeObj.id) * 0.02; // small bobbing
    }
  });


  return <group ref={floatRef} position={shapeObj.position}>
    <RigidBody type="fixed" colliders="cuboid" >
      <mesh rotation={[0, 0, shapeObj.rotate]} castShadow>
        {
          // if the random shape is a square
          shapeObj.choice == "box" ?
            <>
              <planeGeometry args={[shapeObj.size, shapeObj.size]} />
              <meshStandardMaterial color={shapeObj.color} />
            </> :
            // if the random shape is a rectangle
            shapeObj.choice == "rect" ?
              <>
                <planeGeometry args={[shapeObj.size, 1]} />
                <meshStandardMaterial color={shapeObj.color} />
              </> :
              // if the random shape is a sphere
              shapeObj.choice == "sphere" ?
                <>
                  <circleGeometry args={[shapeObj.size]} />
                  <meshStandardMaterial color={shapeObj.color} />
                </> :
                // otherwise, the shape is a triangle
                <>

                  {/* FLAT TRIANGLE */}
                  <bufferGeometry>
                    {/* draws each point position */}
                    <bufferAttribute
                      attach="attributes-position"
                      array={new Float32Array([
                        0, 1, 0,
                        -1, -1, 0,
                        1, -1, 0,
                      ])}
                      count={3}
                      itemSize={3}
                    />
                    {/* defines normals so the colors accurately reflect light */}
                    <bufferAttribute
                      attach="attributes-normal"
                      array={new Float32Array([
                        0, 0, 1,
                        0, 0, 1,
                        0, 0, 1,
                      ])}
                      count={3}
                      itemSize={3}
                    />
                  </bufferGeometry>
                  <meshStandardMaterial color={shapeObj.color} />
                </>
        }
      </mesh>
    </RigidBody>
  </group>
}