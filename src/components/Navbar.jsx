import { Link } from "react-router-dom"

function Navbar() {
    return(
        <nav className="navbar">
            <Link to="/">Accueil</Link>
            <Link to="/login">Se connecter</Link>
        </nav>
    )
}

export default Navbar