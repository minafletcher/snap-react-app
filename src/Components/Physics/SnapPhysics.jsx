import { DragControls, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Perf } from 'r3f-perf'

import { CylinderCollider, RigidBody, Physics } from '@react-three/rapier'

import { useRef, useEffect, useState } from 'react'

export default function SnapPhysics({boxesRef})
{

    // const [boxes, setBoxes] = useState([]);
    // const boxIdRef = useRef(0);

    // const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    // const [physicsOn, setPhysicsOn] = useState(true)

    // const physicsOnRef = useRef(physicsOn);

    const hamburger = useGLTF('./hamburger.glb')

    // useEffect(() => {
    //     physicsOnRef.current = physicsOn;
    //   }, [physicsOn]);
  
    // useEffect(()=> {
    //     const handleMouseMove = (event) => {
    //         setMousePos({
    //           x: event.clientX,
    //           y: event.clientY,
    //         });
    
    //         // console.log("x: " + mousePos.x + " y: " + mousePos.y)
    //       }


    //     const spawnObject = () => {

    //         if (!physicsOnRef.current) return;

    //         console.log("spawned")
    
    //         const newBox = {
    //             id: boxIdRef.current++,
    //             position: [
    //                 0,
    //                 0,
    //                 0
    //             //   (mousePos.x - window.innerWidth) / 200,
    //             //   (mousePos.y / 500) * 2 + 1,
    //             //   0
    //             ],
    //           };
              
    //           setBoxes(prevBoxes => [...prevBoxes, newBox])
    //     }


    //   window.addEventListener('mousemove', handleMouseMove);
    //   window.addEventListener('click', spawnObject);

    //   return () => {
    //     window.removeEventListener('mousemove', handleMouseMove);
    //     window.removeEventListener('click', spawnObject);
    //   }
    // //   the [] only runs when the value inside changes
    // }, [physicsOn])
      
    const cubeBody = useRef()
    const sphereBody = useRef()


    const cubeJump = () => {

        cubeBody.current.applyImpulse({x: 0, y: 6, z: 0}, true)
        cubeBody.current.applyTorqueImpulse({x: 0, y: 1, z: 0}, true)
    }

    const sphereJump = () => {

        sphereBody.current.applyImpulse({x: 0, y: 2, z: 0}, true)
        
    }

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />


    <Physics debug={false}>
        <RigidBody onPointerMove={sphereJump} ref={sphereBody} colliders="ball">
            
        <mesh  castShadow position={ [ -4, 2, 0 ] }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>
        
        </RigidBody>

        <RigidBody type="fixed">
        <mesh receiveShadow position-y={ - 1.25 }>
            <boxGeometry args={ [ 20, 0.5, 20 ] } />
            <meshStandardMaterial color="greenyellow" />
        </mesh>
        </RigidBody>

        {/* on click boxes */}
        {boxesRef.map((box) => (

        <RigidBody key={box.id} position={box.position}>
        <mesh castShadow>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
        </RigidBody>
      ))}

<RigidBody ref={cubeBody} colliders={false} position={[4,2,0]}>
    <primitive onPointerEnter={cubeJump} object={hamburger.scene} scale={0.25} />
    <CylinderCollider args={[0.5, 1.25]}/>
    </RigidBody>
    </Physics>

    
    </>
}