import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const Register = () => {
  const { register } = useContext(AppContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    
    const result = await register(name, email, password);

    if (result.success) {
      navigate("/login");
    }

    // console.log(formData);
  };
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-5">
          <div
            className="card shadow-lg border-0"
            style={{ borderRadius: '15px' }}
          >
            <div
              className="card-header text-center text-white"
              style={{
                background: 'linear-gradient(135deg, #28a745, #20c997)',
                borderRadius: '15px 15px 0 0',
              }}
            >
              <h4 className="fw-bold">Create an Account</h4>
              <p className="mb-0">Join us to get started</p>
            </div>
            <div className="card-body">
              <form onSubmit={submitHandler}>
                {/* Name Field */}
                <div className="mb-4">
                  <label htmlFor="name" className="form-label fw-bold">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control p-2"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

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
                    placeholder="Create a strong password"
                    required
                  />
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  className="btn btn-success w-100 fw-bold py-2"
                  style={{ borderRadius: '8px' }}
                >
                  Register
                </button>
              </form>

              {/* Login Link */}
              <p className="mt-4 text-center">
                Already have an account?{' '}
                <a href="/login" className="text-success fw-bold">
                  Login Here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
