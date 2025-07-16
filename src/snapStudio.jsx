import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState, useRef } from 'react'
import Landing from "./Components/Landing/Landing";
import Navbar from "./Components/Navbar";
import CanvasExperience from "./CanvasExperience";

import About from "./Components/About/About";
import Work from "./Components/Work/Work";

export default function SnapStudio() {

    // LIST OF CLICK SHAPES FOR LANDING PAGE
    const [click_shapes, setClickShapes] = useState([]);
    const clickShapeIdRef = useRef(0);

    // fade out the "click here to create" text
    const [fadeCounter, setFadeCounter] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    const fade = () => {

        if (fadeCounter == 0) {
            setFadeOut(true)
            setFadeCounter(1)
        }
    };


    return <>

        <Router>
            <div className="relative w-full h-full">
                <div class="absolute z-10 w-full h-full" onClick={fade}>
                    <CanvasExperience shapeIdRef={clickShapeIdRef} shapes={click_shapes} setShapes={setClickShapes} />
                </div>
                <Navbar setClickShapes={setClickShapes} />

                <Routes>
                    <Route path="/" element={<Landing fadeOut={fadeOut} />}></Route>
                    <Route path="*" element={<Landing fadeOut={fadeOut} />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/work" element={<Work />}></Route>
                </Routes>
            </div>
        </Router>
    </>
}