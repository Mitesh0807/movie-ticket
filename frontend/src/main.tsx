import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import "@/index.css";
import { Provider } from "react-redux";
import store from "@/store/store.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "@/error-page";
import { Signup } from "@/components/Signup.tsx";
import { Login } from "@/components/Login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/',
    element:<App/>
  },
  {
    path:"*",
    element:<ErrorPage/>
  }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    
      <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
    
  </React.StrictMode>
);
