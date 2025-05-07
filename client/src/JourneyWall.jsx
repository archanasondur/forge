import {useNavigate} from 'react-router-dom';

function JourneyWall() {
    const navigate = useNavigate();

    const gohome = () => {
        navigate('/');
    }

    return (
      <div className="app-container">
        <h2>JourneyWall</h2>
        <p>This is where inspiring career stories will live.</p>
        <button className="start-button" onClick={gohome}>
            go back
        </button>
      </div>
    );
  }
  
  export default JourneyWall;
  