import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./Pages/HomePage.tsx";
import PageNotFound from "./Components/PageNotFound.tsx";
import SignUpPage from "./Pages/SignUpPage.tsx";
import LogInPage from "./Pages/LogInPage.tsx";
import { ImageAnalysisPage } from "./Pages/ImageAnalysisPage.tsx";
import SearchIngredientPage from "./Pages/SearchIngredientPage.tsx";
import UserProfile from "./Pages/UserProfilePage.tsx";
import { IngredientAnalysisPage } from "./Pages/IngredientAnalysisPage.tsx";
import { AuthProvider } from "./Context/Auth_Context.tsx";
import AboutUs from "./Pages/AboutPage.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/image-analysis/:id",
        element: <ImageAnalysisPage />,
      },
      {
        path: "/search",
        element: <SearchIngredientPage />,
      },
      {
        path: "/ingredient/:id",
        element: <IngredientAnalysisPage />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
    ],
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LogInPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </QueryClientProvider>
  </AuthProvider>,
);
