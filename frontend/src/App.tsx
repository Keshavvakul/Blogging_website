import { Routes, Route } from "react-router-dom";
import { Signup, Signin, Blog } from "./pages";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </>
  );
}

export default App;
