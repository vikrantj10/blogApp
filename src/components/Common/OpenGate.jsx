import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function OpenGate({ children }) {
  const isauth = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isauth) {
      toast.error("Please log in first!");
      navigate("/UserEntryTabs/UserEntry");
    }
  }, [isauth, navigate]);

  return children;
}

export default OpenGate;