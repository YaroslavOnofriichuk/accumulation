import styles from "./Header.module.css";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/login");
    };

    return (
        <header className={styles.header}>
            
            <NavLink to="/add-data"><Logo /></NavLink>

            <nav className={styles.navigation}>
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
            </nav>

            <Button text="sign in" onClick={handleClick}/>
        </header>
    );
}
