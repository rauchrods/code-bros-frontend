import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CodeEditorPage from "./pages/CodeEditorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/problem/:problemId" element={<CodeEditorPage />} />
    </Routes>
  );
}

export default App;
