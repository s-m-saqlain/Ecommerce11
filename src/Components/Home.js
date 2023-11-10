import React, { useState, useEffect } from "react";

const Home = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUserData(user);
        }

    }, []);

    return (
        <>
            <h1>the</h1>
            {userData && (
                <div>
                    <p>Username: {userData.first_name}</p>
                    <p>Username: {userData.last_name}</p>
                    <p>Username: {userData.email}</p>
                    <p>Username: {userData.phone}</p>
                </div>
            )}
        </>
    )
}

export default Home