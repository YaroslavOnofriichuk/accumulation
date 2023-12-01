import { NavLink } from "react-router-dom";
import styles from "./Menu.module.css";
import SignButton from "../SignButton";

export default function Menu() {
    return (
        <nav role="navigation">
            <div className={styles.menuToggle}>
                <input type="checkbox" />

                <span></span>
                <span></span>
                <span></span>

                <ul className={styles.menu}>
                    <NavLink to="add-data">
                        <li>Add data</li>
                    </NavLink>
                    <NavLink to="result">
                        <li>Result</li>
                    </NavLink>
                    <NavLink to="instruction">
                        <li>Instruction</li>
                    </NavLink>
                    <NavLink to="developer">
                        <li>Developer</li>
                    </NavLink>
                    <li>
                        <SignButton />
                    </li>
                </ul>
            </div>
        </nav>
    );
}
