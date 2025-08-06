import { Canvas } from '@react-three/fiber'
import ClickShapesSpawner from './Components/Landing/Click_Shapes_Spawner/ClickShapesSpawner'
import ClickShapesContainer from './Components/Landing/Click_Shapes_Spawner/ClickShapesContainer'
import { useLocation } from "react-router-dom";
import { Physics } from '@react-three/rapier'
import WorkBlocksContainer from './Components/Work/Work_Blocks_Spawner/WorkBlocksContainer';
import CeilingComponent from './Components/Work/Work_Blocks_Spawner/CeilingComponent';
import * as THREE from 'three';

export default function CanvasExperience({ fadeClick, shapeIdRef, shapes, setShapes }) {

    const location = useLocation();
    const currentPage = location.pathname;

    return <div className={`w-full h-full ${currentPage.indexOf("/work/") == 0 ? 'hidden' : 'visible'
        }`} onClick={currentPage == "/home" ? fadeClick : null}>
        <Canvas

            orthographic

            camera={{
                zoom: 100,
                fov: 45,
                near: 0.1,
                far: 200,
                position: [0, 0, 12],
            }}
            gl={{
                outputColorSpace: THREE.SRGBColorSpace,
                toneMapping: THREE.NoToneMapping
            }}
            flat // disables tone mapping + linear encoding
        >

            {currentPage == "/home" ? <>
                <ClickShapesSpawner shapeIdRef={shapeIdRef} setShapes={setShapes} />
                <ClickShapesContainer shapes={shapes} />
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