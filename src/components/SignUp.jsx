import { useState } from "react";
import axios from "axios";
import { rootAPI } from "../utils/ip";

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const handleRegister = async () => {
        try {
            const response = await axios.post(`${rootAPI}/register`, {
                firstName,
                lastName,
                email,
                password,
            });
            setMsg(response.data.message);
        } catch (error) {
            setMsg(error.response.data.msg);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row w-full h-[100vh] rounded-xl bg-white p-3 font-spaceGrotesk">
            <div className="hidden sm:flex flex-col w-3/5 bg-primary rounded-xl text-white py-20 px-14">
                <h1 className="text-2xl font-bold self-start text-left">SREC</h1>
                <div className="mt-52">
                    <h1 className="text-3xl font-bold">
                        Start your new <br />
                        recruitment with us.
                    </h1>
                    <p className="text-small opacity-80 mt-5">
                        Discover our advanced recruitment platform, <br />
                        offering a seamless evaluation process for both <br />
                        hard and soft skills.
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:w-full h-full text-left p-5 sm:p-20">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">Sign up</h1>
                    <p className="mt-2 text-sm">
                        Already have an account?{" "}
                        <a href="/login" className="font-bold underline">
                            Sign In
                        </a>
                    </p>
                </div>

                <div className="mt-24 flex flex-col gap-5">
                    <div className="flex justify-between gap-5">
                        <div className="labelAndInput w-full">
                            <label htmlFor="name" className="">
                                First Name
                            </label>
                            <input
                                type="text"
                                placeholder="First Name"
                                id="name"
                                className="w-full px-3 py-2 border rounded-md outline-none focus:border-blue-500 focus:border-2"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className="labelAndInput w-full">
                            <label htmlFor="lastName" className="">
                                Last Name
                            </label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                id="lastName"
                                className="w-full px-3 py-2 border rounded-md outline-none focus:border-blue-500 focus:border-2"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="labelAndInput">
                        <label htmlFor="email" className="">
                            Email
                        </label>
                        <input
                            type="text"
                            placeholder="Email"
                            id="email"
                            className="input"
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
                            className="input"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="labelAndInput">
                        <label htmlFor="confirmPassword" className="">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            id="confirmPassword"
                            className="input"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="w-2/5 bg-primary hover:bg-hoverPrimary text-white  py-2 sm:py-3 rounded-md" onClick={handleRegister}>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
