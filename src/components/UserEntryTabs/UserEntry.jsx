import { useState } from "react";
import { toast } from "react-hot-toast";
import {FcGoogle} from "react-icons/fc";
import Loader from "../Common/Loader";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { set } from "../../slices/userslice";
import { setloader } from "../../slices/loaderslice";

function UserEntry() {

    const loadingstate = useSelector((store) => store.loading);
    const {loading} = loadingstate;
    const [otpfield, setotpfield] = useState("Generate OTP");
    const [details,setdetails] = useState({
    });
    const [serachparams,setsearchparams] = useSearchParams();
    const navigate = useNavigate();
    const signup = serachparams.get("type")==="signup" ? true : false;
    const dispatch = useDispatch();


    async function onclickotphandler(e){
        e.preventDefault();
        try{
            dispatch(setloader());
            const response = await fetch("http://localhost:4000/sendotp", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    email : details.email,
                })
            });

            if(response.status===400)
            toast.error(data.message);

            if(response.status===200)
            setotpfield("Resend OTP");
            
            const data = await response.json();
            toast.success(data.message);

        }catch(e){
            console.log("Unable to make a request");
            toast.error("Server error");
        }
        finally{
            dispatch(setloader());
        }
    }

    async function onsubmithandler(e){
        e.preventDefault();
        try{
            dispatch(setloader());

            let response;

            if(signup){
                response = await fetch("http://localhost:4000/signup", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    email : details.email,
                    name : details.name,
                    password : details.password,
                    otp : details.otp
                })
            });
                const data = await response.json();

                if(response.status==400)
                toast.error(data.message);
            
                if(response.status===200)
                {
                    toast.success(data.message);
                    setsearchparams((prev) => prev.type = 'login');
                }
            }
            else{
                response = await fetch("http://localhost:4000/login", {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify({
                        email : details.email,
                        password : details.password,
                    })
                });
                const data = await response.json();

                if(response.status===400)
                toast.error(data.message);
                if(response.status===200)
                {
                    dispatch(set({user : data.user}));
                    Cookies.set("token",data.token,{
                        expires : 1
                    })
                    toast.success(data.message);
                    navigate("/BlogApp");
                }
            }

        }catch(e){
            console.log("Unable to make a request");
            toast.error("Server error");
        }
        finally{
            dispatch(setloader());
        }
    }

    return (
        <div className={`userentry ${loading ? 'active' : ''}`}>            
            <div className={`entryform ${signup ? '' : 'switchorder'}`}>
                
                <h3>Welcome, {signup ? 'Register with us' : 'Log in now!'}</h3>
                <p>Please enter your details</p>
                
                <div className="entrymode">
                    <FcGoogle />
                    <p>{signup ? 'Sign up' : 'Log in'} with Google</p>
                </div>

                <div className="divider">
                    <p>or</p>
                </div>

                <div className="form">
                    
                    {signup && (
                    <form onSubmit={onsubmithandler}>
                        <input type="email" placeholder="Email" onChange={(e) => setdetails({...details,email : e.target.value})}/>
                        <input type="text" placeholder="Full Name" onChange={(e) => setdetails({...details,name : e.target.value})}/>
                        <input type="password" placeholder="Password" onChange={(e) => setdetails({...details,password : e.target.value})}/>
                        <div className="otp">
                            <input type="text" placeholder="OTP" onChange={(e) => setdetails({...details,otp : e.target.value})}/>
                            <button onClick={onclickotphandler}>{otpfield}</button>
                        </div>
                        <input type="submit" value="Sign up" id="signupbtn"/>
                    </form> )}

                    {!signup && (
                    <form onSubmit={onsubmithandler}>
                        <input type="email" placeholder="Email" onChange={(e) => setdetails({...details,email : e.target.value})}/>
                        <input type="password" placeholder="Password" onChange={(e) => setdetails({...details,password : e.target.value})}/>
                        <input type="submit" value="Log in" id="signupbtn"/>
                    </form> )}

                </div>

            </div>

            <div className="entryposter">
                <img height={"100%"} src="https://img.freepik.com/premium-photo/how-start-blog-blogging-beginners-ways-monetize-your-blog-blog-word-table-with-laptop_72482-5630.jpg" alt="entryposter" />
            </div>

            {loading && <Loader/>}

        </div>
    );
}

export default UserEntry;