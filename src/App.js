import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./containers/Home";
import { Employee } from "./containers/Employee";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer theme="colored" />
      <Routes>
        <Route exact path="/employee-manager" element={<Employee></Employee>} />
        <Route exact path="/" element={<Home></Home>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
