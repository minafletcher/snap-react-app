import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react';

import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { Text, useTexture, useVideoTexture } from "@react-three/drei";

export default function Work_Block({ workBlock }) {

    // responsive block layout styles
    const blockHeight = workBlock.size * (3 / 5)

    const padding = 0.25
    const textFontSize = 0.2
    const imageWidth = workBlock.size - 1
    const imageHeight = blockHeight - 1

    // thumbnail textures (Switch between image and video on hover)
    const texture = useTexture(workBlock.image)
    const videoTexture = useVideoTexture(workBlock.thumb_video, { loop: true, muted: true, start: false });
    const [hovered, setHovered] = useState(false);

    // On hover state, play or pause the video
    useEffect(() => {
        if (videoTexture?.image) {
            if (hovered) {
                videoTexture.image.play();
            } else {
                videoTexture.image.pause();
            }
        }
    }, [hovered, videoTexture]);

    const currentTexture = useMemo(() => hovered ? videoTexture : texture, [hovered, videoTexture, texture]);


    // make the block a link using the useNavigate hook
    const navigate = useNavigate();

    const navigateToProject = () => {
        navigate(workBlock.link || '/home');
        document.body.style.cursor = 'default';
    }

    return <RigidBody gravityScale={0.5} enabledTranslations={[false, true, false]} enabledRotations={[false, false, true]} colliders={false}>
        <mesh
            position={workBlock.position}
            rotation={workBlock.rotation}
            // make the mesh a link using the useNavigate hook
            onClick={() => navigateToProject()}
            // control hover styles + cursor
            onPointerOver={() => {
                setHovered(true);
                document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
                setHovered(false);
                document.body.style.cursor = 'default';
            }}>
            {/* planeGeometry doesn't move in physics- has to be a thin boxGeometry */}
            <boxGeometry args={[workBlock.size, blockHeight, 0.05]} />
            <meshStandardMaterial color={workBlock.color} />
        </mesh>

        <Text
            position={[
                workBlock.position[0] - workBlock.size/2 + padding,           // left edge + padding
                workBlock.position[1] + blockHeight / 2 - padding,    // top edge - padding
                workBlock.position[2] + 0.03                       // slightly in front of the box to avoid z-fighting
            ]} // Slightly in front of the box
            rotation={workBlock.rotation}
            fontSize={textFontSize}
            color="black"
            anchorX="left"
            anchorY="top"
        >
            {workBlock.title}
        </Text>

        {/* Image (thumbnail) below text */}
        <mesh
            position={[
                workBlock.position[0] - workBlock.size / 2 + padding + imageWidth / 2,       // Align left + center image
                workBlock.position[1] + blockHeight / 2 - padding - textFontSize - imageHeight / 2 - 0.2, // Below text
                workBlock.position[2] + 0.031                                       // In front of box
            ]}
            rotation={workBlock.rotation}
        >
            <planeGeometry args={[imageWidth, imageHeight]} />
            <meshBasicMaterial map={currentTexture} transparent />
        </mesh>

        {/* custom Collider allows for a thicker z-axis collision detection (that wouldn't work with a thin z depth) */}
        <CuboidCollider args={[workBlock.size / 2, blockHeight / 2, 0.5]} position={workBlock.position} />
    </RigidBody>
}