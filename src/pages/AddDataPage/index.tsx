import { FormEvent, SyntheticEvent, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useMst } from "../../store/Root";
import type { Rate, BallanceType } from "../../types";
import styles from "./Page.module.css";
import MonthPicker from "../../components/MonthPicker";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import useToast from "../../hooks/useToast";

export function Component() {
    const [month, setMonth] = useState<string>("");
    const [plus, setPlus] = useState<string>("");
    const [minus, setMinus] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [isNewCategory, setIsNewCategory] = useState<boolean>(false);
    const rates = useLoaderData() as Rate[];
    const store = useMst();
    const { addToast } = useToast();

    const handleChangeMonth = (month: string) => {
        setMonth(month);
    };

    const handleSubmit = (event: SyntheticEvent): void => {
        event.preventDefault();
        
        if (month.trim() === "" || plus.trim() === "" || minus.trim() === "") {
            addToast({ status: "error", text: "Savings and costs should not be empty"});
            return;
        }
        const balance: BallanceType = { 
            month, 
            minus: Number(minus), 
            plus: Number(plus),
        };
        if (category) {
            store.saveCategory(category);
            balance.category = category;
        }
        store.saveBallance(balance);
        addToast({ status: "success", text: "Successfully saved"});
        setPlus("");
        setMinus("");
        setCategory("");
        setIsNewCategory(false);
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
            case "category":
                value === "New category" ? setIsNewCategory(true) : setCategory(value);
                break;
            default:
                return;
        }
    };

    return (
        <section className={styles.page}>
            <p>
                Currency rates:{" "}
                {rates
                    .map((rate) => `${rate.cc} - ${rate.rate.toFixed(2)}`)
                    .join(", ")}
            </p>

            <h2 className={styles.title}>Add accumulation</h2>

            <form className={styles.form} onSubmit={handleSubmit}>
                <MonthPicker onChange={handleChangeMonth} />

                <Input
                    name="plus"
                    label="Savings (UAH)"
                    value={plus}
                    type="number"
                    onChange={handleChange}
                />

                <Input
                    name="minus"
                    label="Costs (UAH)"
                    value={minus}
                    type="number"
                    onChange={handleChange}
                />

                {(store.allCategories.length === 0 || isNewCategory) && <Input
                    name="category"
                    label="Expense category (optional)"
                    value={category}
                    onChange={handleChange}
                />}

                {(store.allCategories.length > 0 && !isNewCategory) && <Select
                    name="category"
                    label="Expense category (optional)"
                    value={category}
                    onChange={handleChange}
                    options={[...store.allCategories.map(cat => cat.name), "New category"]}
                />}

                <Button
                    type="submit"
                    text="Save"
                />
            </form>
        </section>
    );
}
