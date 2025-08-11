import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { RigidBody, CuboidCollider, TrimeshCollider, ConvexHullCollider } from "@react-three/rapier";
import { Text, useTexture, useVideoTexture } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Work_Block({ workBlock, shape }) {

    // responsive block layout styles
    const blockHeight = workBlock.blockHeight
    const blockWidth = workBlock.blockWidth

    const padding = 0.25
    const textFontSize = 0.2
    const imageWidth = blockWidth - 0.5
    const imageHeight = imageWidth * (9 / 16)

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

    // const currentTexture = useMemo(() => hovered ? videoTexture : texture, [hovered, videoTexture, texture]);
    const currentTexture = videoTexture;

    // set the geometry based on the chosen shape
    var geometry;

    const blast = useGLTF('./work-shapes/blast.glb')
    const pentagon = useGLTF('./work-shapes/pentagon.glb')
    const half_circle = useGLTF('./work-shapes/half_circle.glb')
    const triangle = useGLTF('./work-shapes/triangle.glb')

    {
        shape == "blast" ?
            geometry = blast.nodes.Plane.geometry
            :
            shape == "pentagon" ?
                geometry = pentagon.nodes.Pentagon.geometry
                :
                shape == "half_circle" ?
                    geometry = half_circle.nodes.Circle.geometry
                    :
                    shape == "triangle" ?
                        geometry = triangle.nodes.Triangle.geometry
                        : null
    }

    // make the block a link using the useNavigate hook
    const navigate = useNavigate();

    const navigateToProject = () => {
        navigate(workBlock.link || '/home');
        document.body.style.cursor = 'default';
    }


    const groupRef = useRef();
    const colliderRef = useRef();

    // animate the block hover
    useFrame(() => {
        if (groupRef.current) {
            const target = scaleHovered ? 1.1 : 1;
            groupRef.current.scale.lerp(
                new THREE.Vector3(target, target, 1),
                0.1
            );

            // Rotation animation (slight tilt on hover)
            // const targetRotation = scaleHovered ? 0.1 : 0; // in radians (~5.7°)
            // groupRef.current.rotation.z = THREE.MathUtils.lerp(
            //     groupRef.current.rotation.z,
            //     targetRotation,
            //     0.1
            // );

        }
    });

    return <RigidBody scale={1.75} gravityScale={-0.5} position={workBlock.position} rotation={workBlock.rotation} enabledTranslations={[false, true, false]} enabledRotations={[false, false, true]} colliders={false}>
        <group
            ref={groupRef}
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
            <mesh geometry={geometry}

            // make the mesh a link using the useNavigate hook
            >
                {/* planeGeometry doesn't move in physics- has to be a thin boxGeometry */}
                {/* <boxGeometry args={[blockWidth, blockHeight, 0.05]} /> */}
                <meshBasicMaterial map={currentTexture} transparent />
            </mesh>

            <Text
                // text position is relative to the group position
                position={[
                    - blockWidth / 2 + padding,           // left edge + padding
                    blockHeight / 2 - padding,    // top edge - padding
                    0.03                       // slightly in front of the box to avoid z-fighting
                ]} // Slightly in front of the box
                font="./Fonts/AktivGrotesk-Bold.otf"
                fontSize={textFontSize}
                color="black"
                anchorX="left"
                anchorY="top"
            >
                {workBlock.title}
            </Text>

            {/* Image (thumbnail) below text */}
            {/* <mesh
                // image position is relative to the group position
                position={[
                    - blockWidth / 2 + padding + imageWidth / 2,       // Align left + center image
                    blockHeight / 2 - padding - textFontSize - imageHeight / 2 - 0.2, // Below text
                    0.031                                       // In front of box
                ]}
            >
                <planeGeometry args={[imageWidth, imageHeight]} />
                <meshBasicMaterial map={currentTexture} transparent />
            </mesh> */}

        </group>
        {/* custom Collider to match custom geometry */}
        <ConvexHullCollider
        key={scaleHovered ? 'hovered' : 'normal'} // Forces remount
        args={[geometry.attributes.position.array]}
        scale={scaleHovered ? 1.1 : 1}
        />
        {/* <CuboidCollider args={[blockWidth / 2, blockHeight / 2, 0.25]} /> */}
    </RigidBody>
}