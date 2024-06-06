import { useState, useEffect, useRef } from "react";
import { user_rating } from "../constants";
import gsap from "gsap";

const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const imagesRef = useRef([]);

    useEffect(() => {
        gsap.set(imagesRef.current, { opacity: 0 });
        gsap.to(imagesRef.current[currentIndex], {
            opacity: 1,
            duration: 0.75,
            ease: "power2.inOut",
        });

        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % user_rating.length;
            handleClick(nextIndex);
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const handleClick = (index) => {
        gsap.to(imagesRef.current[currentIndex], {
            opacity: 0,
            duration: 0.75,
            ease: "power2.inOut",
        });
        setCurrentIndex(index);
    };

    return (
        <div className="w-full h-[40%] flex flex-col overflow-hidden">
            {user_rating.map((user, index) => (
                <div
                    key={index}
                    className={
                        index === currentIndex
                            ? "bg-primary700 bg-opacity-85 h-full rounded-xl flex flex-col justify-between gap-5 p-5 text-left overflow-y-auto scrollbar"
                            : "hidden"
                    }
                    ref={(el) => (imagesRef.current[index] = el)}
                >
                    <p>{user.comment}</p>
                    <div className="flex gap-2">
                        <img
                            src={user.image}
                            alt=""
                            className="object-cover h-16 w-16 rounded-xl"
                        />
                        <div className="flex flex-col gap-1">
                            <p className="font-bold">{user.name}</p>
                            <p className="text-sm">{user.job}</p>
                        </div>
                    </div>
                </div>
            ))}

            <div className="flex items-center justify-center gap-5 mt-5">
                {user_rating.map((_, index) => (
                    <span
                        className={`bg-white rounded-full w-2 h-2 cursor-pointer ${index === currentIndex ? "" : "bg-opacity-50 hover:bg-opacity-100 hover:bg-primary600"}`}
                        key={index}
                        onClick={() => handleClick(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
