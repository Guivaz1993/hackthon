/* eslint-disable react/prop-types */
import "./styles.css";
import useUser from "../../hooks/useUser";

export default function Card({ avatar, area, name, id }) {
  const { setOpenDetailPerson, setCurrentPerson } = useUser();

  function openDetail() {
    setOpenDetailPerson(true);
    setCurrentPerson(id);
  }

  return (
    <section className="CardPerson">
      <div className="PersonContent">
        <img src={avatar} alt="Profile Icon" className="PersonAvatar" />
        <span className="PersonName">{name}</span>
        <span className="PersonPosition">{area}</span>
        {/* <span className="PersonLevel">Sênior</span> */}
      </div>
      <button
        type="button"
        className="PersonButton"
        onClick={() => openDetail()}
      >
        Sobre
      </button>
    </section>
  );
}
