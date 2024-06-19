import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import { Provider } from "react-redux";
import store from "@/store/store.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import Loading from "@/components/ui/Loading";
import AdminLayout from "@/components/Admin/AdminLayout";
import ErrorPage from "@/error-page";

const Dashboard = lazy(() => import("@/components/Pages/Dashboard"));
const Login = lazy(() => import("@/components/Login"));
const Signup = lazy(() => import("@/components/Signup.tsx"));
const Reservation = lazy(() => import("@/components/Pages/Reservation"));
const Showtime = lazy(() => import("@/components/Pages/Showtime"));
const SeatSelection = lazy(() => import("@/components/Pages/SeatSelecation"));

/* Admin */
const MovieForm = lazy(() => import("@/components/Admin/CreateMovie"));
const GenreForm = lazy(() => import("@/components/Admin/GenreForm"));
const EditGenreForm = lazy(() => import("@/components/Admin/EditGenreForm"));
const ShowTimeForm = lazy(() => import("@/components/Admin/CreateShowtime"));
const CinemaForm = lazy(() => import("@/components/Admin/CreateCinema"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Layout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "seat-selection/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <SeatSelection />
          </Suspense>
        ),
      },
      {
        path: "showtimes/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <Showtime />
          </Suspense>
        ),
      },
      {
        path: "reservations",
        element: (
          <Suspense fallback={<Loading />}>
            <Reservation />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<Loading />}>
            <Signup />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<Loading />}>
        <AdminLayout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "movie/create",
        element: (
          <Suspense fallback={<Loading />}>
            <MovieForm />
          </Suspense>
        ),
      },
      {
        path: "genre/create",
        element: (
          <Suspense fallback={<Loading />}>
            <GenreForm />
          </Suspense>
        ),
      },
      {
        path: "genre/edit/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <EditGenreForm />
          </Suspense>
        ),
      },
      {
        path: "showtime/create",
        element: (
          <Suspense fallback={<Loading />}>
            <ShowTimeForm />
          </Suspense>
        ),
      },
      {
        path: "cinema/create",
        element: (
          <Suspense fallback={<Loading />}>
            <CinemaForm />
          </Suspense>
        ),
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
