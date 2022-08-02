/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import "./styles.css";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Close from "../../assets/x.svg";
import useUser from "../../hooks/useUser";
import { Get, Post } from "../../services/Conection";

import { getItem } from "../../utils/Storage";

export default function ModalPersonDetail() {
  const { setOpenDetailPerson, currentPerson, setOpen, setToastMessage, setSeverity } =
    useUser();
  const token = getItem("token");

  function close() {
    setOpenDetailPerson(false);
  }
  const [person, setPerson] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [agenda, setAgenda] = useState([]);
  const [form, setForm] = useState({
    horario: "",
  });

  function handleFormValue(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function loadInfos() {
    try {
      const { data, ok } = await Get(`/mentor/${currentPerson}`, token);
      if (!ok) {
        return;
      }
      setPerson(data.mentor);
      setAbilities(data.habilidade);
      setAgenda(data.horarios);
    } catch (error) {
      setOpen(true);
      setToastMessage(error.message);
      setSeverity("error");
    }
  }

  useEffect(() => {
    loadInfos();
  }, []);

  // eslint-disable-next-line consistent-return
  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.horario) {
      setOpen(true);
      setToastMessage("É necessário marcar um horário");
      setSeverity("error");
      return;
    }

    try {
      const { data, ok } = await Post(
        "/mentorias/marcar",
        {
          usuario_id: 1,
          agenda_id: form.horario,
        },
        token
      );

      if (!ok) {
        setOpen(true);
        setToastMessage(data);
        setSeverity("error");
        return;
      }

      setForm({
        horario: "",
      });
      setOpen(true);
      setToastMessage("Mentoria Marcada com sucesso");
      setOpenDetailPerson(false);
    } catch (error) {
      setOpen(true);
      setToastMessage(error.message);
      setSeverity("error");
    }
  }

  return (
    <section className="BackdropDetail">
      <section className="ModalDetail">
        <button type="button" onClick={() => close()} className="CloseButton">
          <img src={Close} alt="X" />
        </button>
        {person && (
          <article className="PersonDetail">
            <img
              src={person.avatar}
              alt="Profile Icon"
              className="DetailAvatar"
            />
            <span className="DetailName FontDetail">{person.nome}</span>
            <span className="DetailPosition FontDetail">Ux Research</span>
            <span className="DetailLevel FontDetail">Sênior</span>
          </article>
        )}
        <article className="PersonSchedule">
          <div className="AbilitiesContainer">
            <h2 className="PersonScheduleTitle FontDetail">Habilidades</h2>
            <article className="PersonAbilities">
              {abilities === "Não tem habilidades cadastradas" ? (
                <div className="ModalIten FontDetail" key={abilities}>
                  <span>{abilities}</span>
                </div>
              ) : (
                abilities.map((ability) => (
                  <div className="ModalIten FontDetail" key={ability.id}>
                    <span>{ability.habilidade}</span>
                  </div>
                ))
              )}
            </article>
          </div>
          <div className="ScheduleContainer">
            <h2 className="PersonScheduleTitle FontDetail">
              Selecione um dos horários
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="PersonHorary">
                {agenda === "Não tem horário disponível" ? (
                  <div className="ModalIten FontDetail">
                    <span>{agenda}</span>
                  </div>
                ) : (
                  agenda.map((horario) => (
                    <div className="ModalIten FontDetail" key={horario.id}>
                      <label id="horario" className="HourIten">
                        <div className="AlignCenter">
                          <input
                            type="radio"
                            name="horario"
                            value={horario.id}
                            onChange={handleFormValue}
                          />
                          <span>
                            {format(new Date(horario.dia), "eeeeee dd/MM", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                        <span>{horario.hora}</span>
                      </label>
                    </div>
                  ))
                )}
              </div>
              <button type="submit" className="ScheduleBtn">
                Agendar mentoria
              </button>
            </form>
          </div>
        </article>
      </section>
    </section>
  );
}
