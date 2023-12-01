import { Outlet } from "react-router";
import Header from "./Header";
import styles from "./Layout.module.css";
import { Provider, rootStore } from "../store/Root";
import { ToastProvider } from "../components/Toast/ToastProvider";

export default function Layout() {
    return (
        <Provider value={rootStore}>
            <ToastProvider>
                <div className={styles.layout}>
                    <Header />
                    <main className={styles.main}>
                        <Outlet />
                    </main>
                </div>
            </ToastProvider>
        </Provider>
    );
}
