import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/journey-wall');
  };

  return (
    <div className="home-container">
      <div className="home-title-container">
        <img src="/forge-icon.png" alt="Forge logo" className="home-logo" />
        <h1>Forge</h1>
      </div>
      <p className="tagline">Built for the ones who are forging their path, not just following it.</p>
      <button className="start-button" onClick={handleClick}>
        Get Started
      </button>
    </div>
  );
}

export default Home;

