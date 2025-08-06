import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { Text, useTexture, useVideoTexture } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';

export default function Work_Block({ workBlock }) {

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

    // On hover state, play or pause the video
    // useEffect(() => {
    //     if (videoTexture?.image) {
    //         if (hovered) {
    //             videoTexture.image.play();
    //         } else {
    //             videoTexture.image.pause();
    //         }
    //     }

    // }, [hovered, videoTexture]);

    useEffect(() => {
        if (videoTexture?.image) {
                videoTexture.image.play();
        }
    }, []);

    // const currentTexture = useMemo(() => hovered ? videoTexture : texture, [hovered, videoTexture, texture]);
    const currentTexture = videoTexture;


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

    return <RigidBody gravityScale={- 0.5} enabledTranslations={[false, true, false]} enabledRotations={[false, false, true]} colliders={false}>
        <group
            ref={groupRef}
            rotation={workBlock.rotation}
            onClick={() => navigateToProject()}
            // control hover styles + cursor
            onPointerOver={() => {
                //setHovered(true);
                document.body.style.cursor = 'pointer';
                setScaleHovered(true)
            }}
            onPointerOut={() => {
                // setHovered(false);
                document.body.style.cursor = 'default';
                setScaleHovered(false)
            }}
            position={workBlock.position}
        >
            <mesh

            // make the mesh a link using the useNavigate hook
            >
                {/* planeGeometry doesn't move in physics- has to be a thin boxGeometry */}
                <boxGeometry args={[blockWidth, blockHeight, 0.05]} />
                <meshBasicMaterial color={new THREE.Color(workBlock.color)} />
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
            <mesh
                // image position is relative to the group position
                position={[
                    - blockWidth / 2 + padding + imageWidth / 2,       // Align left + center image
                    blockHeight / 2 - padding - textFontSize - imageHeight / 2 - 0.2, // Below text
                    0.031                                       // In front of box
                ]}
            >
                <planeGeometry args={[imageWidth, imageHeight]} />
                <meshBasicMaterial map={currentTexture} transparent />
            </mesh>

        </group>
        {/* custom Collider allows for a thicker z-axis collision detection (that wouldn't work with a thin z depth) */}
        <CuboidCollider key={scaleHovered ? "hover" : "default"}
            ref={colliderRef}
            args={[
                (blockWidth * (scaleHovered ? 1.1 : 1)) / 2,
                (blockHeight * (scaleHovered ? 1.1 : 1)) / 2,
                0.5,
            ]}
            position={workBlock.position}
            // rotation={
            //     scaleHovered
            //         ? [
            //             workBlock.rotation[0], // tilt X on hover
            //             workBlock.rotation[1], // tilt Y on hover
            //             workBlock.rotation[2] + 0.1,      // keep Z the same
            //         ]
            //         : workBlock.rotation
            // }
            rotation={workBlock.rotation}
            />
    </RigidBody>
}