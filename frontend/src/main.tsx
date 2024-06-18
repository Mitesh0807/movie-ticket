import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import { Provider } from "react-redux";
import store from "@/store/store.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import Loading from "./components/ui/Loading";
import MovieForm from "./components/Admin/CreateMovie";

const Dashboard = lazy(() => import("@/components/Pages/Dashboard"));
const Login = lazy(() => import("@/components/Login"));
const Signup = lazy(() => import("@/components/Signup.tsx"));
const ErrorPage = lazy(() => import("@/error-page"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <MovieForm />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<Loading />}>
            <Signup />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
