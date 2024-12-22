/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const AssignmentPage = () => {
  const url = "https://assignment-hub-backend.onrender.com/api";

  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(
          `${url}/assignment/${id}`
        );
        setAssignment(response.data);
      } catch (err) {
        setError("Error fetching assignment data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [id]);

  const handleEnroll = async () => {
    try {
      const userId = localStorage.getItem("token");

      // console.log(userId);
      const response = await axios.post(
        `${url}/assignment/enroll/${id}`,
        { userId: userId }
      );
      if (!response) {
        alert(response.message);
      }
      alert("enrolled in the assignment");
    } catch (err) {
      alert("Please login first");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  if (error)
    return (
      <div className="text-danger text-center mt-5">
        <h4>{error}</h4>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div
          className="text-center py-5"
          style={{
            background:
              "linear-gradient(135deg,rgba(0, 255, 55, 0.82), #6610f2)",
            color: "#fff",
            borderRadius: "10px",
          }}
        >
          <h1 className="display-4 font-weight-bold ">{assignment.title}</h1>
          <p className="lead mt-3">
            Discover details about this assignment below
          </p>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-lg-10">
            <div
              className="card shadow-lg border-0"
              style={{ borderRadius: "15px" }}
            >
              <div
                className="card-header text-white"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(4, 0, 255, 0.94),rgb(242, 16, 27))",
                  borderRadius: "15px 15px 0 0",
                }}
              >
                <h5 className="mb-0">Assignment Details</h5>
              </div>
              <div className="card-body">
                <h5 className="card-title mb-4">{assignment.title}</h5>
                <p className="card-text">{assignment.body}</p>
                <div className="alert alert-info mt-4" role="alert">
                  <strong>Task:</strong> {assignment.task}
                </div>
                <p className="card-text mt-4">
                  <small className="text-muted">
                    Created At:{" "}
                    {new Date(assignment.created_at).toLocaleDateString()}
                  </small>
                </p>
              </div>
              <div
                className="card-footer text-end"
                style={{
                  borderRadius: "0 0 15px 15px",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <button className="btn btn-primary me-2" onClick={handleEnroll}>
                  Enroll
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => window.history.back()}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignmentPage;
