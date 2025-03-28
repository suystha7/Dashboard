// import { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { InputField } from "@/components/basic/InputField";
// import { Button } from "@/components/ui/button";

// const Login = () => {
//   const { login, token } = useContext(AuthContext);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({
//     username: "",
//     password: "",
//     general: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (token) {
//       navigate("/");
//     }
//   }, [token, navigate]);

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const handleSignIn = async (e) => {
//     e.preventDefault();

//     let newErrors = { username: "", password: "", general: "" };
//     if (!username.trim()) newErrors.username = "Please enter your username.";
//     if (!password.trim()) newErrors.password = "Please enter your password.";

//     setErrors(newErrors);
//     if (newErrors.username || newErrors.password) return;

//     setLoading(true);

//     try {
//       const response = await fetch(
//         "http://montessori.website/common/gettoken/",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ username, password }),
//         }
//       );

//       if (!response.ok) throw new Error("Invalid username or password.");

//       const data = await response.json();
//       const { access, refresh } = data;

//       if (!access || !refresh) throw new Error("Authentication failed.");

//       localStorage.setItem("accessToken", access);
//       localStorage.setItem("refreshToken", refresh);
//       login(access);
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//       setErrors((prev) => ({
//         ...prev,
//         general: "Failed to authenticate. Please try again.",
//       }));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
//       <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
//           LOGIN
//         </h2>

//         <form onSubmit={handleSignIn} className="flex flex-col gap-6">
//           <InputField
//             label="Username"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             error={errors.username}
//             placeholder="Enter your username"
//           />
//           <InputField
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             error={errors.password}
//             placeholder="Enter your password"
//             showPassword={showPassword}
//             togglePasswordVisibility={togglePasswordVisibility}
//           />

//           {errors.general && (
//             <p className="text-red-500 text-sm">{errors.general}</p>
//           )}

//           <Button variant="default" size="lg" type="submit" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, token } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  // Redirect to dashboard after login
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  // Function to validate email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Function to handle email change & validation
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value.trim()) {
      setErrors((prev) => ({ ...prev, email: "Please enter your email." }));
    } else if (!isValidEmail(e.target.value)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address." }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" })); // Remove error if valid
    }
  };

  // Function to handle password change & validation
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!e.target.value.trim()) {
      setErrors((prev) => ({ ...prev, password: "Please enter your password." }));
    } else if (e.target.value.length < 6) {
      setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters." }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" })); // Remove error if valid
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    let newErrors = { email: "", password: "" };

    // Final validation check before submitting
    if (!email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password.trim()) {
      newErrors.password = "Please enter your password.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    // Prevent login if errors exist
    if (newErrors.email || newErrors.password) {
      return;
    }

    // Dummy authentication
    const uniqueDummyToken = `fake-jwt-token-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    // Store the token in local storage
    localStorage.setItem("authToken", uniqueDummyToken);
  
    // Call the login function with the generated token
    login(uniqueDummyToken);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Login</h2>
        
        <form onSubmit={handleSignIn} className="flex flex-col gap-6">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className={`p-3 border rounded-lg focus:outline-none transition-all ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
              }`}
              autoComplete="off"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              value={password}  
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className={`p-3 border rounded-lg focus:outline-none transition-all ${
                errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
              }`}
              autoComplete="new-password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all text-lg font-bold shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;