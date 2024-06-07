import { useState } from "react";

const Notification = () => {
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
                className="bi bi-bell-fill"
                viewBox="0 0 16 16"
            >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
            </svg>
        </div>
    );
};

export default Notification;
