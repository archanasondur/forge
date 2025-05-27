import {Link} from 'react-router-dom';
import './navbar.css';

function NavBar() {
    return(
        <nav className='navbar'>
            <Link to="/" className="nav-item">Home</Link>
            <Link to="/journey-wall" className="nav-item">Journey Wall</Link>
            <Link to="/job-tracker" className="nav-item">Job Tracker</Link>
            <Link to="/study-plan" className="nav-item">Study Plan</Link>
            <Link to="/contact-us" className="nav-item">Contact Us</Link>
        </nav>
    );
}

export default NavBar;