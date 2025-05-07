// import {
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
//   useNavigate,
// } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "./context/AuthContext";
// import { Toaster, toast } from "react-hot-toast";
// import Login from "./pages/AuthPages/Login";
// import Layout from "./components/Layout";
// import Home from "./pages/OtherPages/Home";
// import Hero from "./pages/OtherPages/Hero";
// import Facilities from "./pages/OtherPages/Facilities";
// import Activities from "./pages/OtherPages/Activities";
// import Contact from "./pages/OtherPages/Contact";
// import "./index.css";
// import HeroForm from "./components/forms/HeroForm";
// import FacilityForm from "./components/forms/FacilityForm";
// import ActivityForm from "./components/forms/ActivityForm";
// import Testimonials from "./pages/OtherPages/Testimonials";
// import TestimonialForm from "./components/forms/TestimonialForm";
// const App = () => {
//   const { token } = useContext(AuthContext);
//   const [loading, setIsLoading] = useState(false);

//   const [toastShown, setToastShown] = useState(false); // Track if toast is already shown
//   const location = useLocation(); // Get current location
//   const navigate = useNavigate(); // To navigate programmatically

//   useEffect(() => {
//     if (loading) {
//       setIsLoading(true);
//     } else {
//       setIsLoading(false);
//     }

//     // Save the current location to localStorage when the location changes
//     localStorage.setItem("currentRoute", location.pathname);
//   }, [loading, location]);

//   useEffect(() => {
//     // On reload, check if the user has a valid token and if there's a saved route
//     const savedRoute = localStorage.getItem("currentRoute");
//     if (savedRoute) {
//       navigate(savedRoute); // Navigate to the saved route
//     }
//   }, [navigate]);

//   useEffect(() => {
//     if (token) {
//       toast.success("You're logged in!");
//       setToastShown(true); // Ensure toast is shown only once
//     }
//   }, [toastShown]);
//   console.log(token);

//   return (
//     <>
//       <Toaster position="top-center" />
//       <Routes>

//         {/* Public Route */}
//         <Route
//           path="/login"
//           element={
//             !token ? (
//               <Login />
//             ) : (
//               (() => {
//                 return <Navigate to="/login" />;
//               })()
//             )
//           }
//         />

//         {/* Protected Routes under Layout */}
//         <Route path="/" element={token ? <Layout /> : <Navigate to="/login" />}>
//           <Route index element={<Home />} />
//           {/* <Route path="hero" element={token ? <Hero /> : <Navigate to="/login" replace />} /> */}
//           {/* <Route path="hero">
//                  <Route index element={token ? <Hero /> : <Navigate to="/login" replace />}/>
//                  <Route path="addHero" element={<HeroForm/>} />
//                  <Route path="editHero/:id" element={<HeroForm/>} />
//           </Route> */}
//           {/* <Route path="facilities" element={token ? <Facilities /> : <Navigate to="/login" replace />} /> */}
//           <Route path="facilities">
//             <Route
//               index
//               element={
//                 token ? <Facilities /> : <Navigate to="/login" replace />
//               }
//             />
//             <Route path="addFacility" element={<FacilityForm />} />
//             <Route path="editFacility/:id" element={<FacilityForm />} />
//           </Route>
//           {/* <Route path="activities" element={token ? <Activities /> : <Navigate to="/login" replace />} /> */}
//           <Route path="activities">
//             <Route
//               index
//               element={
//                 token ? <Activities /> : <Navigate to="/login" replace />
//               }
//             />
//             <Route path="addActivity" element={<ActivityForm />} />
//             <Route path="editActivity/:id" element={<ActivityForm />} />
//           </Route>
//           {/* <Route path="testimonials" element={token ? <Testimonials /> : <Navigate to="/login" replace />} /> */}
//           <Route path="testimonials">
//             <Route
//               index
//               element={
//                 token ? <Testimonials /> : <Navigate to="/login" replace />
//               }
//             />
//             <Route path="addTestimonial" element={<TestimonialForm />} />
//             <Route path="edtiTestimonial/:id" element={<TestimonialForm />} />
//           </Route>
//           <Route
//             path="contact"
//             element={token ? <Contact /> : <Navigate to="/login" replace />}
//           />
//         </Route>

//         {/* Catch-all for unauthorized access */}
//         <Route
//           path="*"
//           element={<Navigate to={token ? "/" : "/login"} replace />}
//         />
//       </Routes>
//     </>
//   );
// };

// export default App;



import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
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
import HeroForm from "./components/forms/HeroForm";
import FacilityForm from "./components/forms/FacilityForm";
import ActivityForm from "./components/forms/ActivityForm";
import Testimonials from "./pages/OtherPages/Testimonials";
import TestimonialForm from "./components/forms/TestimonialForm";
import Settings from "./pages/OtherPages/Settings";
import GlobalSettingsForm from "./components/forms/GlobalSettingsForm";
const App = () => {
  const { token } = useContext(AuthContext);
  const [loading, setIsLoading] = useState(false);

  const [toastShown, setToastShown] = useState(false); // Track if toast is already shown
  const location = useLocation(); // Get current location
  const navigate = useNavigate(); // To navigate programmatically

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    // Save the current location to localStorage when the location changes
    localStorage.setItem("currentRoute", location.pathname);
  }, [loading, location]);

  useEffect(() => {
    // On reload, check if the user has a valid token and if there's a saved route
    const savedRoute = localStorage.getItem("currentRoute");
    if (savedRoute) {
      navigate(savedRoute); // Navigate to the saved route
    }
  }, [navigate]);

  useEffect(() => {
    if (token) {
      toast.success("You're logged in!");
      setToastShown(true); // Ensure toast is shown only once
    }
  }, [toastShown]);

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
                return <Navigate to="/login" />;
              })()
            )
          }
        />

        {/* Protected Routes under Layout */}
        {token ? (
          <Route
            path="/"
            element={token ? <Layout /> : <Navigate to="/login" />}
          >
            <Route index element={<Home />} />
            <Route path="facilities">
              <Route
                index
                element={
                  token ? <Facilities /> : <Navigate to="/login" replace />
                }
              />
              <Route path="addFacility" element={<FacilityForm />} />
              <Route path="editFacility/:id" element={<FacilityForm />} />
            </Route>
            {/* <Route path="activities" element={token ? <Activities /> : <Navigate to="/login" replace />} /> */}
            <Route path="activities">
              <Route
                index
                element={
                  token ? <Activities /> : <Navigate to="/login" replace />
                }
              />
              <Route path="addActivity" element={<ActivityForm />} />
              <Route path="editActivity/:id" element={<ActivityForm />} />
            </Route>
            {/* <Route path="testimonials" element={token ? <Testimonials /> : <Navigate to="/login" replace />} /> */}
            <Route path="testimonials">
              <Route
                index
                element={
                  token ? <Testimonials /> : <Navigate to="/login" replace />
                }
              />
              <Route path="addTestimonial" element={<TestimonialForm />} />
              <Route path="edtiTestimonial/:id" element={<TestimonialForm />} />
            </Route>
            <Route
              path="contact"
              element={token ? <Contact /> : <Navigate to="/login" replace />}
            />
             {/* <Route
              path="settings"
              element={token ? <Settings /> : <Navigate to="/login" replace />}
            /> */}
             <Route path="settings">
              <Route
                index
                element={
                  token ? <Settings /> : <Navigate to="/login" replace />
                }
              />
              <Route path="add" element={<GlobalSettingsForm />} />
              <Route path="edit/:id" element={<GlobalSettingsForm />} />
             
            </Route>
            
          </Route>
          
        ) : (
          <Route
            path="*"
            element={<Login/>}
          />
        )}

        {/* Catch-all for unauthorized access */}
      </Routes>
    </>
  );
};

export default App;
