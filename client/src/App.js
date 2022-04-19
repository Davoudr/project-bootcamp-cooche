import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { Fragment } from "react";
import { Navifate, Outlet } from "react";
import NavBar from "./components/NavBar";
import ContactUs from "./components/ContactUs";
import BookmarkList from "./components/BookmarkList";
import Comments from "./components/Comments";
import Err404 from "./components/Err404";
import MyProfile from "./components/MyProfile";
import MySuggestions from "./components/MySuggestions";
import NewSuggestion from "./components/NewSuggestion";
import BusinessInfo from "./components/BusinessInfo";
import Auth0ProviderWithNavigate from "./other/auth0Provider";
import Test from "./components/Test";
import MsgBox from "./components/MsgBox";
import Footer from "./components/Footer/Footer";
// -----------------------
import styled from "styled-components";
import { useContext } from "react";
import { AppContext } from "./other/AppContext";
// -----------------------
const App = () => {
  // -----------------------
  const { message, setMessage, darkMode } = useContext(AppContext);
  // -----------------------
  return (
    <Wrapper className={darkMode ? `dark` : `light`}>
      <Router>
        <Auth0ProviderWithNavigate>
          <NavBar />
          <Msg className="alert">{message.status && <MsgBox />}</Msg>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact-us" element={<ContactUs />} />
            <Route exact path="/dashboard" element={<Dashboard />}>
              <Route exact path="bookmark-list" element={<BookmarkList />} />
              <Route exact path="profile" element={<MyProfile />} />
              <Route exact path="my-suggestions" element={<MySuggestions />} />
              <Route exact path="new-suggestions" element={<NewSuggestion />} />
            </Route>
            <Route exact path="/business-info">
              <Route exact path=":id" element={<BusinessInfo />} />
            </Route>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/test" element={<Test />} />
            <Route exact path="/not-found" element={<Err404 />} />
            <Route exact path="/*" element={<Err404 />} />
          </Routes>
          <Footer />
        </Auth0ProviderWithNavigate>
      </Router>
    </Wrapper>
  );
};
export default App;

const Msg = styled.div`
  z-index: 100;
  position: absolute;
`;
const Wrapper = styled.div`
  display: block;
  margin: auto;


`;
