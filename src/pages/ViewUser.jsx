import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import NavBar from "../components/NavBar";

const ViewUser = () => {
    const { user } = useContext(UserContext);

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
