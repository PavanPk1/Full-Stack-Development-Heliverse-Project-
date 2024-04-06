import "./index.css";
import { Link } from "react-router-dom";

const Navbar = () => (
  <div className="navbar">
    <Link to="/" className="link">
      <h1 className="heading">Heliverse</h1>
    </Link>
    <div className="nav-links">
      <Link to="/" className="link">
        <button type="button" className="nav-link">
          Home
        </button>
      </Link>
      <Link to="/team" className="link">
        <button type="button" className="nav-link">
          Team
        </button>
      </Link>
    </div>
  </div>
);
export default Navbar;
