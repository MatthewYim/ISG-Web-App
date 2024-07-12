import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import UserPage from "../Pages/UserPage/UserPage";
import PdfPage from "../Pages/PdfPage/PdfPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "user-page", element: <UserPage /> },
      { path: "pdf-page", element: <PdfPage /> },
    ],
  },
]);
