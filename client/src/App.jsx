import { Routes, Route, useNavigate } from 'react-router-dom';
import JourneyWall from './JourneyWall';
import './App.css';

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/journey');
  };

  return (
    <div className="app-container">
      <h1>Forge</h1>
      <p className="tagline">Built for the ones who are forging their path, not just following it.</p>
      <button className="start-button" onClick={handleClick}>
        Get Started
      </button>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/journey" element={<JourneyWall />} />
    </Routes>
  );
}

export default App;
