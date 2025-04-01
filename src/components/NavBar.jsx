import { Link } from "react-router-dom";
import { useAuth } from "./Auth"; // ✅ Import authentication context
import { useState } from "react"; // ✅ Manage state for mobile menu
import "../css/Navbar.css";

function NavBar() {
    const { user, logout } = useAuth() || {};
    const [menuOpen, setMenuOpen] = useState(false);  // ✅ Mobile menu state

    return (
        <nav className="navbar">
            {/* ✅ Clickable Movie Search logo */}
            <Link className="navbar-brand" to="/">Movie Search</Link>

            {/* ✅ Mobile Toggle Button */}
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>

            {/* ✅ Navbar Links (Toggle for Mobile) */}
            <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>

                {user ? (
                    <>
                        <span className="nav-user">Welcome, {user.email}</span>
                        <button className="nav-button nav-link" onClick={logout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="nav-button nav-link">Login</Link>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
