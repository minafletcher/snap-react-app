import { DragControls, OrbitControls, useGLTF } from '@react-three/drei'

import { Physics } from '@react-three/rapier'

{/* SWITCH BETWEEN 2D and 3D */}
import Shape from './Shape_flat';

export default function SnapPhysics({shapes, shapeCount})
{

    return <>

        {/* <Perf position="top-left" /> */}

        {/* SWITCH BETWEEN 2D and 3D */}
        {/* add "makeDefault" instead of "enabled=true" for when in use */}
        <OrbitControls enabled={false} enableZoom={false}/>

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 3.5 } />
        <ambientLight intensity={ 2 } />

        {/* FLAT SHADING - V2 */}
        {/* <ambientLight intensity={ 5 } /> */}


    <Physics debug={false}>
            

        {/* generate each random shape with drag controls */}
        {shapes.map((shape) => (

            <DragControls>
                <Shape shapeObj={shape}/>
        </DragControls>
      ))}

    </Physics>

    
    </>
}