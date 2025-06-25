import {useNavigate} from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate('/journey-wall');
    };
  
    return (
      <div className="app-container">
        <h1>Forge</h1>
        {/* <img src="/fo-go.png" alt="Forge logo" className="logo-icon" /> */}
        <p className="tagline">Built for the ones who are forging their path, not just following it.</p>
        <button className="start-button" onClick={handleClick}>
          Get Started
        </button>
      </div>
    );
}

export default Home;

