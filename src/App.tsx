import "./app.css";
import { Route, Routes } from "react-router-dom";
import Menu from "./pages/menu";
import Play from "./pages/play";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/play" element={<Play />} />
    </Routes>
  )
}