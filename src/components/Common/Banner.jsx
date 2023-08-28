import { lazy } from "react";

function Banner({title, src}) {
    return (
        <div className="banner">
            <img src={src} alt="banner"/>
            <h5>{title}</h5>
        </div>
    );
}

export default Banner;