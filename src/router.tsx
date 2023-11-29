import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "result",
                lazy: () => import("./pages/ResultPage"),
            },
            {
                path: "add-data",
                lazy: () => import("./pages/AddDataPage"),
            },
            {
                path: "instruction",
                lazy: () => import("./pages/InstructionPage"),
            },
            {
                path: "developer",
                lazy: () => import("./pages/DeveloperPage"),
            },
        ]
    },
]);
