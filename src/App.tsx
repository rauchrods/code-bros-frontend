import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CodeEditorPage from "./pages/CodeEditorPage";
import "./App.scss";
import Navbar from "./components/NavBar";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/problem/:problemId" element={<CodeEditorPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
