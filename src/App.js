import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Exploreblog from "./components/Common/Exploreblog";
import UserEntry from "./components/UserEntryTabs/UserEntry";
import UserEntryTabs from "./pages/UserEntryTabs";
import PageNotFound from "./components/Common/PageNotFound";
import BlogApp from "./pages/BlogApp";
import OpenGate from "./components/Common/OpenGate";
import YourBlogs from "./components/BlogApp/YourBlogs";
import AllBlogs from "./pages/AllBlogs";

function App() {

  return (
    <div className="app">
    
    <Routes>
      <Route index element={<Home/>} />
      
      <Route path="/Home" element={<Home/>} />
      
      <Route path="/Home/:id" element={<Exploreblog/>} />
      
      <Route path="/UserEntryTabs" element={<UserEntryTabs/>} >
        
        <Route index element={<Navigate replace to="UserEntry?type=signup"/>} />
        <Route path="/UserEntryTabs/UserEntry" element={<UserEntry/>} />

      </Route>

      <Route path="/AllBlogs" element={<AllBlogs />} />

      <Route path="/BlogApp" element={
      
      <OpenGate>
        <BlogApp/>
      </OpenGate>} >

      </Route>

      <Route path="/BlogApp/YourBlogs" element={
        <OpenGate>
          <YourBlogs />
        </OpenGate>
      } />

      <Route path="*" element={<PageNotFound/>} />
    
    </Routes>

    </div>
  );
}

export default App;
