import { useThree } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier'

export default function CeilingComponent() {

    // get screen size for responsive positions in the Work experience
    const { viewport } = useThree();
    const screenWidth = viewport.width;
    const screenHeight = viewport.height;

    return <RigidBody type="fixed">
        <mesh position={[0, - screenHeight / 2, 0]}>
            <boxGeometry args={[viewport.width, 0.01, 1]} />
            <meshStandardMaterial transparent={true} opacity={0} color="gray" />
        </mesh>
    </RigidBody>
}