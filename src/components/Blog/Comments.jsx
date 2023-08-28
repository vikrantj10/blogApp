import { toast } from "react-hot-toast";
import { timeinago } from "../../utils/utils";
import { FaDeleteLeft } from "react-icons/fa6"
import { useDispatch, useSelector } from "react-redux";
import { removecomment } from "../../slices/blogslice";
import { setloader } from "../../slices/loaderslice";

function Comments({id, commentdata}) {
    const userstate = useSelector((store) => store.user);
    const {user} = userstate;
    const username= commentdata.users[0].name;
    const avatar = commentdata.users[0].avatar;
    const comment = commentdata.description;
    const time= timeinago(commentdata.time);
    const dispatch = useDispatch();

    async function onclickdeletehandler() {
        if(user._id!==commentdata.users[0]._id)
        return;
        try{
            dispatch(setloader());
            const response = await fetch("http://localhost:4000/deletecomment", {
                method : "DELETE",
                headers : {
                    "content-type" : "application/json",
                },
                credentials : "include",
                mode : "cors",
                body : JSON.stringify({
                    commentid : commentdata._id,
                    blogid : id,
                })
            });
            const data = await response.json();

            if(!data.success)
            toast.error(data.message);

            if(data.success){
                toast.success(data.message);
                dispatch(removecomment({
                    blogid : id,
                    commentid : commentdata._id,
                }))
            }

        }catch(e){
            console.log(e);
            toast.error("Server error, please try again later!");
        }
        finally{
            dispatch(setloader());
        }
    }


    return (
        <div className="comments">
            <div className="useravatar">
                <img src={avatar} alt="USER" />
            </div>

            <div className="commentdata">

                <div className="usertime">
                    <p style={{fontWeight : "900", fontSize : "1.2rem"}}>{username}</p>
                    <p style={{color : "var(--timecolor)"}}>{time}</p>
                    {user._id===commentdata.users[0]._id && <FaDeleteLeft onClick={onclickdeletehandler} /> }
                </div>

                <div className="actualcomment">
                    <p>{comment}Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nihil deserunt, placeat voluptates impedit fugit quam asperiores fuga, animi ipsa, modi hic? Suscipit dolorum labore sapiente doloribus obcaecati, repellendus eius?</p>     
                </div>

            </div>

        </div>
        
    );
}

export default Comments;