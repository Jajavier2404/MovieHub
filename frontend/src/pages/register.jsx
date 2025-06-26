import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    navigate('/login');
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Registro</h2>
      <input placeholder="Usuario" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Contraseña" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Registrar</button>
    </form>
  );
}
export default Register;