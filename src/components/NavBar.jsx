import { Link } from "react-router-dom";
import { useAuth } from "./Auth"; // ✅ Import authentication context
import "../css/Navbar.css";

function NavBar() {
    const { user, logout } = useAuth(); // ✅ Get user & logout function

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Movie App</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
                
                {user ? (
                    <>
                        <span className="nav-user">Welcome, {user.email}</span>
                        <button className="nav-button" onClick={logout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="nav-button">Login</Link>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
