import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import JobOfferPage from "./pages/JobOfferPage";

function App() {
  return (
    <Routes>
      <Route path="/joboffer" element={<JobOfferPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}

export default App;
