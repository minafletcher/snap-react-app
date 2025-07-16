import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react';

import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { Text, useTexture, useVideoTexture } from "@react-three/drei";

export default function Work_Block({ title, image, video, position, rotation, color, size, link }) {

    // responsive block layout styles
    const blockHeight = size * (3 / 5)

    const padding = 0.25
    const textFontSize = 0.2
    const imageWidth = size - 1
    const imageHeight = blockHeight - 1

    // thumbnail textures (Switch between image and video on hover)
    const texture = useTexture(image)
    const videoTexture = useVideoTexture(video, { loop: true, muted: true, start: false });
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

    return <RigidBody gravityScale={0.5} enabledTranslations={[false, true, false]} enabledRotations={[false, false, true]} colliders={false}>
        <mesh
            position={position}
            rotation={rotation}
            // make the block a link using the useNavigate hook
            onClick={() => navigate(link || '/home')}
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
            <boxGeometry args={[size, blockHeight, 0.05]} />
            <meshStandardMaterial color={color} />
        </mesh>

        <Text
            position={[
                position[0] - size/2 + padding,           // left edge + padding
                position[1] + blockHeight / 2 - padding,    // top edge - padding
                position[2] + 0.03                       // slightly in front of the box to avoid z-fighting
            ]} // Slightly in front of the box
            rotation={rotation}
            fontSize={textFontSize}
            color="black"
            anchorX="left"
            anchorY="top"
        >
            {title}
        </Text>

        {/* Image (thumbnail) below text */}
        <mesh
            position={[
                position[0] - size / 2 + padding + imageWidth / 2,       // Align left + center image
                position[1] + blockHeight / 2 - padding - textFontSize - imageHeight / 2 - 0.2, // Below text
                position[2] + 0.031                                       // In front of box
            ]}
            rotation={rotation}
        >
            <planeGeometry args={[imageWidth, imageHeight]} />
            <meshBasicMaterial map={currentTexture} transparent />
        </mesh>

        {/* custom Collider allows for a thicker z-axis collision detection (that wouldn't work with a thin z depth) */}
        <CuboidCollider args={[size / 2, blockHeight / 2, 0.5]} position={position} />
    </RigidBody>
}