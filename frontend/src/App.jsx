import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbarr from "./components/Navbar";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Navbarr />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
