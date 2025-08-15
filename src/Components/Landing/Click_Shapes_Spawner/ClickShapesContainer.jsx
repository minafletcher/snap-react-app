import { useState, useEffect, useRef } from 'react';
import React from 'react';
// import { DragControls } from '@react-three/drei';
import { DragControls } from '../../../helpers/DragControls.js';
import { useThree } from '@react-three/fiber';
import Shape from './Shape_flat';

export default function ShapesContainer({ shapes }) {

    const { camera, gl, scene } = useThree();
    const meshRefs = useRef([]);


    useEffect(() => {
        const objects = meshRefs.current.slice().reverse(); // reverse to prioritize newer shapes on drag

        // using more vanilla DragControls from threejs instead of drei
        // Drei just created a wrapper around this class. And for whatever reason, it didn't work with a dynamic objects list!
        const controls = new DragControls(objects, camera, gl.domElement);



        controls.addEventListener('dragstart', () => {
            gl.domElement.style.cursor = 'pointer';
        });

        controls.addEventListener('drag', () => {
            gl.domElement.style.cursor = 'pointer';

            controls.rotateSpeed = 10

        });

        return () => controls.dispose();
    }, [shapes, camera, gl]);


    // return a shape for each shape in the list! these will get the DragControls applied, since they're referencing the same mesh!
    return (
        <>
            {shapes.map((shape, i) => (
                <Shape
                    key={shape.id}
                    shapeObj={shape}
                    ref={ref => (meshRefs.current[i] = ref)} // use the forwarded ref
                />
            ))}
        </>
    );
}
