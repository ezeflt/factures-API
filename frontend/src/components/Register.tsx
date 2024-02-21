import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

interface UserResponseApi {
  response: boolean;
  message: string;
  user_id: boolean;
}

const Register = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [alert, setAlert] = React.useState("");
  const navigate = useNavigate();

  const register = () => {
    if (!username || !email || !password) {
      setAlert("The input data are empty");
      setTimeout(()=>{
        setAlert("");
      },2000);
      return;
    }

    fetch("http://localhost:3001/user/register", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => response.json())
      .then((userData: UserResponseApi) => {
        localStorage.setItem("userId", `${userData.user_id}`);
        navigate("/invoice");
        setPassword("");
        setAlert("");
        setEmail("");
        setUsername("");
      });
  };

  return (
    <div className="App">
      {alert && (
        <div className="alert">
          <span>{alert}</span>
        </div>
      )}
      <h1>Enregistrez vous</h1>
      <div className="container">
        <div className="inputBox">
          <label htmlFor="">Nom d'utilisateur</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
          />
        </div>
        <div className="inputBox">
          <label htmlFor="">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
        </div>
        <div className="inputBox">
          <label htmlFor="">Mot de passe</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
          />
        </div>
        <button onClick={register}>S'enregistrer</button>
      </div>
    </div>
  );
};

export default Register;
