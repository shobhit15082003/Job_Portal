import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { createTheme, Divider, MantineProvider, Slider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/dates/styles.css";
import HomePage from "./Pages/HomePage";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import FindJobs from "./Pages/FindJobs";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import FindTalentPage from "./Pages/FindTalentPage";
import TalentProfilePage from "./Pages/TalentProfilePage";
import PostJobPage from "./Pages/PostJobPage";
import JobDescPage from "./Pages/JobDescPage";
import ApplyJobPage from "./Pages/ApplyJobPage";
import CompanyPage from "./Pages/CompanyPage";
import PostedJobPage from "./Pages/PostedJobPage";
import JobHistoryPage from "./Pages/JobHistoryPage";
import SignupPage from "./Pages/SignupPage";
import ProfilePage from "./Pages/ProfilePage";

function AppContent() {
  const location = useLocation();
  const isSignupPage = location.pathname === "/signup" || location.pathname === "/login" ;

  return (
    <div className="relative">
      <Header />
      {!isSignupPage && <Divider size="xs" />}
      <Routes>
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/find-talent" element={<FindTalentPage />} />
        <Route path="/talent-profile" element={<TalentProfilePage />} />
        <Route path="/post-job" element={<PostJobPage />} />
        <Route path="/jobs" element={<JobDescPage />} />
        <Route path="/apply-job" element={<ApplyJobPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/posted-job" element={<PostedJobPage />} />
        <Route path="/job-history" element={<JobHistoryPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  const theme = createTheme({
    colors: {
      brightSun: [
        "#fffbeb",
        "#fff3c6",
        "#ffd149",
        "#ffe588",
        "#ffbd20",
        "#f99b07",
        "#dd7302",
        "#b75006",
        "#943c0c",
        "#7a330d",
        "#461902",
      ],
      "mine-shaft": [
        "#f6f6f6",
        "#e7e7e7",
        "#d1d1d1",
        "#b0b0b0",
        "#888888",
        "#6d6d6d",
        "#5d5d5d",
        "#4f4f4f",
        "#454545",
        "#3d3d3d",
        "#2d2d2d",
      ],
    },
    fontFamily: "poppins, sans-serif",
    primaryColor: "brightSun",
    primaryShade: 4,
  });

  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;