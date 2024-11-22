import React, { useState } from "react";
import './styles.css';
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://bienesraicesweb.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Guarda el token
        window.location.href = "https://bienesraicesweb-1.onrender.com";
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error al iniciar sesión");
    }
  };

  return (
    <div className="login-form">
   <h2>Iniciar Sesión</h2>
   <form onSubmit={handleLogin}>
     <input
       type="text"
       placeholder="Usuario"
       value={username}
       onChange={(e) => setUsername(e.target.value)}
     />
     <input
       type="password"
       placeholder="Contraseña"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
     />
     <button type="submit">Entrar</button>
   </form>
   {error && <p className="error-message">{error}</p>}
</div>
  );
};

export default Login;
