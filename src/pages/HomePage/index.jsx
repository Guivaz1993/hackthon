import { useNavigate } from "react-router-dom";

import girl from "../../assets/girl.svg";
import girl2 from "../../assets/girl2.svg";

import ModalMenthor from "../../components/ModalMenthor";

import useUser from "../../hooks/useUser";

import "./styles.css";

export default function HomePage() {
  const navigate = useNavigate();
  const { openModal, setOpenModal } = useUser();

  return (
    <section className="HomePage">
      {openModal && <ModalMenthor />}
      <section className="GreenSection">
        <div className="TextGreen">
          <h1 className="GreenTitle">Technical Share</h1>
          <h2 className="GreenText">
            Conectando pessoas interessadas pela tecnologia
          </h2>
        </div>
        <img src={girl} alt="Tech Share" className="GirlGreen" />
      </section>
      <section className="BtnSection ">
        <img src={girl2} alt="Technical Share" className="BottomGirl" />
        <button
          type="button"
          className="MenthorBtn BtnHome"
          onClick={() => setOpenModal(true)}
        >
          Marcar Mentoria
        </button>
        <button
          type="button"
          className="ForumBtn BtnHome"
          onClick={() => navigate("/forum")}
        >
          Tirar Dúvida
        </button>
      </section>
    </section>
  );
}
