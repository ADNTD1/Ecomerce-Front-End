import React, { useState } from "react";
import "../styles/SignIn.css";

const Signinform: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("https://localhost:7192/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "", // se envía como string vacío
          email,
          password,
          fullName,
        }),
      });

      const contentType = response.headers.get("content-type");
      const rawBody = await response.text();

      if (!response.ok) {
        throw new Error(rawBody || "Error en el registro");
      }

      let data: string | { message?: string } = {};
      try {
        if (contentType && contentType.includes("application/json")) {
          data = JSON.parse(rawBody);
        } else {
          data = rawBody;
        }
      } catch {
        data = rawBody;
      }

      console.log("Respuesta del servidor:", data);

      if (typeof data === "object" && data !== null && "message" in data) {
        setMessage(data.message || "Cuenta creada con éxito");
      } else if (typeof data === "string") {
        setMessage(data);
      } else {
        setMessage("Cuenta creada con éxito");
      }

      // Limpiar formulario
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error en la solicitud:", error.message);
        setMessage("Error al registrar el usuario: " + error.message);
      } else {
        console.error("Error desconocido:", error);
        setMessage("Ocurrió un error desconocido al registrar el usuario.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <form className="modern-form" onSubmit={handleSubmit}>
        <div className="form-title">Regístrate</div>
        <div className="form-body">
          <div className="input-group">
            <input
              required
              placeholder="Nombre completo"
              className="form-input"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              required
              placeholder="Email"
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              required
              placeholder="Contraseña"
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="submit-button" type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Crear cuenta"}
        </button>
        {message && <div className="success-message">{message}</div>}
      </form>
    </div>
  );
};

export default Signinform;
