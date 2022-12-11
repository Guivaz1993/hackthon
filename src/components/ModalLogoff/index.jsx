/* eslint-disable react/prop-types */
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { clearAll } from "../../utils/Storage";
import useUser from "../../hooks/useUser";

export default function ModalLogoff({ setOpenLogoff, user }) {
    const navigate = useNavigate();
    const { openToast } = useUser();

    function handleLogoff() {
        openToast("Até a próxima!", "info");
        setOpenLogoff(false);
        clearAll();
        navigate("/");
    }

    useEffect(() => {
        setTimeout(() => setOpenLogoff(false), 10000);
    }, []);

    return (
        <section className="LogoffModal">
            <article className="LogoffInfos">
                <span className="LogoffName">{user.nome}</span>
                <span className="LogoffEmail">{user.email}</span>
            </article>
            <button type="button" onClick={() => handleLogoff()}>
                Sair
            </button>
        </section>
    );
}
