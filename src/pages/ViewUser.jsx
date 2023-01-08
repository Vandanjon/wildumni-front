import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import NavBar from "../components/NavBar";

const ViewUser = () => {
    const { user } = useContext(UserContext);
    const [profile, setProfile] = useState([
        {
            firstName: "toto",
            lastName: "tata",
        },
    ]);

    return (
        <div id="UserPage" className="pageContainer">
            <section className="header">
                <NavBar />
            </section>

            <section className="main">Weclome</section>
            <section className="footer">
                <p>{profile[0].firstName}</p>

                <p>{profile[0].lastName}</p>
            </section>
        </div>
    );
};

export default ViewUser;
