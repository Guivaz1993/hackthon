/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();
    return (
        <section>
            Seu link está errado, clique no botão abaixo para retornar
            <button type="button" onClick={() => navigate("/")}>Voltar</button>
        </section>
    );
}
