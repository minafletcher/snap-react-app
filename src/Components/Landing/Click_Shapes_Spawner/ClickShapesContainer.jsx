import { DragControls } from '@react-three/drei'

{/* SWITCH BETWEEN 2D and 3D */}
import Shape from './Shape_flat';

export default function ShapesContainer({shapes})
{

    return <>

        {/* <Perf position="top-left" /> */}

        {/* generate each random shape with drag controls */}
        {shapes.map((shape) => (

            <DragControls>
                <Shape shapeObj={shape}/>
        </DragControls>
      ))}

    
    </>
}