import { Canvas } from '@react-three/fiber'
import ClickShapesSpawner from './Components/Landing/Click_Shapes_Spawner/ClickShapesSpawner'
import ClickShapesContainer from './Components/Landing/Click_Shapes_Spawner/ClickShapesContainer'

import { OrbitControls } from '@react-three/drei'

import { useLocation } from "react-router-dom";

import { Physics, RigidBody } from '@react-three/rapier'
import WorkBlocksContainer from './Components/Work/Work_Blocks_Spawner/WorkBlocksContainer';
import CeilingComponent from './Components/Work/Work_Blocks_Spawner/CeilingComponent';

export default function CanvasExperience({ shapeIdRef, shapes, setShapes }) {

    const location = useLocation();
    const currentPage = location.pathname;

    return <div className="w-full h-full min-h-[1000px]">
        <Canvas
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [0, 0, 12],
            }}
        >

            {/* SWITCH BETWEEN 2D and 3D */}
            {/* add "makeDefault" instead of "enabled=true" for when in use */}
            <OrbitControls makeDefault enableZoom={false} />

            {/* 3D SHADING */}
            {/* <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 3.5 } />
            <ambientLight intensity={ 2 } /> */}

            {/* 2D SHADING*/}
            <ambientLight intensity={5} />

            {currentPage == "/home" ? <>
                <ClickShapesSpawner shapeIdRef={shapeIdRef} setShapes={setShapes} />

                <Physics>
                    <ClickShapesContainer shapes={shapes} />
                </Physics>
            </> :

                currentPage == "/work" ?

                    <Physics gravity={[0, 9.81, 0]}>
                        <CeilingComponent />
                        <WorkBlocksContainer />
                    </Physics>
                    :

                    null}

        </Canvas>
    </div>
}