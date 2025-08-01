// function for generating a random string choice from the shapes options array

// const shapes = ['box', 'blast', "pentagon", 'sphere', 'triangle'];
const shapes = ['blast', "pentagon", "half_circle", "triangle", "oval", "diamond", "teardrop"];

export function randomShape() {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

    return randomShape;
}

// function for generating a random color choice from the colors options array

const colors = ['#FF594E', '#FFBA29', '#70BEF9', '#9F69FF']; // red, orange, blue, purple

export function randomColor() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return randomColor;
}

// generates a random size from 0.5 to 1.5
export function randomSize() {
    const randomSize = (Math.random() * 1.5) + 0.5;

    return randomSize;
}

// generates a random rotation from 0.5 to 1.5
export function randomRotate() {
    const randomRotate = (Math.floor(Math.random() * 180) * Math.PI) / 180;

    return randomRotate;
}