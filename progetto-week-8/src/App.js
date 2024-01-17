import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavbarComponent from "./components/NavbarComponent";
import SearchLocationComponent from "./components/SearchLocationComponent";
import HomePage from "./pages/HomePage";
import DayDetailPage from "./pages/DayDetailPage";
import { Container } from "react-bootstrap";

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
