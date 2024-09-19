import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../styles/Login.css";
import signupImageMain from "../assets/img/sign_up.svg";
import { Api } from "../services/api";

function Signup() {
  const [username, setUsername] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [passwordConfirm, setPasswordConfirm] = useState<String>("");
  const navigate = useNavigate();

  const handlerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username) {
      toast.warning("Opa! Informe o nome do usuário!");
    } else if (!email) {
      toast.warning("Opa! Informe o email!");
    } else if (!password || password !== passwordConfirm) {
      toast.error("Opa! As senhas devem ser iguais!");
    } else {
      try {
        const data = await Api.post("signup", {
          user: {
            username: username,
            email: email,
            password: password,
            password_confirmation: passwordConfirm,
          },
        });

        if (data.status === 200) {
          toast.success("Usuário criado! Você será redirecionado para o login!",  {
            onClose: () => {
              navigate("/login");
            }
          });
        }
      } catch (error) {
        toast.error("Ocorreu um erro ao criar o usuário");
      }
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <div className="container-login">
        <div className="img-box">
          <img src={signupImageMain} alt="Signup"/>
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
                  placeholder="informe seu usuário"
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
                  placeholder="email@host.com"
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
                  placeholder="informe sua senha"
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
                  placeholder="confirme sua senha"
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
    </>
  );
}

export default Signup;
