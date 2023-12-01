import { useEffect, useState } from "react";
import { subYears, addYears } from "date-fns";
import styles from "./Picker.module.css";
import { generateMonths, formatMonth } from "../../utils/date";

interface Props {
    onChange: (month: string) => void;
}

export default function MonthPicker({ onChange }: Props) {
    const [year, setYear] = useState<Date>(new Date());
    const [month, setMonth] = useState<string>(() => formatMonth(new Date()));
    const [months, setMonths] = useState<Date[]>([]);

    useEffect(() => {
        setMonths(generateMonths(year));
    }, [year]);

    useEffect(() => {
        onChange(month);
    }, [month, onChange]);

    return (
        <div className={styles["month-picker"]}>
            <a
                href="#"
                className={styles["month-picker-nav"]}
                onClick={() => setYear(subYears(year, 1))}
            >
                &lt;
            </a>
            <fieldset className={styles["month-picker-fieldset"]}>
                {months.map((mon) => {
                    const formatedMonth = formatMonth(mon);
                    return (
                        <>
                            <input
                                type="radio"
                                name="month"
                                value={month}
                                id={formatedMonth}
                                onChange={() => setMonth(formatedMonth)}
                            />
                            <label
                                htmlFor={formatedMonth}
                                className={styles["month-picker-label"]}
                            >
                                {formatedMonth}
                            </label>
                        </>
                    );
                })}
            </fieldset>
            <a
                href="#"
                className={styles["month-picker-nav"]}
                onClick={() => setYear(addYears(year, 1))}
            >
                &gt;
            </a>
        </div>
    );
}
