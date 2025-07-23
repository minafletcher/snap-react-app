import { ConvexGeometry } from 'three-stdlib';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber';
import { forwardRef } from 'react';

// forwardRef enables a parent component (shapes container) to "forward" a ref to a child (this mesh)
// allows the shapes container/drag controls to directly access the mesh ref (and doesn't work without it!)
const Shape = forwardRef(({ shapeObj }, meshRef) => {

  // FLOATING ANIMATION
  const floatRef = useRef();

  useFrame(({ clock }) => {
    if (floatRef.current) {
      const t = clock.getElapsedTime();
      floatRef.current.position.y = shapeObj.position.y + Math.sin(t + shapeObj.id) * 0.02; // small bobbing
    }
  });


  return <group ref={floatRef} position={shapeObj.position}>
    <mesh ref={meshRef} rotation={[0, 0, shapeObj.rotate]} castShadow>
      {
        // if the random shape is a square
        shapeObj.choice == "box" ?
          <planeGeometry args={[shapeObj.size, shapeObj.size]} />
          :
          // if the random shape is a rectangle
          shapeObj.choice == "rect" ?
            <planeGeometry args={[shapeObj.size, 1]} />
            :
            // if the random shape is a sphere
            shapeObj.choice == "sphere" ?
              <circleGeometry args={[shapeObj.size]} />
              :
              // otherwise, the shape is a triangle
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
      }
      <meshStandardMaterial color={shapeObj.color} />
    </mesh>
  </group>
});

export default Shape;