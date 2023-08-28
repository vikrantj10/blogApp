import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setcreateblogactive, settype } from "../../slices/blogslice";

function Blogbtn({title,link}) {
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    function onclickhandler(){

        if(link==="CreateBlog")
        {
            dispatch(setcreateblogactive({value : true}));
            dispatch(settype({type : "createblog"}));
        }
        else
            Navigate(link);
    }
    return (
        <div className="blogbtn">
            <button onClick={onclickhandler}>{title}</button>
        </div>
    );
}

export default Blogbtn;