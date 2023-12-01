import styles from "./Toast.module.css";
import type { ToastProps } from "../../types";
import useToast from "../../hooks/useToast";
import { useEffect } from "react";

export default function Toast({ status, text, id = 999 }: ToastProps) {
    const { removeToast } = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(id);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [id, removeToast]);

    return (
        <div className={`${styles.toast} ${styles.show}`}>
            <div className={styles.img}>
                {status === "success" ? "Success" : "Error"}
            </div>
            <div className={styles.desc}>{text}</div>
        </div>
    );
}
