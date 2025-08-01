import projects_data from '../../../content/Projects/projects_data.js'
import Work_Block from './Work_Block.jsx'
import { useThree } from '@react-three/fiber';
import { useMemo } from 'react';

export default function WorkBlocksContainer() {

    const { viewport } = useThree();
    const screenWidth = viewport.width;
    const screenHeight = viewport.height;

    // useMemo caches the work_blocks array between re-renders so it doesn't have to recalculate
    const work_blocks = useMemo(() => {
        const blocks = [];
        const colorOps = ["red", "blue", "yellow", "green", "pink", "purple"];
        const start_y_position = -screenHeight;

        var x_pos_flip = 0
        var start_x_position = 0

        // add a work block object to the array, with unique values based on priority #
        for (let i = 0; i < projects_data.length; i++) {

            // alternates between the left and right sides of the screen
            if (x_pos_flip == 0) {
                start_x_position = -screenWidth / 4

                x_pos_flip = 1
            }

            else {
                start_x_position = screenWidth / 4

                x_pos_flip = 0
            }

            blocks.push({
                key: projects_data[i].key,
                title: projects_data[i].title,
                image: projects_data[i].thumbnail,
                thumb_video: projects_data[i].thumb_video,
                position: [start_x_position, start_y_position - i * 4, 0],
                rotation: [0, 0, (Math.floor(Math.random() * 10) * Math.PI) / 180],
                color: colorOps[i % colorOps.length],
                size: screenWidth * (5 / 12) - (projects_data[i].key / 2),
                link: "/work/" + projects_data[i].slug
            });
        }

        console.log("blocks:", blocks);
        return blocks;
    }, []); // Empty dependency array = run once

    return <>
        {work_blocks.map((work_block) => (
            <Work_Block
                key={work_block.key}
                workBlock={work_block}
            />

        ))}
    </>
}