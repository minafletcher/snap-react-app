import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState, useRef } from 'react'
import Landing from "./Components/Landing/Landing";
import Navbar from "./Components/Navbar";
import CanvasExperience from "./CanvasExperience";

import About from "./Components/About/About";
import Work from "./Components/Work/Work";

export default function SnapStudio()
{

    const [shapes, setShapes] = useState([]);
    const shapeIdRef = useRef(0);

    // fade out the "click here to create" text
      const [fadeOut, setFadeOut] = useState(false);
    
      const fade = () => {
        setFadeOut(true);
      };


    return <>

    <Router>
          <div className="relative w-full h-full">
          <div class="absolute z-10 w-full h-full" onClick={fade}>
            <CanvasExperience shapeIdRef={shapeIdRef} shapes={shapes} setShapes={setShapes}/>
          </div>
          <Navbar setShapes={setShapes} />
    
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