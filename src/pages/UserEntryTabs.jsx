import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Common/Navbar";
import Footer from "../components/Common/Footer";

function UserEntryTabs() {
    const [signup, setsignup] = useState(true);

    function switchtab(type) {
        if(signup && type==="signup")
        return;
        setsignup(!signup);
    }

    return (
        <>
        <Navbar />
        <div className="userentrytabs">
            <div className="switchuserentrytabs">
                <div className={`signuptab ${signup ? 'switchtabbg' : ''}`}>
                    <Link style={{ color: signup ? 'black' : 'white' }} onClick={() => switchtab("signup")} to="UserEntry?type=signup">Sign up</Link>
                </div>

                <div className={`logintab ${!signup ? 'switchtabbg' : ''}`}>
                    <Link style={{ color: !signup ? 'black' : 'white' }} onClick={() => switchtab("login")} to="UserEntry?type=login">Log in</Link>
                </div>
            </div>

            <div className="userentrytabscontent">
                <Outlet/>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default UserEntryTabs;
