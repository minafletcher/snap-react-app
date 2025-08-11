import projects_data, { featured_projects } from '../../../content/Projects/projects_data.js'
import Work_Block from './Work_Block.jsx'
import { useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function WorkBlocksContainer() {

    const { viewport } = useThree();
    var screenWidth = viewport.width;
    var screenHeight = viewport.height;

    var blockWidth = Math.min(screenWidth / 3, screenHeight / (projects_data.length / 2));
    var blockHeight = blockWidth;

    // const colorOps = ['#70BEF9', '#FFBA29', '#FF594E', '#9F69FF'];
    const shapeOps = ['half_circle', 'pentagon', 'blast', 'triangle']

    // useMemo caches the work_blocks array between re-renders so it doesn't have to recalculate
    const work_blocks = useMemo(() => {
        const blocks = [];
        var start_y_position = screenHeight + 3;

        var x_pos_flip = 0
        var start_x_position = 0

        // add a work block object to the array, with unique values based on priority #
        for (let i = 0; i < featured_projects.length; i++) {

            // alternates between the left and right sides of the screen
            if (x_pos_flip == 0) {

                start_x_position = -blockWidth

                // don't shift down the first block
                if (i != 0) {
                    // keep all blocks at first column in the same row
                    start_y_position = start_y_position - (blockHeight * 2)
                }


                x_pos_flip = 1
            }

            else {
                start_x_position = blockWidth

                x_pos_flip = 0
            }


            blocks.push({
                key: featured_projects[i].key,
                title: featured_projects[i].project.title,
                image: featured_projects[i].project.thumbnail,
                thumb_video: featured_projects[i].project.thumb_video,
                position: [start_x_position, start_y_position, 0],
                rotation: [0, 0, (Math.floor(Math.random() * 10) * Math.PI) / 180],
                // color: colorOps[i % colorOps.length],
                blockHeight: blockHeight,
                blockWidth: blockWidth,
                link: "/work/" + featured_projects[i].project.slug
            });
        }

        console.log("blocks:", blocks);
        return blocks;
    }, []); // Empty dependency array = run once


    useEffect(() => {
        for (let i = 0; i < work_blocks.length; i++) {
            screenWidth = viewport.width;
            screenHeight = viewport.height;

            blockWidth = Math.min(screenWidth / 3, screenHeight / (projects_data.length / 2))
            blockHeight = blockWidth

            work_blocks[i].blockHeight = blockHeight
            work_blocks[i].blockWidth = blockWidth
        }
    }, [viewport.width, viewport.height])

    return <>
        {work_blocks.map((work_block, i) => (
            <Work_Block
                key={work_block.key}
                workBlock={work_block}
                shape={shapeOps[i]}
            />

        ))}
    </>
}