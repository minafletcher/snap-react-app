import SnapPhysics from "./Components/Physics/SnapPhysics";
import { Canvas } from '@react-three/fiber'

import { useState, useRef } from 'react'

export default function Landing()
{

    const [boxes, setBoxes] = useState([]);
    const boxIdRef = useRef(0);

    const spawnObject = () => {

        // if (!physicsOnRef.current) return;

        // console.log("spawned")

        const newBox = {
            id: boxIdRef.current++,
            position: [
                0,
                0,
                0
            //   (mousePos.x - window.innerWidth) / 200,
            //   (mousePos.y / 500) * 2 + 1,
            //   0
            ],
            };
            
            setBoxes(prevBoxes => [...prevBoxes, newBox])
            
    }

    return <>
        
        <Canvas
        shadows
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 0, 4, 12 ]
        } }
    >
        <SnapPhysics boxesRef={boxes}/>
        
    </Canvas>

    <button onClick={spawnObject} style={{left: "50%", position:"absolute", top: "0%",}}>Create New Box</button>

    </>
}