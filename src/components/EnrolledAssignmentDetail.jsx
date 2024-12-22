/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const EnrolledAssignmentDetail = () => {
  const url = "https://assignment-hub-backend.onrender.com/api";

  const { id } = useParams(); // Get the assignment ID from the URL parameters
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        const response = await axios.post(
          `${url}/assignment/enrolled`,
          {
            assignmentId: id,
          }
        );
        setAssignment(response.data.assignment);
        // console.log(response.data.assignment)// Set the assignment details in state
      } catch (err) {
        setError("Failed to fetch assignment details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchAssignmentDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  if (!assignment) {
    return <div>No assignment found.</div>; // Handle case where assignment is not found
  }

  const completeHandler = async () => {
    const response = await axios.post(
      `${url}/assignment/status`,
      {
        assignmentId: id,
      }
    );
    navigate("/profile");
  };
  return (
    <>
      <Navbar />
      <div className="assignment-detail-page container mt-5">
        <div
          className="text-center p-5 mb-4"
          style={{
            background: "linear-gradient(135deg, #007bff, #6610f2)",
            color: "#fff",
            borderRadius: "10px",
          }}
        >
          <h1 className="display-4 fw-bold">{assignment.title}</h1>
          <p className=" font-lg">
            Get all the details about your assignment below
          </p>
        </div>

        <div
          className="card shadow-lg border-0"
          style={{ borderRadius: "15px" }}
        >
          <div className="card-body p-4">
            <p className="card-text">
              <strong>Description:</strong> {assignment.body}
            </p>
            <p className="card-text">
              <strong>Task:</strong> {assignment.task}
            </p>
            <p
              className={`card-text ${
                assignment.status ? "text-success" : "text-danger"
              }`}
            >
              <strong>Status:</strong>{" "}
              {assignment.status ? "Completed" : "Pending"}
            </p>
            <p className="card-text">
              <strong>Created At:</strong>{" "}
              {new Date(assignment.created_at).toLocaleDateString()}
            </p>
          </div>
          <div
            className="card-footer text-center"
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "0 0 15px 15px",
            }}
          >
            <button
              className="btn btn-primary me-2"
              onClick={() => window.history.back()}
            >
              Back to Assignments
            </button>
            <button className="btn btn-secondary" onClick={completeHandler}>
              Mark as Complete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnrolledAssignmentDetail;
