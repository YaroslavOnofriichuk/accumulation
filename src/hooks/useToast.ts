import { useContext } from "react";
import { ToastContext } from "../components/Toast/ToastProvider";

export default function useToast() {
    const toastHelpers = useContext(ToastContext);
    return toastHelpers;
  }