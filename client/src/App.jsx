import { Routes, Route } from 'react-router-dom';
import JourneyWall from './JourneyWall';
import './App.css';
import NavBar from './navbar';
import StudyPlan from './StudyPlan';
import JobTracker from './JobTracker';
import ContactUs from './ContactUs';
import Home from './Home';


function App() {
  return (
    <>
      <NavBar />
      <main className="route-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journey-wall" element={<JourneyWall />} />
          <Route path="/job-tracker" element={<JobTracker />} />
          <Route path="/study-plan" element={<StudyPlan />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
