/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = (props) => {
  const url = "https://assignment-hub-backend.onrender.com/api";

  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [assignments, setAssignments] = useState([]);
  const [SpecificAssignment, setSpecificAssignments] = useState([]);
  const [token, setToken] = useState();
  const [isAuthentication, setIsAuthenticated] = useState(false);

  //all assignment
  useEffect(() => {
    const fetchAssignments = async () => {
      const api = await axios.get(`${url}/assignment/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      // console.log(api);
      setAssignments(api.data.assignment);
    };
    fetchAssignments();
    // authenticated();
  });

  //get specific assignment
  const getAssignment = async (id) => {
    const api = await axios.get(`${url}/assignment/${id}`, {
      headers: {
        "Content-Type": "Application/json",
      },
      withCredentials: true,
    });
    setSpecificAssignments(api.data.assignment);
  };

  // register user
  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    // alert(api.data.message)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    return api.data;
    // console.log("user register ",api)
  };

  // login user
  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    // alert(api.data.message)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    // console.log("user login ",api.data.user._id)
    setToken(api.data.user._id);
    setIsAuthenticated(true);
    // console.log("logged in" isAuthentication)
    localStorage.setItem("token", api.data.user._id);
    return api.data;
  };

  //   // logout user
  const logout = () => {
    setIsAuthenticated(false);
    // setToken(" ");
    localStorage.removeItem("token");
    toast.success("Logout Successfully...!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const authenticated = async () => {
    const api = await axios.get(`${url}/middleware/protected`, (req, res) => {
      res.json({ message: "This is a protected route", user: req.user });
    });
    setIsAuthenticated(true);
  };

  return (
    <AppContext.Provider
      value={{
        register,
        login,
        logout,
        getAssignment,
        user,
        isAuthentication,
        assignments,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
