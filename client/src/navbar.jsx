import { Link } from 'react-router-dom';
import './navbar.css';

function NavBar() {
    return (
        <nav className='navbar'>
            <Link to="/dashboard" className="nav-logo">
                <img src="/forge-icon.png" alt="Forge logo" className="logo-icon" />
            </Link>

            <Link to="/dashboard" className="nav-item">Dashboard</Link>
            <Link to="/job-tracker" className="nav-item">Job Tracker</Link>
            <Link to="/interview-lab" className="nav-item">Interview Lab</Link>
        </nav>
    );
}

export default NavBar;