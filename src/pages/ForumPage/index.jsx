/* eslint-disable react/jsx-one-expression-per-line */
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";

import Arrow from "../../assets/arrowBottom.svg";
import Lixo from "../../assets/lixo.svg";
import Plus from "../../assets/plus.svg";
import Profile from "../../assets/profile-icon-png-898.png";

import { Get } from "../../services/Conection";

import { getItem } from "../../utils/Storage";
import "./styles.css";

export default function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [mentorias, setMentorias] = useState([]);
  const [filter, setFilter] = useState("Área");
  const [openFilter, setOpenFilter] = useState(false);
  const { openToast } = useUser();

  const token = getItem("token");

  async function loadPost() {
    try {
      const response = await Get("/forum", token);
      setPosts(response.data);
    } catch (error) {
      openToast(error.message, "error");
    }
  }

  async function loadMentorias() {
    try {
      const response = await Get("/mentorias/marcadas", token);
      setMentorias(response.data);
    } catch (error) {
      openToast(error.message, "error");
    }
  }

  function handleFilter() {
    setOpenFilter(!openFilter);
  }

  function handleSetFilter(iten) {
    setOpenFilter(!openFilter);
    setFilter(iten);
    const localPosts = posts;
    if (iten === "Autor") {
      localPosts.sort((a, b) => (a.nome > b.nome ? 1 : -1));
    } else if (iten === "Área") {
      localPosts.sort((a, b) => (a.habilidade > b.habilidade ? 1 : -1));
    } else {
      localPosts.sort((a, b) => (a.id > b.id ? -1 : 1));
    }
  }

  useEffect(() => {
    loadMentorias();
    loadPost();
  }, []);

  return (
    <div className="ForumPage">
      <section className="ForumSection">
        <article className="ForumQuestion">
          <h1 className="ForumTitle">Você tem alguma dúvida?</h1>
          <button type="button" className="NewQuestion">
            Faça sua pergunta
          </button>
        </article>
        <article className="ForumSpace">
          <div className="ForumFilter">
            <span>Ordenar fórum por</span>
            <span>{filter}</span>
            <button type="button" onClick={() => handleFilter()}>
              <img src={Arrow} alt="\/" />
            </button>
            {openFilter && (
              <div className="ListFilter">
                <button type="button" onClick={() => handleSetFilter("Área")}>
                  Área
                </button>
                <button type="button" onClick={() => handleSetFilter("Autor")}>
                  Autor
                </button>
                <button type="button" onClick={() => handleSetFilter("Data")}>
                  Data
                </button>
              </div>
            )}
          </div>
          {posts.map((post) => (
            <article className="ForumPost" key={post.id}>
              <img
                src={post.avatar ? post.avatar : Profile}
                alt="avatar"
                className="AvatarPost"
              />
              <div className="PostContent">
                <h3 className="PostName">{post.nome}</h3>
                <span className="PostArea">{post.habilidade}</span>
                <p className="PostQuestion">{post.pergunta}</p>
                <button type="button" className="PostBtn">
                  Responder
                </button>
              </div>
            </article>
          ))}
        </article>
      </section>
      <section className="Schedule">
        <h2 className="ScheduleTitle">Mentorias Marcadas</h2>
        {mentorias === "Sem mentorias marcadas."
          ? <span className="ScheduleIten">{mentorias}</span>
          : mentorias.map((mentoria) => (
            <div key={mentoria.id} className="ScheduleIten">
              <span>
                {new Date(mentoria.dia).getDate()}/
                {new Date(mentoria.dia).getMonth()}
              </span>
              <span>
                {mentoria.hora.slice(0, 2)}:{mentoria.hora.slice(3, 5)}
                <img src={Lixo} alt="trash" className="ScheduleTrash" />
              </span>
            </div>
          ))}
        <span className="SchedulePlus">
          Ver mais
          <img src={Plus} alt="+" />
        </span>
      </section>
    </div>
  );
}
