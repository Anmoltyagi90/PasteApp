import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./componenets/Navbar.jsx"
import Home from "./componenets/Home.jsx";
import Paste from "./componenets/Paste.jsx";
import ViewPaste from "./componenets/ViewPaste.jsx";
import { ToastContainer } from "react-toastify";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/pastes",
    element: <div>
      <Navbar />
      <Paste />
    </div>,
  },
  {
    path: "/pastes/:id",
    element: <div>
      <Navbar />
      <ViewPaste />
    </div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <App />
        <ToastContainer position="top-right" autoClose={2000} />
    </Provider>
  </StrictMode>
);
