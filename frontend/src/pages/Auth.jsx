import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
export function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [err, setErr] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    try {
      const r = await api.post(
        "/auth/login",
        Object.fromEntries(new FormData(e.target)),
      );
      login(r.data);
      nav("/");
    } catch (x) {
      setErr(x.response?.data?.message || "Login failed");
    }
  };
  return (
    <section className="auth">
      <form onSubmit={submit}>
        <h1>Login</h1>
        {err && <p className="error">{err}</p>}
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <button className="btn">Login</button>
        <p>
          New user? <Link to="/register">Create account</Link>
        </p>
      </form>
    </section>
  );
}
export function Register() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [err, setErr] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    try {
      const r = await api.post(
        "/auth/register",
        Object.fromEntries(new FormData(e.target)),
      );
      login(r.data);
      nav("/");
    } catch (x) {
      setErr(x.response?.data?.message || "Registration failed");
    }
  };
  return (
    <section className="auth">
      <form onSubmit={submit}>
        <h1>Create Account</h1>
        {err && <p className="error">{err}</p>}
        <input name="name" placeholder="Full name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          minLength="6"
          placeholder="Password (6+ chars)"
          required
        />
        <button className="btn">Register</button>
        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
}
