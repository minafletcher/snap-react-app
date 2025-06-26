import * as THREE from 'three'
import { DragControls, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Perf } from 'r3f-perf'

import { CylinderCollider, RigidBody, Physics, InstancedRigidBodies } from '@react-three/rapier'

import { useRef, useEffect, useState } from 'react'
import Shape from './Shape';

export default function SnapPhysics({shapes, shapeCount})
{

    const hamburger = useGLTF('./hamburger.glb')
      
    const burgerBody = useRef()
    const cubeBody = useRef()
    const sphereBody = useRef()

    const cubeJump = () => {

        cubeBody.current.applyImpulse({x: 0, y: 6, z: 0}, true)
        cubeBody.current.applyTorqueImpulse({x: 0, y: 1, z: 0}, true)
    }

    const burgerJump = () => {

        burgerBody.current.applyImpulse({x: 0, y: 6, z: 0}, true)
        burgerBody.current.applyTorqueImpulse({x: 0, y: 1, z: 0}, true)
    }

    const sphereJump = () => {

        sphereBody.current.applyImpulse({x: 0, y: 2, z: 0}, true)
        
    }

    return <>

        {/* <Perf position="top-left" /> */}

        <OrbitControls makeDefault enableZoom={false}/>

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 3.5 } />
        <ambientLight intensity={ 2 } />


    <Physics debug={false}>
        {/* <RigidBody onPointerMove={sphereJump} ref={sphereBody} colliders="ball"> */}
            

        {/* generate each random shape with drag controls */}
        {shapes.map((shape) => (

            <DragControls>
                <Shape shapeObj={shape}/>
        </DragControls>
      ))}

    </Physics>

    
    </>
}