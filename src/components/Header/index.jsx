/* eslint-disable consistent-return */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import Badge from "@mui/material/Badge";
import IconSearch from "../../assets/search.svg";

import ModalLogoff from "../ModalLogoff";

import useUser from "../../hooks/useUser";
import { Get, Post } from "../../services/Conection";
import { getItem } from "../../utils/Storage";
import "./style.css";

export default function Header() {
  const navigate = useNavigate();
  const token = getItem("token");

  const [user, setUser] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState([]);
  const [notificationNotRead, setNotificationNotRead] = useState([]);
  const [openLogoff, setOpenLogoff] = useState(false);
  const { setOpen, setToastMessage, setSeverity, openToast, openDetailPerson } = useUser();

  async function loadUser() {
    try {
      const { data, ok } = await Get("/usuario", token);
      if (!ok) {
        setOpen(true);
        setToastMessage(data);
        setSeverity("error");
        return;
      }
      setUser(data);
    } catch (error) {
      setOpen(true);
      setToastMessage(error.message);
      setSeverity("error");
    }
  }

  async function loadNotification() {
    try {
      const { data, ok } = await Get("/notificacoes", token);
      if (!ok) {
        return openToast(data, "error");
      }
      setNotification(data);
      const notRead = data.filter((iten) => !iten.lida);
      setNotificationNotRead(notRead);
    } catch (error) {
      return openToast(error.message, "error");
    }
  }

  async function readAllNotification() {
    try {
      await Post(
        "/notificacoes/",
        {
          id: 1,
        },
        // eslint-disable-next-line comma-dangle
        token
      );
    } catch (error) {
      return openToast(error.message, "error");
    }
  }

  async function handleNotification() {
    if (showNotification) {
      readAllNotification();
      setShowNotification(false);
    } else {
      setShowNotification(true);
    }
  }

  useEffect(() => {
    if (token) {
      loadUser();
      loadNotification();
    }
  }, [showNotification, token]);

  useEffect(() => {
    if (token) {
      loadNotification();
    }
  }, [openDetailPerson]);

  return (
    <section className={token ? "Header" : "NotHeader"}>
      {token && (
        <>
          <button
            className="Logo"
            type="button"
            onClick={() => navigate("/home")}
          >
            Technical Share
          </button>
          <div className="SearchContainer">
            <img className="IconSearch" src={IconSearch} alt="Search" />
            <input placeholder="Pesquisa" className="HeaderSearch" />
          </div>
          <div className="ContentHeader">
            <button
              type="button"
              className="ForumHeader"
              onClick={() => navigate("/forum")}
            >
              Fórum
            </button>
            <div className="NotificationBadge">
              <Badge
                badgeContent={notificationNotRead.length}
                color="error"
                onClick={() => handleNotification()}
              >
                <NotificationImportantIcon
                  color="action"
                  sx={{ height: "6rem", width: "6rem", cursor: "pointer" }}
                />
              </Badge>
            </div>
            <button
              type="button"
              className="BtnAvatar"
              onClick={() => setOpenLogoff(!openLogoff)}
            >
              <img
                src={user.avatar}
                alt="profile"
                className="ProfileContainer"
              />
            </button>
            {openLogoff && (
              <ModalLogoff
                setOpenLogoff={setOpenLogoff}
                user={user}
              />
            )}
          </div>
          {showNotification && (
            <section className="NotificationContainer">
              {notification.map((iten) => (
                <div
                  key={iten.id}
                  className={iten.lida ? "Read Notification" : "Notification"}
                >
                  <span>Oba!</span>
                  <span>{iten.mensagem}</span>
                </div>
              ))}
            </section>
          )}
        </>
      )}
    </section>
  );
}
