import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import { Provider } from "react-redux";
import store from "@/store/store.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/error-page";
import { Login } from "@/components/Login";
import Dashboard from "@/components/Pages/Dashboard";
import { Signup } from "./components/Signup.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
