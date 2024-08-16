import { Auth, Button, DemoEmail } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import React from "react";
import { SignupInput } from "@keshavvakul/common";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Signup = () => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequests() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        postInputs,
      );
      const jwtToken = response.data;
      localStorage.setItem("Token", jwtToken);
      navigate("/allBlogs");
    } catch (e) {
      // alert the user that the request failed
      alert("Request failed");
      console.log(e);
    }
  }

  const handleStateChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPostInputs((c) => ({
        ...c,
        [field]: e.target.value,
      }));
    };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center gap-1">
        <div className="text-4xl flex justify-center font-extrabold">
          Create an account
        </div>
        <div className="flex text-lg text-slate-600 justify-center gap-1">
          Already have an account?
          <Link to="/signin" className="underline">
            Login
          </Link>
        </div>
        <div className="py-11 flex flex-col gap-5">
           <Auth
            label="Name"
            placeholder="Enter your name"
            isPass={false}
            onchange={handleStateChange("name")}
          />
          <Auth
            label="Email"
            placeholder="Enter your email"
            isPass={false}
            onchange={handleStateChange("email")}
          />
          <Auth
            label="Password"
            isPass={true}
            onchange={handleStateChange("password")}
          />
          <motion.div whileTap={{ scale: 0.9 }} className="flex justify-center">
            <Button onclick={sendRequests} buttonType="Sign Up" />
          </motion.div>
        </div>
      </div>
      <div className="hidden lg:block">
        <DemoEmail />
      </div>
    </div>
  );
};

export default Signup;
