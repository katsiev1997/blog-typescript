import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  ProfilePage,
  AddArticlePage,
  LoginPage,
  SignUpPage,
  ArticlePage,
} from "../../pages";

export const router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/add" element={<AddArticlePage />} />
      <Route path="/articles/:id" element={<ArticlePage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};
