import styles from "./Header.module.css";
import Logo from "../../components/Logo";
import { NavLink } from "react-router-dom";
import { useMst } from "../../store/Root";
import SignButton from "./SignButton";
import Menu from "./Menu";
import { useMatchMedia } from "../../hooks/useMatchMedia";

export default function Header() {
    const store = useMst();
    const { isMobile } = useMatchMedia();



    return (
        <header className={styles.header}> 
            <NavLink to="/add-data"><Logo /></NavLink>

            {(store.isLoggedIn && !isMobile) && <nav className={styles.navigation}>
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

            {isMobile ? <Menu /> : <SignButton />}
        </header>
    );
}
