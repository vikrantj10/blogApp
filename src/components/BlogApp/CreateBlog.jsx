import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { addblog, deleteblog, setcreateblogactive, updateblog } from "../../slices/blogslice";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { addblogtouser } from "../../slices/userslice";
import { setloader } from "../../slices/loaderslice";
import Loader from "../Common/Loader";

function CreateBlog({}) {

    const dispatch = useDispatch();
    const loadingstate = useSelector((store)=>store.loading);
    const blogstate = useSelector((store) => store.blog);
    const {type, selectedid, blogs} = blogstate;
    const {loading} = loadingstate;
    const [details,setdetails] = useState({
        title: '',
        description: '',
        category: 'Sports', 
        tags: '',
        file: null,
    });

    const blog = blogs.filter((blog) => blog._id === selectedid);
    const {title, description, tags} = type === "updateblog" ? blog[0] : '';

    useEffect(() => {
      if(type==="updateblog"){
        setdetails({title,description,tags});
      }
    },[]);

    function onclickcrosshandler(){
        dispatch(setcreateblogactive({value : false}));
    }

    async function onsubmitformhandler(e) {
      e.preventDefault();
      try {
        dispatch(setloader());
        
        const formdata = new FormData();
    
        formdata.append('title', details.title);
        formdata.append('description', details.description);
        formdata.append('tags', details.tags);
        formdata.append('file', details.file);
        formdata.append('category', details.category);

        if(type==="updateblog")
        formdata.append('blogid', selectedid);
    
        let response;

        if(type==="createblog"){
          response = await fetch(`http://localhost:4000/${type}`, {
            method : "POST",
            credentials : "include",
            body : formdata,
            mode : "cors",
          })
        }
        else if(type==="updateblog"){
          response = await fetch(`http://localhost:4000/${type}`, {
            method : "PUT",
            credentials : "include",
            body : formdata,
          })
        }
        else{
          response = await fetch(`http://localhost:4000/${type}`, {
            method : "DELETE",
            headers : {
              "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                blogid : selectedid,
            }),
            credentials : "include",
          })
        }

        const data = await response.json();

        if (!data.success)
          toast.error(data.message);
    
        if (data.success)
        {
          if(type==="createblog")
          {
              dispatch(addblog({blog : data.blog}));
              dispatch(addblogtouser({blog : data.blog}));
          }
          else if(type==='updateblog'){
              dispatch(updateblog({updatedblog : data.updatedblog}));
          }
          else{
              dispatch(deleteblog({blogid : selectedid}));
          }
          toast.success(data.message);
          dispatch(setcreateblogactive({value : false}));
        }

      } catch (e) {
        console.log("Error", e);
        toast.error("Server error, please try again later!");
      }
      finally{
        dispatch(setloader());
      }
    }

    return (
        <div className="createblog">

            {loading && <Loader />}

            <div className="crossbutton">
                <ImCross onClick={onclickcrosshandler} />
            </div>

            <div className="header">
                <h1>{type==="createblog" ? "Create Your Blog " : `${title}`}</h1>
                <p>{type==="createblog" ? "Add all your blog details" : "Edit your required details"}</p>
            </div>

            <div className="formcontainer">
                <form onSubmit={(e) => onsubmitformhandler(e)}>
                    <input type="text" placeholder="Blog Title" value={details.title} onChange={(e) => setdetails({...details,title : e.target.value})}/>
                    <textarea value={details.description} placeholder="Provide Description" rows="10" onChange={(e) => setdetails({...details,description : e.target.value})}/>
                    
                    <div className="choosecategory">

                    <h3>Choose blog category</h3>
                    
                    <select value={details.category} onChange={(e) => setdetails({...details,category : e.target.value})}>
                        <option>Sports</option>
                        <option>Education</option>
                        <option>Technology</option>
                    </select>
                    
                    </div>

                    <input type="text" value={details.tags} placeholder="Give tags regarding your blog, @eg. tag1,tag2,tag3" onChange={(e) => setdetails({...details,tags : e.target.value})}/>
                    <input type="file" placeholder="Upload cover for your blog" onChange={(e) => setdetails({...details,file : e.target.files[0]})}/>
                    <input className="createblogsubmit" type="submit" value={type==="createblog" ? "Publish" : "Update"} />
                </form>
            </div>

        </div>
    );
}

export default CreateBlog;