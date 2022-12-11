/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { Post } from "../../services/Conection";

import "./styles.css";

import useUser from "../../hooks/useUser";
import { getItem, setItem } from "../../utils/Storage";

export default function LoginPage() {
  const { openToast } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  function handleFormValue(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // eslint-disable-next-line consistent-return
  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.email || !form.senha) {
      return openToast("Campo não informado", "error");
    }
    try {
      const { data, ok } = await Post("/", {
        email: form.email,
        senha: form.senha,
      });

      if (!ok) {
        return openToast(data, "error");
      }

      openToast("Seja bem vindo a nossa plataforma", "success");

      return setTimeout(() => {
        setItem("token", data.token);
        navigate("/home");
      }, 1000);
    } catch (error) {
      return openToast(error.message, "error");
    }
  }

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      navigate("/home");
    }
  }, []);

  return (
    <section className="LoginPage">
      <section className="FormLogin">
        <form onSubmit={handleSubmit}>
          <h1>Faça o seu login aqui</h1>
          <span>
            Ainda não é cadastrado?
            <button type="button" className="NewUserBtn" onClick={() => navigate("/signup")}>clique aqui</button>
          </span>
          <div className="FormSpace">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              placeholder="Digite o seu e-mail aqui"
              value={form.email}
              type="text"
              onChange={handleFormValue}
              name="email"
            />
          </div>
          <div className="FormSpace">
            <label htmlFor="password">Senha</label>
            <input
              name="senha"
              id="password"
              placeholder="Digite a sua senha aqui"
              value={form.senha}
              type="password"
              onChange={handleFormValue}
            />
          </div>
          <button type="submit" className="LoginBtn">Entrar</button>
        </form>
      </section>
      <section className="InfosSection">
        <h1>Informações do Projeto</h1>
        <p>
          Esse projeto foi desenvolvido durante o hackthon
          do programa de formação da FCamara em 04/22.
        </p>
        <p>
          Após essa data foi retomado esse projeto em Junho
          do mesmo ano para que fosse concluída as atividades que não foram possíveis na época.
          A ideia é que fosse um modelo de uma plataforma fechada para marcar mentorias
          e tirar dúvidas com outras pessoas da área.
        </p>
        <p>
          Desenvolvedor que refez o projeto: Guilherme de Sousa Vaz
        </p>
        <span>Contatos</span>
        <a href="https://www.linkedin.com/in/guilherme-s-vaz/">LinkedIn</a>
        <a href="https://github.com/Guivaz1993">Github</a>
      </section>
    </section>
  );
}
