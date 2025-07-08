import { Canvas } from '@react-three/fiber'
import ShapesSpawner from './Components/Landing/ShapesSpawn/ShapesSpawner'
import SnapPhysics from './Components/Physics/SnapPhysics'

import { useLocation } from "react-router-dom";

export default function CanvasExperience({shapeIdRef, shapes, setShapes}){

    const location = useLocation();
    const currentPage = location.pathname;

        return <>
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
        </>
}