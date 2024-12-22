import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Profile = () => {
  const url = "https://assignment-hub-backend.onrender.com/api";

  const [assignments, setAssignments] = useState({}); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledAssignments = async () => {
      try {
        const userId = localStorage.getItem("token");

    
      const response = await axios.post(`${url}/user/profile`, { userId: userId });
        // console.log(response.data); 

        setAssignments(response.data); 
      } catch (err) {
        setError('Failed to fetch assignments. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchEnrolledAssignments();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

 
  return (<>
  <Navbar/>
    <div className="profile-page container mt-5">
    {/* Header Section */}
    <div className="text-center mb-5">
      <h1 className="display-4 fw-bold text-primary">Your Enrolled Assignments</h1>
      <p className="text-muted">Manage and track the progress of your assignments effortlessly</p>
    </div>

    {/* Conditional Rendering for Assignments */}
    {assignments.length === 0 ? (
      <div className="alert alert-warning text-center" role="alert">
        <h5 className="fw-bold">No Assignments Found</h5>
        <p>You have not enrolled in any assignments yet. Start by enrolling in an assignment!</p>
      </div>
    ) : (
      <div className="row g-4">
        {assignments.map((assignment) => (
          <div className="col-md-6 col-lg-4" key={assignment._id}>
            <div className="card h-100 shadow-sm">
              {/* Card Header */}
              <div className="card-header bg-primary text-white text-center py-3">
                <h5 className="card-title mb-0">{assignment.title}</h5>
              </div>
              {/* Card Body */}
              <div className="card-body">
                <p className="card-text">{assignment.body}</p>
                <p className="card-text">
                  <strong>Task:</strong> {assignment.task}
                </p>
                <p className={`card-text ${assignment.status ? 'text-success' : 'text-danger'}`}>
                  <strong>Status:</strong> {assignment.status ? 'Completed' : 'Pending'}
                </p>
              </div>
              {/* Card Footer */}
              <div className="card-footer text-center">
                <button className="btn btn-sm btn-primary me-2"><Link to={`/enroll/${assignment._id}`} style={{ color: 'white', textDecoration: 'none' }}>View Details</Link></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  </>
  );
};

export default Profile;