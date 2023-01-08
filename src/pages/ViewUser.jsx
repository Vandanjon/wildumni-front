import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const ViewUser = () => {
    const { user } = useContext(UserContext);
    console.log(user);
    return (
        <div id="UserPage" className="pageContainer">
            <section className="header">
                <NavBar />
            </section>
            <section className="main">Weclome</section>
            <section className="footer">Welcome</section>
        </div>
    );
};

export default ViewUser;
