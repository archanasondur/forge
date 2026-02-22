import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import NavBar from './navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import JobTracker from './pages/JobTracker/JobTracker';
import InterviewLab from './pages/InterviewLab/InterviewLab';
import TopicDetail from './pages/InterviewLab/TopicDetail';
import ContactUs from './ContactUs';


function App() {
  return (
    <div className="app-container">
      <NavBar />
      <main className="route-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/job-tracker" element={<JobTracker />} />
          <Route path="/interview-lab" element={<InterviewLab />} />
          <Route path="/interview-lab/:topicId" element={<TopicDetail />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
