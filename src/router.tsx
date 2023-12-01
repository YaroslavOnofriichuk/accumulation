import { createBrowserRouter } from "react-router-dom";
import getCurrencyRate from "./utils/currencyRate";
import type { Rate } from "./types";
import Layout from "./Layout";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";

async function loader() {
    const rates = await getCurrencyRate();
    return rates.length
            ? rates.filter((rate: Rate) => ["UAH", "USD", "EUR"].includes(rate.cc))
            : [];
}

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
                loader,
            },
            {
                path: "add-data",
                lazy: () => import("./pages/AddDataPage"),
                loader,
            },
            {
                path: "instruction",
                lazy: () => import("./pages/InstructionPage"),
            },
            {
                path: "developer",
                lazy: () => import("./pages/DeveloperPage"),
            },
        ],
    },
]);
