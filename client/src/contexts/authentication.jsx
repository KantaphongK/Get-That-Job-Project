import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
// แก้ไข authentication

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const UserLogin = async (data) => {
    console.log("from authentication");
    console.log(data);
    const result = await axios.post(
      "http://localhost:4000/auth/user/login",
      data
    );
    const token = result.data.token;
    localStorage.setItem("token", token);
    const userDataFromToken = jwtDecode(token);
    console.log("this is token");
    console.log(token);
    setUserData({ userDataFromToken });
    console.log("this is userData");
    console.log(userData);
    navigate("/");
  };

  const RecruiterLogin = async (data) => {
    console.log("from authentication");
    console.log(data);
    const result = await axios.post(
      "http://localhost:4000/auth/recruiter/login",
      data
    );
    const token = result.data.token;
    localStorage.setItem("token", token);
    const userDataFromToken = jwtDecode(token);
    console.log("this is token");
    console.log(token);
    setUserData({ userDataFromToken });
    console.log("this is userData");
    console.log(userData);
    navigate("/");
  };

  const UserRegister = async (data) => {
    try {
      await axios.post("http://localhost:your-port/register", data);
      console.log("Registration successful");

      setUserData(data);
    } catch (error) {
      console.error("Error: unable to register the account", error);
    }
  };

  const RecruiterRegister = async (data) => {
    try {
      await axios.post("http://localhost:your-port/register", data);
      console.log("Registration successful");

      setUserData(data);
    } catch (error) {
      console.error("Error: unable to register the account", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ userData, UserLogin, RecruiterLogin, UserRegister, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
