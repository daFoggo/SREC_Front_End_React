import { useState } from "react";

const BoxMessage = () => {
    const [color, setColor] = useState("#10a1fc");

    const handleMouseEnter = () => {
        setColor("#005ea9");
    };

    const handleMouseLeave = () => {
        setColor("#10a1fc");
    };

    return (
        <div
            className="cursor-pointer hover:scale-105 duration-300"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill={color}
                className="bi bi-chat-right-dots-fill"
                viewBox="0 0 16 16"
            >
                <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353zM5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
            </svg>
        </div>
    );
};

export default BoxMessage;
