import "./App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

// components
import Home from "./components/Home";
import LoginAuth from "./components/login/LoginAuth";
import SignupAuth from "./components/login/SignUpAuth";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import ForgetPw from "./components/login/ForgetPw";
import Reset from "./components/login/Reset";
import Logout from "./components/login/Logout";

// redux
import { setIsAdmin } from "./features/ShowSlice";
import { setName } from "./features/ColorSlice";

//notification
// import { io } from "socket.io-client";
// import { Socket } from "socket.io-client/debug";

//portfolio components
import Sidebar from "./components/portfolio/SideBar";
import Theme from "./features/Theme";
import TemplateCollection from "./components/portfolio/templates/TemplateCollection";
import Template1 from "./components/portfolio/templates/template1/Template1";
import Form from "./components/portfolio/templates/Form";
import Template3 from "./components/portfolio/templates/template3/Template3";
import Template2 from "./components/portfolio/templates/template2/Template2";
import Loader from "./Loader";
// import Admin from "./components/Admin";

// const getTemplateId = () => {
//   const templateId = localStorage.getItem("templateId");
//   return templateId ? JSON.parse(templateId) : "";
// };

// const getuserId = () => {
//   const userId = localStorage.getItem("userId");
//   return userId ? JSON.parse(userId) : "";
// };

function App() {
  const [templateId, setTemplateId] = useState(1);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserId = () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        // Set a default userId when it's not found in local storage
        const defaultUserId = "6530b5133f9c1019f4cc64f9";
        localStorage.setItem("userId", JSON.stringify(defaultUserId));
        return defaultUserId;
      }
      return userId ? JSON.parse(userId) : "";
    };
    const userId = getUserId();
    axios
      .get(`http://localhost:4000/user/showDetails?userId=${userId}`)
      .then((response) => {
        console.log("templateId", response.data.result.template_id);

        setTemplateId(response.data.result.template_id);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // const dispatch = useDispatch();

  const renderTemplate = (templateId: any) => {
    switch (templateId) {
      case 1:
        return <Template1 />;
      case 2:
        return <Template2 />;
      case 3:
        return <Template3 />;
      default:
        return <Template1 />;
    }
  };

  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Login */}
          <Route path="login" element={<LoginAuth />} />
          <Route path="logout" element={<Logout />} />
          <Route path="signup" element={<SignupAuth />} />
          <Route path="/forgetpw" element={<ForgetPw />} />
          <Route path="/reset" element={<Reset />} />

          {/* Portfolio components */}
          <Route path="main/*" element={<Main />}>
            {/* <Route index element={<TemplateCollection />} /> */}
            {Loading ? (
              <Route path="editPortfolio" element={<Loader />} />
            ) : (
              <Route index element={renderTemplate(templateId)} />
            )}
            <Route path="templates" element={<TemplateCollection />} />
            {Loading ? (
              <Route path="editPortfolio" element={<Loader />} />
            ) : (
              <Route
                path="editPortfolio"
                element={renderTemplate(templateId)}
              />
            )}
            <Route path="myportfolio" element={renderTemplate(templateId)} />
            <Route path="template1" element={<Template1 />} />
            <Route path="template2" element={<Template2 />} />
            <Route path="template3" element={<Template3 />}></Route>
          </Route>
          <Route path="/allTemplates" element={<TemplateCollection />}></Route>
        </Routes>

        {/* seperate routes view full design */}
        <Routes>
          <Route
            path="/myportfolio"
            element={renderTemplate(templateId)}
          ></Route>
          <Route path="/template1" element={<Template1 />}></Route>
          <Route path="/template2" element={<Template2 />}></Route>
          <Route path="/template3" element={<Template3 />}></Route>
          <Route path="/form" element={<Form />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
