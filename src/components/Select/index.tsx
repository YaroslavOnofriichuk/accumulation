import { FormEvent, useState } from "react";
import styles from "./Select.module.css";

interface Props {
    name: string;
    label: string;
    value: string | number;
    onChange: (e: FormEvent<HTMLInputElement>) => void;
    options?: string[];
}

export default function Select({
    name,
    label,
    value,
    onChange,
    options = [],
}: Props) {
    const [open, setOpen] = useState(false);

    const handleChange = (option: string) => {
        onChange({
            //@ts-ignore
            currentTarget: {
                name,
                value: option,
            }
        })
    };

    return (
        <div className={styles.select} onClick={() => setOpen(!open)}>
            <input
                name={name}
                value={value}
                placeholder={label}
                disabled={true}
            />

            {open && (
                <ul className={styles.options}>
                    {options.map((option) => (
                        <li
                            key={option}
                            value={option}
                            className={option === value ? styles.active : ""}
                            onClick={() => handleChange(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
