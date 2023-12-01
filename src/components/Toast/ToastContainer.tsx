import { createPortal } from "react-dom";
import type { ToastProps } from "../../types";
import Toast from "./Toast";

export default function ToastContainer({ toasts }: { toasts: ToastProps[]}) {
    return createPortal(
      <>
        {toasts.map(item => <Toast key={item.id} {...item}/>)}
      </>
      , document.body
    );
  }