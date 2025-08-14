import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { RigidBody, CuboidCollider, TrimeshCollider, ConvexHullCollider } from "@react-three/rapier";
import { Text, useTexture, useVideoTexture } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Work_Block({ workBlock, shape }) {

    // thumbnail textures (Switch between image and video on hover)
    // const texture = useTexture(workBlock.image)
    const videoTexture = useVideoTexture(workBlock.thumb_video, { loop: true, muted: true, start: false });
    // const [hovered, setHovered] = useState(true);
    const [scaleHovered, setScaleHovered] = useState(false);

    useEffect(() => {
        if (videoTexture?.image) {
            videoTexture.image.play();
        }
    }, []);

    // make the block a link using the useNavigate hook
    const navigate = useNavigate();

    const navigateToProject = () => {
        navigate(workBlock.link || '/home');
        document.body.style.cursor = 'default';
    }


    const groupRef = useRef();

    // animate the block hover
    useFrame(() => {
        if (groupRef.current) {
            const target = scaleHovered ? 1.1 : 1;
            groupRef.current.scale.lerp(
                new THREE.Vector3(target, target, 1),
                0.1
            );

        }
    });

    // const currentTexture = useMemo(() => hovered ? videoTexture : texture, [hovered, videoTexture, texture]);
    const currentTexture = videoTexture;

    // set the geometry based on the chosen shape
    let geometry, textColor;

    let textFontSize;

    textFontSize = workBlock.blockWidth * 0.1

    if (workBlock.blockWidth < (4.81 / 4.25)) {
        textFontSize = workBlock.blockWidth * 0.25
    }

    textColor = "#f1f1de"
    // set the text based on the chosen shape

    const rhombus = useGLTF('./work-shapes/rhombus.glb')
    const pentagon = useGLTF('./work-shapes/pentagon.glb')
    const half_circle = useGLTF('./work-shapes/half_circle.glb')
    const triangle = useGLTF('./work-shapes/triangle.glb')

    {
        shape == "rhombus" ?
            (geometry = rhombus.nodes.Rhombus.geometry
            )
            :
            shape == "pentagon" ?
                (geometry = pentagon.nodes.Pentagon.geometry
                )
                :
                shape == "half_circle" ?
                    (
                        geometry = half_circle.nodes.Circle.geometry,
                        textColor = "#111111"
                    )
                    :
                    shape == "triangle" ?
                        (
                            geometry = triangle.nodes.Triangle.geometry,
                            textColor = "#111111"
                        )
                        : null
    }


    return <RigidBody
        scale={[workBlock.blockWidth, workBlock.blockHeight, 1]}
        gravityScale={-0.33}
        position={workBlock.position}
        rotation={workBlock.rotation}
        enabledTranslations={[false, true, false]}
        enabledRotations={[false, false, true]}
        colliders={false}>
        <group
            ref={groupRef}
            // make the mesh a link using the useNavigate hook
            onClick={() => navigateToProject()}
            // control hover styles + cursor
            onPointerOver={() => {
                document.body.style.cursor = 'pointer';
                setScaleHovered(true)
            }}
            onPointerOut={() => {
                document.body.style.cursor = 'default';
                setScaleHovered(false)
            }}
        >
            <mesh geometry={geometry}>
                <meshBasicMaterial map={currentTexture} transparent />
            </mesh>

            <Text
                position={[0, 0, 0.5]}
                font="./Fonts/AktivGrotesk-Bold.otf"
                fontSize={textFontSize}
                color={textColor}
                anchorX="center"
                anchorY="middle"
            >
                {workBlock.title}
            </Text>

        </group>

        {/* {shape == 'rhombus' ?

            <TrimeshCollider args={[geometry.attributes.position.array, geometry.index.array]} />

            : */}
            {/* // custom Collider to match custom geometry */}
            < ConvexHullCollider
                key={scaleHovered ? 'hovered' : 'normal'} // Forces remount
                args={[geometry.attributes.position.array]}
                scale={scaleHovered ? 1.1 : 1}
            />
        {/* } */}

        {/* <CuboidCollider args={[blockWidth / 2, blockHeight / 2, 0.25]} /> */}
    </RigidBody>
}