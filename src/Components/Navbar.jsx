import { Link } from 'react-router-dom'
import Logo from '../content/Images/studio_snap_logo.png'

export default function Navbar(){
    return <>
        <div class="navbar-container w-full absolute z-10 top-0">
            <div class="navbar-links flex justify-between items-center nav-padding">
                <Link to="/">WORK</Link>
                <Link to="/"><img src={Logo} class="w-40"/></Link>
                <Link to ="/">ABOUT</Link>
            </div>
        </div>
    </>
}