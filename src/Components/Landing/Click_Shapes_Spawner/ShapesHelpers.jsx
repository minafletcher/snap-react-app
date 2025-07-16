// function for generating a random string choice from the shapes options array

const shapes = ['box', 'rect', 'sphere', 'triangle'];

export function randomShape() {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

    return randomShape;
}

// function for generating a random color choice from the colors options array

const colors = ['orange', 'red', 'blue', 'mediumpurple'];

export function randomColor() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return randomColor;
}

// generates a random size from 0.5 to 1.5
export function randomSize() {
    const randomSize = (Math.random() * 1) + 0.5;

    return randomSize;
}

// generates a random rotation from 0.5 to 1.5
export function randomRotate() {
    const randomRotate = (Math.floor(Math.random() * 90) * Math.PI) / 180;

    return randomRotate;
}