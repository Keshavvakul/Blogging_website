import { useState } from "react";
import { Auth, DemoEmail, Button } from "../components";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { SigninInput } from "@keshavvakul/common";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Signin = () => {
  const navigate = useNavigate();
  const [getInputs, setGetInputs] = useState<SigninInput>({
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        getInputs,
      );
      const jwtToken = response.data;
      console.log(jwtToken.token);
      localStorage.setItem("Token", jwtToken.token);
      navigate("/allBlogs");
    } catch (e) {
      alert("Request Failed");
    }
  }

  const handelStateChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setGetInputs((c) => ({
        ...c,
        [field]: e.target.value,
      }));
    };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center">
        <div className="text-4xl flex justify-center font-extrabold">
          Dont have an account?
        </div>
        <div className="flex text-lg text-slate-600 justify-center gap-1">
          Create One by
          <Link to={"/signup"} className="underline px-1">
            signing up
          </Link>
        </div>

        <div className="py-11 flex flex-col gap-5">
          <Auth
            label="Email"
            placeholder="m@example.com"
            isPass={false}
            onchange={handelStateChange("email")}
          />
          <Auth
            label="Password"
            isPass={true}
            onchange={handelStateChange("password")}
          />
          <motion.div whileTap={{ scale: 0.9 }} className="flex justify-center">
            <Button onclick={sendRequest} buttonType="Sign In" />
          </motion.div>
        </div>
      </div>
      <DemoEmail />
    </div>
  );
};

export default Signin;
