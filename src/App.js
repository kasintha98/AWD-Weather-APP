import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Home } from "./containers/Home";

function App() {
  return (
    <>
      <ToastContainer theme="colored" />
      <Home></Home>
    </>
  );
}

export default App;
