import { useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import projects_data, { featured_projects } from '../../../content/Projects/projects_data.js';
import Work_Block from './Work_Block.jsx';

export default function WorkBlocksContainer() {
    const { viewport } = useThree();

    const shapeOps = ['blast', 'pentagon', 'half_circle', 'triangle'];

    const work_blocks = useMemo(() => {
        const screenWidth = viewport.width;
        const screenHeight = viewport.height;

        const blockWidth = Math.min(screenWidth / 3, screenHeight / 3);
        const blockHeight = blockWidth;

        const blocks = [];

        const rowGap = blockHeight * 1.5; // vertical space between rows
        const colGap = blockWidth * 1.5; // horizontal space between columns

        let startY, col, row, x, y;
        for (let i = 0; i < featured_projects.length; i++) {

            // responsive placement for 
            if (screenWidth >= 4.81) {
                startY = screenHeight + blockHeight;
                col = i % 2; // 0 = left, 1 = right
                row = Math.floor(i / 2);

                x = col === 0 ? -colGap / 2 : colGap / 2;
            }

            else {
                startY = screenHeight + blockHeight * (featured_projects.length - 1);
                row = i;

                x = 0;
            }

            y = startY - row * rowGap;

            blocks.push({
                key: featured_projects[i].key,
                title: featured_projects[i].project.title,
                image: featured_projects[i].project.thumbnail,
                thumb_video: featured_projects[i].project.thumb_video,
                position: [x, y, 0],
                // rotation: [0, 0, (Math.floor(Math.random() * 10) * Math.PI) / 180],
                rotation: [0, 0, 0],
                blockHeight: blockHeight,
                blockWidth: blockWidth,
                shape: shapeOps[i],
                link: "/work/" + featured_projects[i].project.slug
            });
        }

        return blocks;
    }, []);

    return (
        <>
            {work_blocks.map((work_block) => (
                <Work_Block
                    key={work_block.key}
                    workBlock={work_block}
                    shape={work_block.shape}
                />
            ))}
        </>
    );
}