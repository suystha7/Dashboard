import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { Toaster, toast } from "react-hot-toast";
import Login from "./pages/AuthPages/Login";
import Layout from "./components/Layout";
import Home from "./pages/OtherPages/Home";
import Hero from "./pages/OtherPages/Hero";
import Facilities from "./pages/OtherPages/Facilities";
import Activities from "./pages/OtherPages/Activities";
import Contact from "./pages/OtherPages/Contact";
import "./index.css";

const PrivateRoute = ({ element }) => {
  const { token } = useContext(AuthContext);
  return token ? element : <Navigate to="/login" replace />;
};

const App = () => {
  const { token, loading } = useContext(AuthContext);

  useEffect(() => {
    if (loading) {
      toast.loading("Checking authentication...");
    }
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>; // Show loading screen
  }

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        {/* Public Route */}
        <Route
          path="/login"
          element={
            !token ? (
              <Login />
            ) : (
              (() => {
                toast.success("You're logged in!");
                return <Navigate to="/" replace />;
              })()
            )
          }
        />

        {/* Protected Routes under Layout */}
        <Route path="/" element={<PrivateRoute element={<Layout />} />}>
          <Route index element={<Home />} />
          <Route path="hero" element={<Hero />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path="activities" element={<Activities />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Catch-all for unauthorized access */}
        <Route
          path="*"
          element={<Navigate to={token ? "/" : "/login"} replace />}
        />
      </Routes>
    </>
  );
};

export default App;
