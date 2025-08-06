import { Link } from 'react-router-dom'
import Logo from '../content/Images/studio_snap_logo.png'
import { useLocation } from 'react-router-dom'

export default function Navbar({ setClickShapes }) {

    const location = useLocation();
    const currentPage = location.pathname;

    const clearCanvas = () => {

        setClickShapes(prev => [])
    }

    return <>
        <div className="navbar-container w-full absolute z-10 top-0">
            <div className="navbar-links flex justify-between items-center page-padding pt-10">
                <Link className="nav-link" to="/work">Work</Link>
                {currentPage == "/home" ? <img onClick={clearCanvas} src={Logo} className="w-40 cursor-pointer" />
                    : <Link to="/home" ><img src={Logo} className="md:w-40 w-28" /></Link>}
                <Link className="nav-link" to="/about">About</Link>
            </div>
        </div>
    </>
}