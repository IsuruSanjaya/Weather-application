import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" index element={<Login />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
