import { toast } from "react-toastify";
window.getRandomId = () => {
  return Math.random().toString(36).slice(2);
};
window.notify = (msg, type) => {
  const option = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  switch (type) {
    case "success":
      toast.success(msg, option);
      break;
    case "error":
      toast.error(msg, option);
      break;

    case "info":
      toast.info(msg, option);
      break;

    case "warning":
      toast.warning(msg, option);
      break;

    default:
      toast(msg, option);
  }
};
