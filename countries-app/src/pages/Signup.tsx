import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import signupImageMain from '../assets/img/sign_up.svg';

function Signup() {
  const [username, setUsername] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [passwordConfirm, setPasswordConfirm] = useState<String>("");
  const navigate = useNavigate();

  const handlerSubmit = async (e: any) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          email: email,
          password: password,
          password_confirmation: passwordConfirm,
        },
      }),
    };

    const statusCode = await fetch("http://0.0.0.0:3000/signup", requestOptions).then((response) => {
      return response.status;
    });

    if(statusCode === 200) {
      navigate("/login");
    }
  };

  return (
    <div className="container-login">
      <div className="img-box">
        <img src={signupImageMain} />
      </div>
      <div className="content-box">
        <div className="form-box">
          <h2>Cadastre-se</h2>
          <form onSubmit={handlerSubmit}>
            <div className="input-box">
              <span>Usuário</span>
              <input
                className="input-login"
                type="text"
                placeholder="usuário"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>

            <div className="input-box">
              <span>Email</span>
              <input
                className="input-login"
                type="email"
                placeholder="digite seu email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="input-box">
              <span>Senha</span>
              <input
                className="input-login"
                type="password"
                placeholder="senha"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="input-box">
              <span>Confirmar Senha</span>
              <input
                className="input-login"
                type="password"
                placeholder="confirmar senha"
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                }}
              />
            </div>

            <div className="input-box">
              <input className="input-login" type="submit" value="Entrar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
