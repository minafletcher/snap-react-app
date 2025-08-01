import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState, useRef } from 'react'
import Landing from "./Components/Landing/Landing";
import Navbar from "./Components/Navbar";
import CanvasExperience from "./CanvasExperience";
import ProjectPage from "./Components/Work/Project_Page_Templates/Project_Page_Sm";

import About from "./Components/About/About";
import Work from "./Components/Work/Work";
import projects_data from "./content/Projects/projects_data";

export default function SnapStudio() {

    // LIST OF CLICK SHAPES FOR LANDING PAGE for rendering all shapes
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
            <div className="absolute z-10 w-full h-full invisible" onClick={fade}>
                <CanvasExperience shapeIdRef={clickShapeIdRef} shapes={click_shapes} setShapes={setClickShapes} />
            </div>
            <Navbar setClickShapes={setClickShapes} />

            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Landing fadeOut={fadeOut} />} />
                <Route path="/about" element={<About />}></Route>
                <Route path="/work" element={<Work />}></Route>

                {projects_data.map((project) => (
                    <Route key={project.key} path={`/work/${project.slug}`} element={<ProjectPage title={project.title} content={project.content} />}></Route>
                ))}
            </Routes>
        </Router>
    </>
}