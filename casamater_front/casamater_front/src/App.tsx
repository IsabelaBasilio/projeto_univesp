import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Crianca from "./pages/Crianca";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Entrega from "./pages/Entrega";
import ListaPresenca from "./pages/ListaPresenca";
import Programacao from "./pages/Programacao";
import Especiais from "./pages/Especiais";
import LeitesEspeciais from "./pages/Leites";
import Login from "./pages/Login";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/crianca" element={<Crianca />} />
                <Route path="/entrega" element={<Entrega />} />
                <Route path="/presenca" element={<ListaPresenca />} />
                <Route path="/programacao" element={<Programacao />} />
                <Route path="/especiais" element={<Especiais />} />
                <Route path="/leites" element={<LeitesEspeciais />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;

