import { Routes, Route } from "react-router-dom";
import { Signup, Signin, Blog, AllBlogs, Editor } from "./pages";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/allBlogs" element={<AllBlogs />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </>
  );
}

export default App;
