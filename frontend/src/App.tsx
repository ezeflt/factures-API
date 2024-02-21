import React from "react";
import "./App.css";
import Invoice from "./components/Invoice";
import { useNavigate } from "react-router-dom";

function App() {
  const user_id = localStorage.getItem("userId");
  const navigate = useNavigate();

  if (!user_id) {
    navigate("/");
  }

  return (
    <div className="App">
      <Invoice />
    </div>
  );
}

export default App;
