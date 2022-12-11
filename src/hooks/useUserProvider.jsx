/* eslint-disable indent */
import { useState } from "react";

function useUserProvider() {
  const [openModal, setOpenModal] = useState(false);
  const [openDetailPerson, setOpenDetailPerson] = useState(false);
  const [currentPerson, setCurrentPerson] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");

  function openToast(message, severityLevel) {
    setOpen(true);
    setToastMessage(message);
    setSeverity(severityLevel);
  }

  return {
    openModal,
    setOpenModal,
    openDetailPerson,
    setOpenDetailPerson,
    currentPerson,
    setCurrentPerson,
    toastMessage,
    setToastMessage,
    open,
    setOpen,
    severity,
    setSeverity,
    openToast,
  };
}

export default useUserProvider;
