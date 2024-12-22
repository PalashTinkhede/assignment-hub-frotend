import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AppContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await login(email, password);

    if (!result.success) {
      alert("Invalid email or password");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-5">
          <div
            className="card shadow-lg border-0"
            style={{ borderRadius: "15px" }}
          >
            <div
              className="card-header text-center text-white"
              style={{
                background: "linear-gradient(135deg, #007bff, #6610f2)",
                borderRadius: "15px 15px 0 0",
              }}
            >
              <h4 className="fw-bold">Welcome Back</h4>
              <p className="mb-0">Login to your account</p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="mb-4">
                  <label htmlFor="email" className="form-label fw-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control p-2"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-bold">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control p-2"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-bold py-2"
                  style={{ borderRadius: "8px" }}
                >
                  Login
                </button>
              </form>

              {/* Register Link */}
              <p className="mt-4 text-center">
                Don&apos;t have an account?{" "}
                <a href="/register" className="text-primary fw-bold">
                  Register Here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
