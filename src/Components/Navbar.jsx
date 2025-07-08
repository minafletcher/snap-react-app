import { Link } from 'react-router-dom'
import Logo from '../content/Images/studio_snap_logo.png'
import { useLocation } from 'react-router-dom'

export default function Navbar({setShapes}){

    const location = useLocation();
    const currentPage = location.pathname;

    const clearCanvas = () => {

        console.log(currentPage)

      setShapes(prev => [])
    }

    return <>
        <div class="navbar-container w-full absolute z-10 top-0">
            <div class="navbar-links flex justify-between items-center nav-padding">
                <Link to="/work">WORK</Link>
                {currentPage=="/home" ? <img onClick={clearCanvas} src={Logo} class="w-40"/>
                : <Link to="/home" onClick={clearCanvas}><img src={Logo} class="w-40"/></Link>}
                <Link to ="/about">ABOUT</Link>
            </div>
        </div>
    </>
}