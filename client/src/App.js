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
import MyInfo from "./components/MyInfo";
import MySuggestions from "./components/MySuggestions";
import NewSuggestion from "./components/NewSuggestion";
import BusinessInfo from "./components/BusinessInfo";

const App = () => {
  return (
    <Fragment>
      <NavBar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact-us" element={<ContactUs />} />
          <Route exact path="/dashboard" element={<Dashboard />}>
            <Route exact path="bookmark-list" element={<BookmarkList />} />
            <Route exact path="my-info" element={<MyInfo />} />
            <Route exact path="my-suggestions" element={<MySuggestions />} />
            <Route exact path="new-suggestions" element={<NewSuggestion />} />
          </Route>
          <Route exact path="/business-info">
            <Route exact path=":id" element={<BusinessInfo />} />
          </Route>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/not-found" element={<Err404 />} />
          <Route exact path="/*" element={<Err404 />} />
        </Routes>
      </Router>
    </Fragment>
  );
};
export default App;

