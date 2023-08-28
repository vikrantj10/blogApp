import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function PageNotFound() {
    return (
        <>
        <Navbar />
        <div className="pagenotfound">
            <img src="https://blog.thomasnet.com/hubfs/shutterstock_774749455.jpg" />
        </div>
        <Footer />
        </>
    );
}

export default PageNotFound;