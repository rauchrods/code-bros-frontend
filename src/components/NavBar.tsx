import { Link, useLocation } from "react-router-dom";
import "./NavBar.scss";
import { Code } from "lucide-react";

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = "" }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className={`navbar ${className}`}>
      <Link to="/" className="navbar-logo">
        <Code color="#6366f1" strokeWidth={3} size={28} />
        <span className="logo-text">CodeBro's</span>
      </Link>

      <div className="navbar-nav">
        <Link to="/" className={`nav-link ${isHomePage ? "active" : ""}`}>
          Problems
        </Link>

        {!isHomePage && (
          <div className="nav-breadcrumb">
            <span className="breadcrumb-separator">/</span>
            <span className="current-problem">
              {location.pathname.split("/").pop()}
            </span>
          </div>
        )}
      </div>

      <div className="navbar-actions">
        <a
          href="https://github.com/rauchrods"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link external"
          title="View on GitHub"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
