import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";

function Register() {
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState("");
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:3000/api/v1/auth/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur serveur");

      localStorage.setItem("token", data.token);
      navigate('/profil')

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header>
        <a href="/">Artly</a>
        <Navbar />
      </header>
      <main>
        <section>
          <form className="register-form" onSubmit={handleSubmit}>
            <h1>S'inscrire</h1>
            <input
              type="text"
              name="name"
              placeholder="name"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              onChange={handleChange}
              required
            />

            {error && <p>{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Inscription..." : "S'inscrire"}
            </button>

            <p>
              Se connecter ? <Link to="/login">Se connecter</Link>
            </p>

            <Link to="/forgot-password">Mot de passe oublié ?</Link>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Register;
