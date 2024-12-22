import  { useContext } from 'react';
import AppContext from '../context/AppContext';
import Navbar from './Navbar';

const Home = () => {
  const { assignments } = useContext(AppContext);

  return (
    <>
      <Navbar />
      <div className="container mt-4 ">
        <h1 className="text-center text-primary mb-4">Assignments</h1>
        <div className="row ">
          {assignments.length > 0 ? ( // Check if assignments array is not empty
            assignments.map((assignment) => (
              <div className="col-md-4 mb-4" key={assignment._id}>
                <div className="card shadow-lg border-dark">
                  <div className="card-body">
                    <h3 className="card-title text-success">{assignment.title}</h3>
                    <p className="card-text"><strong>Body:</strong> {assignment.body}</p>
                    <p className="card-text"><strong>Task:</strong> {assignment.task}</p>
                    <p className="card-text">
                      <small className="text-muted"><strong>Created At:</strong> {new Date(assignment.created_at).toLocaleDateString()}</small>
                    </p>
                    <p className="card-text text-warning">Assignment is valid up to ten days from creation.</p>
                    <a href={`/assignment/${assignment._id}`} className="btn btn-primary">View Details</a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-danger text-center">No assignments found.</p> {/* Message when no assignments are available */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;