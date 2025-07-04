import { Routes, Route } from "react-router-dom"
import SearchPage from "./pages/SearchPage";
import Results from "./pages/Results";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage></SearchPage>}></Route>
      <Route path="/results" element={<Results></Results>}></Route>
    </Routes>
  )
}

export default App