import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, forwardRef } from 'react';
import * as THREE from 'three';
import { AxesHelper } from 'three';

// forwardRef enables a parent component (shapes container) to "forward" a ref to a child (this mesh)
// allows the shapes container/drag controls to directly access the mesh ref (and doesn't work without it!)
const Shape = forwardRef(({ shapeObj }, meshRef) => {

  // CUSTOM SHAPES
  // gltf is a scene file. it includes the model, the material, the scene
  // const blast = useGLTF('./custom-shapes/Shapes_1_v2.glb')
  const blast = useGLTF('./custom-shapes/blast.glb')
  const pentagon = useGLTF('./custom-shapes/pentagon.glb')
  const half_circle = useGLTF('./custom-shapes/half_circle.glb')
  const triangle = useGLTF('./custom-shapes/triangle.glb')
  const oval = useGLTF('./custom-shapes/oval.glb')
  const diamond = useGLTF('./custom-shapes/diamond.glb')
  const teardrop = useGLTF('./custom-shapes/teardrop.glb')

  // FLOATING ANIMATION
  const floatRef = useRef();

  useFrame(({ clock }) => {
    if (floatRef.current) {
      const t = clock.getElapsedTime();
      floatRef.current.position.y = shapeObj.position.y + Math.sin(t + shapeObj.id) * 0.02; // small bobbing
    }
  });

  // set the geometry based on the chosen shape
  var geometry;

  {
    shapeObj.choice == "blast" ?
    geometry = blast.nodes.Plane.geometry
    :
    shapeObj.choice == "pentagon" ?
      geometry = pentagon.nodes.Pentagon.geometry
      :
      shapeObj.choice == "half_circle" ?
        geometry = half_circle.nodes.Circle.geometry
        :
        shapeObj.choice == "triangle" ?
          geometry = triangle.nodes.Triangle.geometry
          :
          shapeObj.choice == "oval" ?
            geometry = oval.nodes.Oval.geometry
            :
            shapeObj.choice == "diamond" ?
              geometry = diamond.nodes.Diamond.geometry
              :
              shapeObj.choice == "teardrop" ?
                geometry = teardrop.nodes.Teardrop.geometry
                : null
  }

  return <group ref={floatRef} rotation={[0, 0, shapeObj.rotate]} position={shapeObj.position}>
    {/* the geometry from the gltf scene needs to be passed to its own mesh */}
    <mesh ref={meshRef} geometry={geometry} scale={shapeObj.size}>
      <meshBasicMaterial color={new THREE.Color(shapeObj.color)} vertexColors transparent opacity={1} />
    </mesh>
  </group>
});

export default Shape;