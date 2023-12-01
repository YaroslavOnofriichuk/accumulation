import { useLoaderData } from "react-router-dom";
import type { Rate, BallanceType } from "../../types";
import styles from "./Page.module.css";
import { useMst } from "../../store/Root";
import { useEffect, useState } from "react";
import { addYears, isSameYear, subYears } from "date-fns";
import { formatYear } from "../../utils/date";
import Row from "./Row";

export function Component() {
    const rates = useLoaderData() as Rate[];
    const store = useMst();
    const [year, setYear] = useState(new Date());
    const [items, setItems] = useState<BallanceType[]>(() => filterItems(new Date()));

    function filterItems(year: Date) {
        return store.allBallances.filter((b) =>
            isSameYear(new Date(b.month), year)
        );
    }

    const subtractYear = () => {
        const newYear = subYears(year, 1);
        setYear(newYear);
        setItems(filterItems(newYear));
    };

    const addYear = () => {
        const newYear = addYears(year, 1);
        setYear(newYear);
        setItems(filterItems(newYear));
    };

    return (
        <section className={styles.page}>
            <p>
                Currency rates:{" "}
                {rates
                    .map((rate) => `${rate.cc} - ${rate.rate.toFixed(2)}`)
                    .join(", ")}
            </p>

            <table className={styles.table}>
                <caption className={styles.title}>
                    Result of accumulation
                </caption>

                <thead>
                    <tr>
                        <th align="left">
                            <a
                                href="#"
                                onClick={subtractYear}
                            >
                                &lt;
                            </a>
                        </th>
                        <th align="center" colSpan={6}>
                            {formatYear(year)}
                        </th>
                        <th align="right">
                            <a
                                href="#"
                                onClick={addYear}
                            >
                                &gt;
                            </a>
                        </th>
                    </tr>
                    <tr>
                        <th align="left">Month</th>
                        <th align="left">Savings (UAH)</th>
                        <th align="left">Costs (UAH)</th>
                        <th align="left">Accumulation (UAH)</th>
                        <th align="left">Accumulation (USD)</th>
                        <th align="left">Accumulation (EUR)</th>
                        <th align="right">Edit</th>
                        <th align="right">Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {items.length > 0 ? items.map(item => (
                        <Row key={item.month} data={item} rates={rates}/>
                    )) : <tr><td align="left" colSpan={8}>No data</td></tr>}
                </tbody>
            </table>
        </section>
    );
}
