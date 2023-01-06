import { useEffect, useState } from "react";
import axios from "axios";

const ViewAdmin = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        axios
            .get("http://localhost:8001/users/")
            .then((res) => {
                console.log(res.data);
                setUsers(res.data);
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                }
            });
    }, []);

    return (
        <>
            <h1>Admin Panel</h1>

            {users
                ? users.map((user) => (
                      <section>
                          <article>
                              <h1>{user.firstName}</h1>
                              <p>{user.email}</p>
                              <p>{user.address.country}</p>
                          </article>

                          <button>EDIT</button>

                          <button>DELETE</button>
                      </section>
                  ))
                : ""}
        </>
    );
};

export default ViewAdmin;
