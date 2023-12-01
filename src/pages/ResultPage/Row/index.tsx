import { format } from "date-fns";
import type { BallanceType } from "../../../types";
import { FormEvent, useEffect, useState } from "react";
import Button from "../../../components/Button";
import styles from "./Row.module.css";
import { useMst } from "../../../store/Root";
import useToast from "../../../hooks/useToast";

interface Props {
    data: BallanceType;
    usdRate: number;
    eurRate: number;
    onClick: () => void;
}

export default function Row({ data, usdRate, eurRate, onClick }: Props) {
    const [isEdit, setIsEdit] = useState(false);
    const [plus, setPlus] = useState<string>(data.plus.toString());
    const [minus, setMinus] = useState<string>(data.minus.toString());
    const [accumulation, setAccumulation] = useState<number>(data.plus - data.minus);
    const store = useMst();
    const { addToast } = useToast();

    useEffect(() => {
        setAccumulation(Number(plus) - Number(minus));
    }, [plus, minus]);

    const handleClick = () => {
        if (isEdit) {
            const balance: BallanceType = { 
                month: data.month, 
                minus: Number(minus), 
                plus: Number(plus),
            };
            store.saveBallance(balance);
            onClick();
            addToast({ status: "success", text: "Successfully saved"});
        }
        setIsEdit(!isEdit);
    };

    const handleDelete = () => {
        store.removeBallance({
            month: data.month,
            minus: Number(minus), 
            plus: Number(plus),
        });
        onClick();
        addToast({ status: "success", text: "Successfully deleted"});
    };

    const handleChange = (event: FormEvent<HTMLInputElement>): void => {
        const { name, value } = event.currentTarget;
        switch (name) {
            case "plus":
                setPlus(value);
                break;
            case "minus":
                setMinus(value);
                break;
            default:
                return;
        }
    };

    return (
        <tr>
            <td align="left">{format(new Date(data.month), "MMMM")}</td>
            <td align="left">
                <input
                    className={styles.input}
                    type="number"
                    name="plus"
                    value={plus}
                    onChange={handleChange}
                    disabled={!isEdit}
                />
            </td>
            <td align="left">
                <input
                    className={styles.input}
                    type="number"
                    name="minus"
                    value={minus}
                    onChange={handleChange}
                    disabled={!isEdit}
                />
            </td>
            <td align="left">
                <input
                    className={styles.input}
                    type="number"
                    value={accumulation.toFixed(2)}
                    disabled={true}
                />
            </td>
            <td align="left">
                <input
                    className={styles.input}
                    type="number"
                    value={(accumulation / usdRate).toFixed(2)}
                    disabled={true}
                />
            </td>
            <td align="left">
                <input
                    className={styles.input}
                    type="number"
                    value={(accumulation / eurRate).toFixed(2)}
                    disabled={true}
                />
            </td>
            <td align="right">
                <Button onClick={handleClick} text={isEdit ? "Save" : "Edit"} />
            </td>
            <td align="right">
                <Button onClick={handleDelete} text="Delete" />
            </td>
        </tr>
    );
}
