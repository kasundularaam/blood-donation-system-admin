import "./App.css";
import "leaflet/dist/leaflet.css";
import LoginPage from "./components/Auth/LoginPage";
import HomePage from "./components/home/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCSZQr9q83wW6jF8oZJJZ261GxaDJNM85w",
  authDomain: "blood-donation-system-1cbb8.firebaseapp.com",
  projectId: "blood-donation-system-1cbb8",
  storageBucket: "blood-donation-system-1cbb8.appspot.com",
  messagingSenderId: "177787355575",
  appId: "1:177787355575:web:ba0a2ad06953d446fb2832",
  measurementId: "G-2KEQ4Z8B3X",
};

const app = initializeApp(firebaseConfig);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export { App, app };
