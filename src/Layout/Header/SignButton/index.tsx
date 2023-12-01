import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button"
import { useMst } from "../../../store/Root";

export default function SignButton() {
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

    return <Button text={store.isLoggedIn ? "Sign out" : "Sign in"} onClick={handleClick}/>
}