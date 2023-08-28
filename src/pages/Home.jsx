import { useEffect } from "react";
import Banner from "../components/Common/Banner";
import Loader from "../components/Common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { set } from "../slices/blogslice";
import Blogs from "../components/Blog/Blogs";
import Navbar from "../components/Common/Navbar";
import Footer from "../components/Common/Footer";
import { setloader } from "../slices/loaderslice";

function Home() {
    const dispatch = useDispatch();
    const loadingstate = useSelector((store) => store.loading);
    const {loading} = loadingstate;

    useEffect(() => {
        async function getblogs(){
            try{
            dispatch(setloader());
            const response = await fetch("http://localhost:4000/getallblogdetails");
            const data = await response.json();
            dispatch(set({
                blogs : data.blogs,
            }));
            }catch(e){
                console.log(e);
            }
            finally{
                dispatch(setloader());
            }
        }
        getblogs();
    },[]);

    return (
        <>
        <Navbar />
        <div className={`home ${loading ? 'active' : ''}`}>
            { loading && <Loader /> }
            <Banner src="https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/6401429285ee7e5c59db07b5_6401398a90bc649daba3575e_screenshot-of-moody-doulas-website-dark-mode.png" title="Read Our Blog"/>
            <Blogs heading="Explore our weekly blog collection below" description="Discover a treasure trove of weekly blog insights and stories, Embark on a weekly journey through thought-provoking blogs right at your fingertips"/>
        </div>
        <Footer />
        </>
    );
}

export default Home;