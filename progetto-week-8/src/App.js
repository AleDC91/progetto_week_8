import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavbarComponent from "./components/NavbarComponent";
import HomePage from "./pages/HomePage";
import DayDetailPage from "./pages/DayDetailPage";
import { Container } from "react-bootstrap";



// ho volutamente mescolato axios e fetch per
// esercitarmi con entrambi.
// Non ho gestito tutti gli stati tramite redux per lo stesso motivo.

// L'app chiede il permesso per la geolocalizzazione 
// quando viene avviata, ma può funzionare anche senza, inserendo 
// manualmente la città.
// Il pulsante BACK nella pagina di dettaglio riporta alla 
// home page con i risultati relativi all'ultima ricerca



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComponent />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:latitude/:longitude/:dt" element={<DayDetailPage />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
