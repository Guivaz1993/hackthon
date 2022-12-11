import { Alert, Snackbar } from "@mui/material";
import useUser from "../../hooks/useUser";

export default function ToastNotification() {
  const { open, setOpen, toastMessage, severity } = useUser();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      sx={{ width: 500 }}
    >
      <Alert
        onClose={handleClose}
        severity={severity || "error"}
        sx={{ width: "100%", fontSize: 16 }}
      >
        {toastMessage}
      </Alert>
    </Snackbar>
  );
}
