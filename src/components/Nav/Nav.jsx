import { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";

/**
 * 📌 Nav - Navigation for hjemmesiden
 * - Viser menu-links og login/logout-knap
 * - Inkluderer søgefelt og mobilmenu
 * - Bruger `UserContext` til at tjekke brugerstatus
 */
export const Nav = () => {
  // 📌 State til mobilmenuens åben/lukket tilstand
  const [isOpen, setIsOpen] = useState(false);

  // 📌 Hent brugerdata fra context
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  // 📌 Hent brugerdata fra sessionStorage ved genindlæsning af siden
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, [setUserData]);

  // 📌 Logout-funktion
  const handleLogout = () => {
    setUserData(null);
    sessionStorage.removeItem("user"); // 🔹 Fjerner brugerdata fra session
    navigate("/login"); // 🔹 Sender brugeren til login-siden
  };

  return (
    <nav className="navbar navbar-expand-lg bg-black py-3 position-relative">
      <div className="container d-flex justify-content-start" style={{ marginRight: "10rem" }}>

        {/* 🔹 Logo */}
        <div
          className="position-absolute d-none d-lg-block text-white px-4"
          style={{
            top: "50%",
            left: "10%",
            transform: "translateY(-50%)",
            fontSize: "2rem",
            backgroundColor: "#A47130",
          }}
        >
          HomeLands
        </div>

        {/* 🔹 Mobilmenu-knap */}
        <button
          className="navbar-toggler border-0 text-white"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Åbn/luk navigation"
        >
          <FaBars size={30} />
        </button>

        {/* 🔹 Navigation */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""} justify-content-end`}>
          <ul className="navbar-nav gap-lg-5 text-center text-lg-start">
            {/* Forside-link */}
            <li className="nav-item" style={{ fontSize: "1.6rem" }}>
              <NavLink className={({ isActive }) => isActive ? "nav-link text-warning" : "nav-link text-white"} to="/">
                Forside
              </NavLink>
            </li>

            {/* Boliger til salg-link */}
            <li className="nav-item" style={{ fontSize: "1.6rem" }}>
              <NavLink className={({ isActive }) => isActive ? "nav-link text-warning" : "nav-link text-white"} to="/boliger">
                Boliger til salg
              </NavLink>
            </li>

            {/* 🔹 Vis kun Admin-link, hvis brugeren er logget ind */}
            {userData && (
              <li className="nav-item" style={{ fontSize: "1.6rem" }}>
                <NavLink className={({ isActive }) => isActive ? "nav-link text-warning" : "nav-link text-white"} to="/admin">
                  Admin
                </NavLink>
              </li>
            )}

            {/* 🔹 Login/Logout-knap */}
            <li className="nav-item" style={{ fontSize: "1.6rem" }}>
              {userData ? (
                <button onClick={handleLogout} className="btn btn-warning">Logout</button>
              ) : (
                <NavLink className="nav-link text-white" to="/login">Login</NavLink>
              )}
            </li>
          </ul>

          {/* 🔹 Søgefelt */}
          <form className="d-flex ms-lg-5 mt-3 mt-lg-0 position-relative" style={{ maxWidth: "250px" }}>
            <input type="text" className="form-control ps-5" placeholder="Indtast søgeord" />
            <button className="position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent px-3">
              <FaSearch color="#666" />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};
