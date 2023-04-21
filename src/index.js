import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminUsers from "./components/AdminUsers";
import AdminScores from "./components/AdminScores";
import "./index.css";
import { initFirebase } from "./firebaseConfig";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import AdminLogin from "./components/AdminLogin";

initFirebase();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <App />
        <Footer />
      </>
    ),
    errorElement: <Navigate to="/" />,
  },
  {
    path: "/signup",
    element: (
      <>
        <Header />
        <Signup />
        <Footer />
      </>
    ),
  },
  {
    path: "/signin",
    element: (
      <>
        <Header />
        <Signin />
        <Footer />
      </>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <>
        <Header />
        <AdminUsers />
        <Footer />
      </>
    ),
  },
  {
    path: "/admin/scores",
    element: (
      <>
        <Header />
        <AdminScores />
        <Footer />
      </>
    ),
  },
  {
    path: "/adminLogin",
    element: (
      <>
        <Header />
        <AdminLogin />
        <Footer />
      </>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
