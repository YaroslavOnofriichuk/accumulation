import { format } from "date-fns";
import type { Rate, BallanceType } from "../../../types";
import { useState } from "react";
import Button from "../../../components/Button";
import styles from "./Row.module.css";

interface Props {
    rates: Rate[];
    data: BallanceType;
}

export default function Row({ rates, data }: Props) {
    const [isEdit, setIsEdit] = useState(false);
    const accumulation = data.plus - data.minus;
    const usdRate = rates.find(r => r.cc === "USD")?.rate || 0;
    const eurRate = rates.find(r => r.cc === "EUR")?.rate || 0;

    const handleClick = () => {
        setIsEdit(!isEdit);
    };

    const handleDelete = () => {

    };

    return <tr>
        <td align="left">{format(new Date(data.month), "MMMM")}</td>
        <td align="left">
            <input className={styles.input} type="number" name="plus" value={data.plus} disabled={!isEdit}/>
        </td>
        <td align="left">
            <input className={styles.input} type="number" name="minus" value={data.minus} disabled={!isEdit}/>
        </td>
        <td align="left">
            <input className={styles.input} type="number" defaultValue={accumulation.toFixed(2)} disabled={true}/>
        </td>
        <td align="left">
            <input className={styles.input} type="number" defaultValue={(accumulation / usdRate).toFixed(2)} disabled={true}/>
        </td>
        <td align="left">
            <input className={styles.input} type="number" defaultValue={(accumulation / eurRate).toFixed(2)} disabled={true}/>
        </td>
        <td align="right">
            <Button onClick={handleClick} text={isEdit ? "Save" : "Edit"}/>
        </td>
        <td align="right">
            <Button onClick={handleDelete} text="Delete"/>
        </td>
    </tr>
}