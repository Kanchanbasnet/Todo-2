import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import TodoPage from "../components/TodoPage";
import SignUpForm from "../components/SignUpForm";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />

          <Route path="/home" element={<TodoPage />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
