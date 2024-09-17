import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import loginImageMain from "../assets/img/login.svg";
import googleLogo from "../assets/img/google.svg";
import facebookLogo from "../assets/img/facebook.svg";
import appleLogo from "../assets/img/apple.svg";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlerSubmit = async (e: any) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email: email,
          password: password
      })
    };

    const response = await fetch('http://0.0.0.0:3000/login', requestOptions);
    const data = await response.json();

    if ('token' in data && data.token !== undefined) {
      localStorage.setItem('token', data.token)
      navigate('/explorer')
    }
  }

    return (
      <div className="container-login">
        <div className="img-box">
          <img src={loginImageMain} />
        </div>
        <div className="content-box">
          <div className="form-box">
            <h2>Login</h2>
            <form onSubmit={handlerSubmit}>
              <div className="input-box">
                <span>Usuário</span>
                <input className="input-login" type="email" placeholder="seu@email.com.br" onChange={e => {
                    setEmail(e.target.value)
                }}/>
              </div>

              <div className="input-box">
                <span>Senha</span>
                <input className="input-login" type="password" placeholder="senha" onChange={e => {
                    setPassword(e.target.value)
                }}/>
              </div>

              <div className="input-box">
                <input className="input-login" type="submit" value="Entrar" />
              </div>

              <div className="input-box">
                <p>
                  Não Tem Uma Conta? <a href="/signup">Inscreva-se</a>
                </p>
              </div>
            </form>
            <h3>Logar Com</h3>
            <ul className="ul">
              <li>
                <img src={googleLogo} />
              </li>
              <li>
                <img src={facebookLogo} />
              </li>
              <li>
                <img src={appleLogo} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
}

export default Login;
