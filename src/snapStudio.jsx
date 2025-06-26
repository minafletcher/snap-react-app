import SnapPhysics from "./Components/Physics/SnapPhysics";
import { Canvas } from '@react-three/fiber'

import { useState, useRef } from 'react'
import Landing from "./Components/Landing/Landing";
import Navbar from "./Components/Navbar";
import ShapesSpawner from "./Components/Landing/ShapesSpawn/ShapesSpawner";

export default function SnapStudio()
{

    const [shapes, setShapes] = useState([]);
    const shapeIdRef = useRef(0);


    return <>
        
        <div class="absolute z-0 w-full h-full">
        <Canvas
        shadows
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 0, 0, 12 ],
        }}
    >
        <ShapesSpawner shapeIdRef={shapeIdRef} setShapes={setShapes}/>
        <SnapPhysics shapes={shapes} shapeCount={shapeIdRef.current}/>
        
    </Canvas>
    </div>

    <Navbar />

    <div class="absolute z-10 bottom-0 flex w-full justify-center pb-10"><Landing setShapes={setShapes}/>
    </div>
    </>
}