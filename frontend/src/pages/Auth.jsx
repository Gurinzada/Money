import styles from "../styles/authComponents/Auth.module.scss";

import MainContainer from "../components/Containers/MainContainer";
import { Title } from "../components/Titles/Titles";

import { useState, useEffect } from "react";

import { useLoginUser, useRegisterUser } from "../queries/user";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

const Auth = () => {
  // LOGIN
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  // REGISTER
  const [regEmail, setRegEmail] = useState("");
  const [regPw, setRegPw] = useState("");
  // CONTEXT
  const { auth, setAuth } = useContext(AuthContext);
  // NAVIGATE
  const navigate = useNavigate();

  let body = {
    email: email,
    password: pw,
  };

  let regBody = {
    email: regEmail,
    password: regPw,
  };

  const {
    mutate: loginHandler,
    isError: loginError,
    error: loginErr,
  } = useLoginUser();

  const {
    mutateAsync: registerHandler,
    isSuccess: registerSucc,
    isError: registerError,
    error: registerErr,
  } = useRegisterUser();

  useEffect(() => {
    if (auth) navigate("/");
  });

  return (
    <MainContainer data-cy="auth-container">
      {/* LOGIN */}
      <form action="submit" onSubmit={(e) => e.preventDefault()}>
        <div className={styles.container} data-cy="login-form">
          <Title data-cy="login-title">Login</Title>
          <span>Email :</span>
          <input
            type="email"
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            data-cy="login-email-input"
          />
          <span>Password :</span>
          <input
            type="password"
            onChange={(e) => setPw(e.target.value)}
            value={pw}
            autoComplete="password"
            data-cy="login-password-input"
          />

          {/* LOGIN BTN */}
          <button
            onClick={() =>
              loginHandler(body, {
                onError: () => {
                  console.log(loginErr);
                },
                onSuccess: () => setAuth(true),
              })
            }
            data-cy="login-button"
          >
            Login
          </button>
        </div>
      </form>

      {/* REGISTER FORM */}
      <form
        action="submit"
        onSubmit={(e) => e.preventDefault()}
        className={styles.registerForm}
        data-cy="register-form"
      >
        <div className={styles.container}>
          <Title data-cy="register-title">Cadastrar</Title>
          <span>Email :</span>
          <input
            type="email"
            onChange={(e) => setRegEmail(e.target.value)}
            value={regEmail}
            autoComplete="email"
            data-cy="register-email-input"
          />
          <span>Password :</span>
          <input
            type="password"
            onChange={(e) => setRegPw(e.target.value)}
            value={regPw}
            autoComplete="new-password"
            data-cy="register-password-input"
          />

          {/* REGISTER BTN */}
          <button
            onClick={() =>
              registerHandler(regBody, {
                // ONSUCCESS USE LOGINHANDLER
                onSuccess: () => {
                  loginHandler(regBody, {
                    onSuccess: () => setAuth(true),
                    onError: () => {
                      console.log(loginErr);
                    },
                  });
                },
              })
            }
            data-cy="register-button"
          >
            Cadastrar
          </button>
          {/* ADD ERROR */}
        </div>
      </form>
    </MainContainer>
  );
};

export default Auth;
