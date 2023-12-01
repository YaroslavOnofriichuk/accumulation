import { FormEvent } from "react";
import styles from "./Input.module.css";

interface Props {
    type?: string;
    name: string;
    label: string;
    value: string | number;
    autoComplete?: boolean;
    onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export default function Input({
    type = "text",
    name,
    autoComplete = false,
    label,
    value,
    onChange,
}: Props) {

    return (
        <div className={styles.input}>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete ? "on" : "off"}
                placeholder={label}
            ></input>
        </div>
    );
}
