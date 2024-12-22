import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          <i className="bi bi-journal-bookmark-fill me-2"></i>AssignmentHub
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-uppercase" to="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-uppercase" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-uppercase" to="/contact">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="btn btn-outline-light rounded-pill px-3 py-1 ms-lg-3"
                to="/login"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
