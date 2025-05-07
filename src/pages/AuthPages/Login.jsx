import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { InputField } from "@/components/basic/InputField";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { BASE_URL, API_PATHS } from "@/utils/apiPaths";

const Login = () => {
  const { login, token } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    let newErrors = { username: "", password: "", general: "" };
    if (!username.trim()) newErrors.username = "Please enter your username.";
    if (!password.trim()) newErrors.password = "Please enter your password.";

    setErrors(newErrors);
    if (newErrors.username || newErrors.password) return;

    setLoading(true);

    try {
      // const response = await fetch(`${BASE_URL}${API_PATHS.AUTH.LOGIN}`,
      const response = await fetch("http://starkids.website/common/gettoken",
      // const response = await fetch("https://starkids-backend-leuf.onrender.com/common/gettoken",
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Invalid username or password.");

      const data = await response.json();
      const { access, refresh } = data;

      if (!access || !refresh) throw new Error("Authentication failed.");

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      console.log("AccessToken",access);
      login(access);
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrors((prev) => ({
        ...prev,
        general: "Failed to authenticate. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-blue-500 to-green-500">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          LOGIN
        </h2>

        <form onSubmit={handleSignIn} className="flex flex-col gap-6">
          <InputField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username}
            placeholder="Enter your username"
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="Enter your password"
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />

          {errors.general && (
            <p className="text-red-500 text-sm">{errors.general}</p>
          )}

          <Button variant="default" size="lg" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

