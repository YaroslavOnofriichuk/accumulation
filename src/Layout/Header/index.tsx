import styles from "./Header.module.css";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useMst } from "../../store/Root";

export default function Header() {
    const navigate = useNavigate();
    const store = useMst();

    const handleClick = () => {
        if (store.isLoggedIn) {
            store.signOut();
            navigate("/add-data");
        } else {
            navigate("/login");
        }
    };

    return (
        <header className={styles.header}>
            
            <NavLink to="/add-data"><Logo /></NavLink>

            {store.isLoggedIn && <nav className={styles.navigation}>
                <ul>
                    <li>
                        <NavLink to="add-data">Add data</NavLink>
                    </li>
                    <li>
                        <NavLink to="result">Result</NavLink>
                    </li>
                    <li>
                        <NavLink to="instruction">Instruction</NavLink>
                    </li>
                    <li>
                        <NavLink to="developer">Developer</NavLink>
                    </li>
                </ul>
            </nav>}

            <Button text={store.isLoggedIn ? "Sign out" : "Sign in"} onClick={handleClick}/>
        </header>
    );
}
