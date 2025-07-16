import projects_content from '../../../content/Projects/projects_content.js'
import { randomColor, randomRotate } from '../../Landing/Click_Shapes_Spawner/ShapesHelpers.jsx';
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
    for (let i = 0; i < projects_content.length; i++) {

        // alternates between the left and right sides of the screen
        if (x_pos_flip == 0){
            start_x_position = -screenWidth / 4

            x_pos_flip = 1
        }

        else {
            start_x_position = screenWidth / 4

            x_pos_flip = 0
        }

        blocks.push({
        key: projects_content[i].key,
        title: projects_content[i].title,
        image: projects_content[i].thumbnail,
        thumb_video: projects_content[i].thumb_video,
        position: [start_x_position, start_y_position - i * 4, 0],
        rotation: [0,0,(Math.floor(Math.random() * 10) * Math.PI) / 180],
        color: colorOps[i % colorOps.length],
        size: screenWidth * (5/12) - (projects_content[i].key / 2),
        });
    }

    console.log("blocks:", blocks);
    return blocks;
    }, []); // Empty dependency array = run once
    
    return <>
    {work_blocks.map((work_block) => (
        <Work_Block key={work_block.key} title={work_block.title} image={work_block.image} video = {work_block.thumb_video} position={work_block.position} rotation={work_block.rotation} color={work_block.color} size={work_block.size}/>    
                
          ))}
    </>
}