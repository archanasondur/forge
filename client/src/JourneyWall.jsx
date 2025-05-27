import {useNavigate} from 'react-router-dom';

function JourneyWall() {
    const navigate = useNavigate();

    const gohome = () => {
        navigate('/');
    }

    const blogPosts = [
      {
        id: 1,
        title: "From Rejections to Offers",
        category: "Journeys",
        author: "Aarav Sharma",
        summary: "I got 12 rejections before I finally cracked an internship. Here’s what helped."
      },
      {
        id: 2,
        title: "3-Month DSA Grind Plan",
        category: "Roadmaps",
        author: "Sara Thomas",
        summary: "This is exactly how I structured my daily Leetcode routine for 90 days."
      },
      {
        id: 3,
        title: "Resume Edits That Got Me Interviews",
        category: "Tips",
        author: "Riya Jain",
        summary: "Rewriting my resume 6 times taught me what matters most to recruiters."
      }
    ];    

    return (
      <div className="app-container">
        <h1>JourneyWall</h1>
        <p>This is where inspiring career stories will live.</p>

        <div className="blog-list">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-card">
              <h3><b>Blog - </b>{post.title}</h3>
              <p><strong>{post.category}</strong> · by {post.author}</p>
              <p>{post.summary}</p>
            </div>
          ))}
        </div>

        <button className="start-button" onClick={gohome}>
            Go Back
        </button>
      </div>
    );
  }
  
  export default JourneyWall;
  