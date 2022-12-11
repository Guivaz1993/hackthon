/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { Post } from "../../services/Conection";

import "./styles.css";

import useUser from "../../hooks/useUser";

export default function SignUpPage() {
  const { openToast } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    senhaConfirm: "",
    area: "",
    bio: "",
    avatar: "",
  });
  const [avatar, setAvatar] = useState("");

  function handleFormValue(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function encodeImageFileAsURL(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function convertImage() {
      setAvatar(reader.result.replace("data:image/jpeg;base64,", ""));
    };
    reader.readAsDataURL(file);
  }

  // eslint-disable-next-line consistent-return
  async function handleSubmit(e) {
    e.preventDefault();

    if (form.senha !== form.senhaConfirm) {
      return openToast("As senhas informadas não coincidem", "error");
    }

    if (!form.email || !form.senha || !form.nome || !form.area) {
      return openToast("Campo não informado", "error");
    }

    if (form.bio.length > 255) {
      return openToast("O campo biografia pode ter no máximo 255 caracteres.", "error");
    }
    try {
      const { data, ok } = await Post("/usuarios/", {
        email: form.email,
        senha: form.senha,
        nome: form.nome,
        area: form.area,
        bio: form.bio,
        avatar,
      });

      if (!ok) {
        return openToast(data, "error");
      }

      openToast("Cadastro realizado com sucesso", "success");

      return setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      return openToast(error.message, "error");
    }
  }

  return (
    <section className="SignUpPage">
      <section className="FormSignUp">
        <form onSubmit={handleSubmit}>
          <h1>Faça o seu cadastro aqui</h1>
          <span>
            Já é cadastrado?
            <button type="button" className="ChangePageBtn" onClick={() => navigate("/")}>clique aqui</button>
          </span>
          <div className="FormSpace">
            <label htmlFor="name">Nome *</label>
            <input
              id="name"
              placeholder="Digite o seu nome"
              value={form.nome}
              type="text"
              onChange={handleFormValue}
              name="nome"
            />
          </div>
          <div className="FormSpace">
            <label htmlFor="email">E-mail *</label>
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
            <label htmlFor="area">Cargo *</label>
            <input
              id="area"
              placeholder="Digite o seu cargo aqui"
              value={form.area}
              type="text"
              onChange={handleFormValue}
              name="area"
            />
          </div>
          <div className="FormSpace">
            <label htmlFor="bio">Biografia</label>
            <textarea
              id="bio"
              placeholder="Escreva aqui um pouco sobre você..."
              value={form.bio}
              type="text"
              onChange={handleFormValue}
              name="bio"
              rows="3"
            />
          </div>
          <div className="FormSpace">
            <label htmlFor="avatar">Imagem de perfil</label>
            <input
              id="avatar"
              placeholder="Digite o seu e-mail aqui"
              type="file"
              onChange={encodeImageFileAsURL}
              name="avatar"
            />
          </div>
          <div className="FormSpace">
            <label htmlFor="password">Senha *</label>
            <input
              name="senha"
              id="password"
              placeholder="Digite a sua senha aqui"
              value={form.senha}
              type="password"
              onChange={handleFormValue}
            />
          </div>
          <div className="FormSpace">
            <label htmlFor="passwordConfirm">Confirmação de senha *</label>
            <input
              name="senhaConfirm"
              id="passwordConfirm"
              placeholder="Digite a sua senha novamente"
              value={form.senhaConfirm}
              type="password"
              onChange={handleFormValue}
            />
          </div>
          <button type="submit" className="SignUpBtn">Cadastrar</button>
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
