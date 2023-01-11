import "./App.scss";
import CoustomRoutes from "./pages/Routes";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import AuthContextProvider from "./Contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "bootstrap/dist/js/bootstrap.bundle";
function App() {
  return (
    <>
      <AuthContextProvider>
        <CoustomRoutes />
      </AuthContextProvider>
      <ToastContainer />
    </>
  );
}

export default App;
