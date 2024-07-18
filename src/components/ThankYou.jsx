import React from "react";
import { useNavigate } from "react-router-dom";
import { thank_you_icon } from "../utils";
import routes from "../routes/routeConfig";

const ThankYou = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center h-dvh p-2 sm:p-0">
            <div className="bg-white sm:w-1/2 sm:h-3/4 shadow-md rounded-xl flex flex-col items-center justify-center text-center p-5">
                <img src={thank_you_icon} alt="thank you" className="w-[300px]" />
                <h1 className="text-primary900 font-bold text-4xl font-clashDisplay">
                    Thank you!
                </h1>
                <p className="text-primary950 text-xl mt-5">
                    You did a great job! <br />
                    Now you can relax and wait for the response from the recruiter.
                </p>
                <button
                    className="mt-16 py-3 px-5 bg-gradient-to-r from-primary400 to-primary500 hover:from-primary600 hover:to-primary700 hover:scale-[102%] text-white w-full sm:w-1/4 rounded-3xl duration-300 font-bold"
                    onClick={() => navigate(routes.home)}
                >
                    Back to homepage
                </button>
            </div>
        </div>
    );
};

export default ThankYou;
