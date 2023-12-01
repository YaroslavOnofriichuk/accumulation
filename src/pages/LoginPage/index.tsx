import { useState, FormEvent, SyntheticEvent } from "react";
import styles from "./Login.module.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router";
import { useMst } from "../../store/Root";
import useToast from "../../hooks/useToast";

export default function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const store = useMst();
    const { addToast } = useToast();

    const handleSubmit = (event: SyntheticEvent): void => {
        event.preventDefault();
        if (store.findUser(login.trim(), password.trim())) {
            store.signIn();
            navigate("/add-data");
        } else {
            addToast({ status: "error", text: "Login or password is incorrenct" });
        }
    };

    const handleChange = (event: FormEvent<HTMLInputElement>): void => {
        const { name, value } = event.currentTarget;
        name === "login" ? setLogin(value) : setPassword(value);
    };

    return (
        <section>
            <h2 className={styles.title}>Log in</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    name="login"
                    label="Login"
                    value={login}
                    onChange={handleChange}
                />

                <Input
                    name="password"
                    label="Password"
                    value={password}
                    onChange={handleChange}
                />

                <Button type="submit" text="Sign in"/>
            </form>
        </section>
    );
}
