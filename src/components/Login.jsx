import { useState} from "react";
import axios from "axios";
import { rootAPI } from "../utils/ip";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import ImageCarousel from "./ImageCarousel";

const Login = () => {

    const navigate = useNavigate();

    const { saveToken } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            setMsg("Please fill in all fields");
            return;
        } else {
            try {
                const response = await axios.post(`${rootAPI}/login`, {
                    email,
                    password,
                });
                const token = response.data.access_token;
                saveToken(token);
                setMsg("");

                navigate("/code-problem");
            } catch (error) {
                setMsg(error.response.data.msg);
                console.log(error.response.data.msg);
            }
        }
    };

    return (
        <div className="flex flex-col sm:flex-row w-full h-[100vh] rounded-xl bg-white p-3 font-spaceGrotesk">
            <div className="flex flex-col sm:w-full h-full text-left p-5 sm:p-20">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="mt-2 text-sm">
                        Don&apos;t have an account?{" "}
                        <a href="/register" className="font-bold underline">
                            Sign Up
                        </a>
                    </p>
                </div>

                <div className="mt-24 flex flex-col gap-5">
                    <div className="labelAndInput">
                        <label htmlFor="email" className="">
                            Email
                        </label>
                        <input
                            type="text"
                            placeholder="Email"
                            id="email"
                            className="w-full px-3 py-2 border rounded-md outline-none focus:border-blue-500 focus:border-2"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="labelAndInput">
                        <label htmlFor="password" className="">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            className="w-full px-3 py-2 border rounded-md outline-none focus:border-blue-500 focus:border-2"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {msg && <p className="text-red-500 text-sm">{msg}</p>}

                    <button className="self-end w-1/5 bg-primary500 hover:bg-primary600 text-white  py-2 sm:py-3 rounded-md">
                        <h1 className="text-md font-bold" onClick={handleLogin}>
                            Login
                        </h1>
                    </button>
                </div>
            </div>

            <div className="hidden sm:flex flex-col justify-between w-3/5 bg-primary500 rounded-xl text-white py-20 px-14">
                <h1 className="text-2xl font-bold self-start text-left">SREC</h1>

                <div>
                    <h1 className="text-3xl font-bold">
                        Welcome back! <br />
                        Let&apos;s make a new recruitment
                    </h1>
                    <p className="text-small opacity-80 mt-5">
                        Discover our advanced recruitment platform, <br />
                        offering a seamless evaluation process for both <br />
                        hard and soft skills.
                    </p>
                </div>

                <ImageCarousel></ImageCarousel>

            </div>
        </div>
    );
};

export default Login;
