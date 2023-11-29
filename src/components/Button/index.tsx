import styles from "./Button.module.css";

interface Props {
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    text: string;
    disabled?: boolean;
}

export default function Button({
    type = "button",
    onClick,
    text,
    disabled = false,
}: Props) {
    return (
        <button
            className={styles.button}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}
