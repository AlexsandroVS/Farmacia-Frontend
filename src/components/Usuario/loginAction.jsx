import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const auth = useAuth();

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      await auth.loginAction(input); // Espera la acción de inicio de sesión
    } else {
      alert("Por favor, proporciona un input válido");
    }
  };

  return (
    <form onSubmit={handleSubmitEvent}>
      <input
        type="text"
        placeholder="Username"
        value={input.username}
        onChange={(e) => setInput({ ...input, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={input.password}
        onChange={(e) => setInput({ ...input, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
