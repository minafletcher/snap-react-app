import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Plane, Vector2, Vector3, Raycaster } from 'three';
import { randomShape, randomColor, randomSize, randomRotate } from './ShapesHelpers';

// this function is used to detect clicks, and spawn a new shape on click
// clicks are distinguished from drags/moving a shape
export default function ShapesSpawner({ shapeIdRef, setShapes }) {

  // same camera and renderer instance as defined in snapStudio Canvas
  const { viewport, camera, gl } = useThree();

    // viewport width is browser width / 100 (490 = 4.9)
    const screenWidth = viewport.width;
    const screenHeight = viewport.height;

  // tracking mouseDownPos to detect dragging
  const mouseDownPos = useRef(new Vector2());
  const CLICK_THRESHOLD = 1; // threshold of pixels difference for click

  // update the mouseDownPos on mouse down
  const handleMouseDown = useCallback((event) => {
    mouseDownPos.current.set(event.clientX, event.clientY);
  }, []);

  // function for creating raycaster to detect click and mouse position
  // detects when the mouse is dragged vs clicked
  const handleClick = useCallback((event) => {

    // finds distance between mouseDown and click
    const dx = event.clientX - mouseDownPos.current.x;
    const dy = event.clientY - mouseDownPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Considered a drag, not a click
    if (distance > CLICK_THRESHOLD) {
      // exit this function call
      return;
    }

    // get the bounds of the canvas
    const bounds = gl.domElement.getBoundingClientRect();

    // converts mouse position to correct values in the canvas
    const mouse = new Vector2(
      ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      -((event.clientY - bounds.top) / bounds.height) * 2 + 1
    );

    // converts from normalized coordinates to world coordinates
    const unprojectedPoint = new Vector3(mouse.x, mouse.y, 0.985).unproject(camera);

    const choice = randomShape()
    const color = randomColor()
    var size = randomSize()

    if (screenWidth > 7.8) {
      size = Math.min(size * screenWidth * 0.05, 1.25)
    }
    else {
      size = size * screenWidth * 0.1
    }
    
    const rotate = randomRotate()

    console.log("size: " + size)
    setShapes(prev => [
      ...prev,
      {
        id: shapeIdRef.current++,
        position: unprojectedPoint,
        choice: choice,
        color: color,
        size: size,
        rotate: rotate
      }
    ]);

  }, [camera, gl, setShapes, shapeIdRef]);

  // adds event listeners
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mousedown', handleMouseDown);
    return () => {
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('mousedown', handleMouseDown);
    }
  }, [gl, handleMouseDown, handleClick]);

  // shapesSpawner doesn't return anything, just detects for clicks and spawns shapes
  return null;
}