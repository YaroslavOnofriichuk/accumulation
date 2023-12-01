import { Link, useLoaderData } from "react-router-dom";
import type { Rate, BallanceType } from "../../types";
import styles from "./Page.module.css";
import { useMst } from "../../store/Root";
import { useState } from "react";
import { addYears, isSameYear, subYears } from "date-fns";
import { formatYear } from "../../utils/date";
import Row from "./Row";

export function Component() {
    const rates = useLoaderData() as Rate[];
    const store = useMst();
    const [year, setYear] = useState(new Date());
    const [items, setItems] = useState<BallanceType[]>(() =>
        filterItems(new Date())
    );
    const usdRate = rates.find((r) => r.cc === "USD")?.rate || 0;
    const eurRate = rates.find((r) => r.cc === "EUR")?.rate || 0;
    const [uahAccumulation, setAccumulation] = useState<number>(() =>
        calculateTotalAccumulation()
    );
    const [usdAccumulation, setUsdAccumulation] = useState<number>(uahAccumulation / usdRate);
    const [eurAccumulation, setEurAccumulation] = useState<number>(uahAccumulation / eurRate);

    function calculateTotalAccumulation() {
        return store.allBallances.reduce(
            (acc, item) => acc + item.plus - item.minus,
            0
        );
    }

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

    const handleClick = () => {
        const totalAccumulation = calculateTotalAccumulation();
        setAccumulation(totalAccumulation);
        setUsdAccumulation(totalAccumulation / usdRate);
        setEurAccumulation(totalAccumulation / eurRate);
        setItems(filterItems(year));
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
                        <th align="center">
                            <a href="#" onClick={subtractYear}>
                                &lt;
                            </a>
                        </th>
                        <th align="center" colSpan={6}>
                            {formatYear(year)}
                        </th>
                        <th align="center">
                            <a href="#" onClick={addYear}>
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
                    {items.length > 0 ? (
                        items.map((item) => (
                            <Row
                                key={item.month}
                                data={item}
                                usdRate={usdRate}
                                eurRate={eurRate}
                                onClick={handleClick}
                            />
                        ))
                    ) : (
                        <tr>
                            <td align="left" colSpan={8}>
                                No data
                            </td>
                        </tr>
                    )}
                </tbody>

                <tfoot>
                    <tr>
                        <td align="left" colSpan={3}>
                            Total accumulation:
                        </td>
                        <td align="left">{uahAccumulation.toFixed(2)}</td>
                        <td align="left">{usdAccumulation.toFixed(2)}</td>
                        <td align="left">{eurAccumulation.toFixed(2)}</td>
                        <td align="right"></td>
                        <td align="right"></td>
                    </tr>
                </tfoot>
            </table>
            
            <ul className={styles.info}>
                <li>
                    <Link to="/instruction">
                        See instruction
                    </Link>
                </li>
                <li>
                    <Link to="/developer">
                        See developer information
                    </Link>
                </li>
            </ul>
        </section>
    );
}
