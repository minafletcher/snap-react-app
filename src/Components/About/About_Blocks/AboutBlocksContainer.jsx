import * as THREE from 'three';
import test_image from '/thumbnails/Feathers_Mcgraw.png'
import { useThree } from '@react-three/fiber';
import { Text, useTexture } from "@react-three/drei";

import { useRef } from "react";
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function AboutBlocksContainer() {

    const { viewport } = useThree();

    const screenWidth = viewport.width;
    const screenHeight = viewport.height;

    // adjust block size for all 4 shapes + some extra for navbar
    // cap blockWidth at a maximum size 3
    const blockWidth = Math.min(Math.min(screenWidth / 4.25, screenHeight / 4.25), 3);

    const blockHeight = blockWidth;

    const circleTexture = useTexture(test_image)

    const blast = useGLTF('./work-shapes/blast.glb')
    let blastGeometry = blast.nodes.Plane.geometry

    let circlePos, squarePos, blastPos

    let circleSize, squareSize, blastSize

    if (screenWidth > 4.81) {
        circlePos = [-blockWidth, blockWidth / 2 + 0.1, 0]
        squarePos = [0, -blockWidth, 0]
        blastPos = [blockWidth, blockWidth / 2, 0]

        circleSize = [blockWidth * 0.75]
        squareSize = [blockWidth * 3, blockHeight * 1.5, 1]
        blastSize = [blockWidth * 0.75, blockWidth * 0.75, blockWidth]
    }
    else {
        circlePos = [0, blockWidth * 1.4, 0]
        squarePos = [0, -blockWidth / 2, 0]
        blastPos = [0, -blockWidth * 2.65, 0]

        circleSize = [blockWidth * 0.9]
        squareSize = [blockWidth * 3.5, blockHeight * 2, 1]
        blastSize = [blockWidth, blockWidth, blockWidth]
    }

    // FLOATING ANIMATION

    const circleRef = useRef();
    const squareRef = useRef();
    const blastRef = useRef();

    useFrame(({ clock }) => {
        if (circleRef.current) {
            const t = clock.getElapsedTime();
            circleRef.current.position.y = circlePos[1] + Math.sin(t + 1) * 0.02; // small bobbing
        }
        if (squareRef.current) {
            const t = clock.getElapsedTime();
            squareRef.current.position.y = squarePos[1] + Math.sin(t + 2) * 0.02; // small bobbing
        }
        if (blastRef.current) {
            const t = clock.getElapsedTime();
            blastRef.current.position.y = blastPos[1] + Math.sin(t + 3) * 0.02; // small bobbing
        }
    });

    //  ICONS
    let iconLinks = ['facebook.com', 'x.com', 'instagram.com', 'linkedin.com']

    return (
        <group>
            {/* CIRCLE GROUP*/}
            <group
                ref={circleRef}
                position={circlePos}>
                {/* IMAGE CIRCLE */}
                <mesh
                    position={[0, 0, 0.01]}
                >
                    <circleGeometry args={[circleSize[0] * 0.9]} />
                    <meshBasicMaterial map={circleTexture} />
                </mesh>
                {/* BACKGROUND CIRCLE */}
                <mesh
                >
                    <circleGeometry args={circleSize} />
                    <meshBasicMaterial color={'#70BEF9'} />
                </mesh>
            </group>

            {/* RECTANGLE */}
            <group
                ref={squareRef}
                position={squarePos}
                rotation={[0, 0, -0.05]}
            >
                <Text
                    position={[0, squareSize[1] / 2, 0.01]}
                    fontSize={squareSize[0] * 0.04}
                    color="black"
                    anchorX="center"
                    anchorY="center"
                    maxWidth={squareSize[0] * 0.9}      // maximum width before wrapping
                    lineHeight={1.2}  // space between lines
                >
                    {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                </Text>
                <mesh>
                    <planeGeometry args={squareSize} />
                    <meshBasicMaterial color={'#FF594E'} />
                </mesh>
            </group>

            <group ref={blastRef} position={blastPos} scale={blastSize}>
                {/* BLAST BACKGROUND */}
                <mesh
                    rotation={[0, 0, -0.25]}
                    geometry={blastGeometry}
                >
                    <meshBasicMaterial color={'#FFBA29'} />
                </mesh>

                {/* ICONS IN 2x2 GRID */}
                <group>
                    {["facebook.png", "twitter.png", "instagram.png", "linkedin.png"].map((icon, i) => {
                        const iconTexture = useTexture(`/icons/${icon}`); // adjust path

                        // calculate grid position
                        const row = Math.floor(i / 2); // 0 or 1
                        const col = i % 2;             // 0 or 1
                        const spacing = 0.4;          // distance between icons

                        const xOffset = (col - 0.5) * spacing; // center grid on blast
                        const yOffset = (0.5 - row) * spacing; // invert y to go top-to-bottom

                        return (
                            <mesh
                                key={i}
                                position={[
                                    xOffset,
                                    yOffset,
                                    1 // slightly above blast
                                ]}
                                onClick={() => window.open(`https://www.${iconLinks[i]}`, "_blank")}
                            >
                                <planeGeometry args={[0.25, 0.25]} /> {/* size of the icon */}
                                <meshBasicMaterial map={iconTexture} transparent />
                            </mesh>
                        );
                    })}
                </group>
            </group>
        </group>
    );
}