"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const targetDate = new Date("2025-05-01T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  // State to track if the component has mounted
  const [hasMounted, setHasMounted] = useState(false);

  // For the email input & status
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    setHasMounted(true);

    function getTimeLeft() {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference < 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    setTimeLeft(getTimeLeft());
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Don't render dynamic content until after mounting
  if (!hasMounted) {
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      setStatusMessage("Please enter a valid email.");
      return;
    }
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (data.success) {
        setStatusMessage("Thank you! We'll keep you updated.");
        setEmail("");
      } else {
        setStatusMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage("An error occurred. Please try again.");
    }
  }

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center text-white px-4 sm:px-8"
      style={{ backgroundImage: "url('/background.webp')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content container */}
      <div className="relative z-10 text-center max-w-4xl w-full p-6 mx-auto">
        {/* Heading & Subheading */}
        <h1 className="text-2xl sm:text-3xl md:text-7xl font-extrablack font-futura mb-2">
          COMING SOON
        </h1>
        <p className="text-lg sm:text-base md:text-xl font-bold font-futura mb-8 mt-6">
          We're working hard to bring you something amazing!
        </p>

        {timeLeft ? (
          <>
            {/* Mobile Version (2x2 grid) */}
            <div className="flex sm:hidden flex-wrap justify-center gap-4 mb-8 mt-20">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex flex-col items-center justify-center font-bold font-futura">
                <span className="text-4xl">{timeLeft.days}</span>
                <span className="text-md">Days</span>
              </div>
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex flex-col items-center justify-center font-bold font-futura">
                <span className="text-4xl">{timeLeft.hours}</span>
                <span className="text-md">Hours</span>
              </div>
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex flex-col items-center justify-center font-bold font-futura">
                <span className="text-4xl">{timeLeft.minutes}</span>
                <span className="text-md">Minutes</span>
              </div>
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex flex-col items-center justify-center font-bold font-futura">
                <span className="text-4xl">{timeLeft.seconds}</span>
                <span className="text-md">Seconds</span>
              </div>
            </div>

            {/* Desktop Version (single row) */}
            <div
              className="
                hidden sm:flex flex-nowrap items-center justify-center
                gap-1 sm:gap-2 md:gap-4 lg:gap-6
                mb-8 mt-20
              "
            >
              {/* Days Circle */}
              <div
                className="
                  flex flex-col items-center justify-center
                  bg-white bg-opacity-20 rounded-full font-bold font-futura

                  w-16 h-16 p-1
                  sm:w-20 sm:h-20 sm:p-2
                  md:w-24 md:h-24 md:p-3
                  lg:w-36 lg:h-36 lg:p-4
                "
              >
                <span
                  className="
                    text-sm
                    sm:text-lg
                    md:text-2xl
                    lg:text-4xl
                  "
                >
                  {timeLeft.days}
                </span>
                <span
                  className="
                    mt-1
                    text-xs
                    sm:text-sm
                    md:text-lg
                  "
                >
                  Days
                </span>
              </div>

              {/* Hours Circle */}
              <div
                className="
                  flex flex-col items-center justify-center
                  bg-white bg-opacity-20 rounded-full font-bold font-futura

                  w-16 h-16 p-1
                  sm:w-20 sm:h-20 sm:p-2
                  md:w-24 md:h-24 md:p-3
                  lg:w-36 lg:h-36 lg:p-4
                "
              >
                <span
                  className="
                    text-sm
                    sm:text-lg
                    md:text-2xl
                    lg:text-4xl
                  "
                >
                  {timeLeft.hours}
                </span>
                <span
                  className="
                    mt-1
                    text-xs
                    sm:text-sm
                    md:text-lg
                  "
                >
                  Hours
                </span>
              </div>

              {/* Minutes Circle */}
              <div
                className="
                  flex flex-col items-center justify-center
                  bg-white bg-opacity-20 rounded-full font-bold font-futura

                  w-16 h-16 p-1
                  sm:w-20 sm:h-20 sm:p-2
                  md:w-24 md:h-24 md:p-3
                  lg:w-36 lg:h-36 lg:p-4
                "
              >
                <span
                  className="
                    text-sm
                    sm:text-lg
                    md:text-2xl
                    lg:text-4xl
                  "
                >
                  {timeLeft.minutes}
                </span>
                <span
                  className="
                    mt-1
                    text-xs
                    sm:text-sm
                    md:text-lg
                  "
                >
                  Minutes
                </span>
              </div>

              {/* Seconds Circle */}
              <div
                className="
                  flex flex-col items-center justify-center
                  bg-white bg-opacity-20 rounded-full font-bold font-futura

                  w-16 h-16 p-1
                  sm:w-20 sm:h-20 sm:p-2
                  md:w-24 md:h-24 md:p-3
                  lg:w-36 lg:h-36 lg:p-4
                "
              >
                <span
                  className="
                    text-sm
                    sm:text-lg
                    md:text-2xl
                    lg:text-4xl
                  "
                >
                  {timeLeft.seconds}
                </span>
                <span
                  className="
                    mt-1
                    text-xs
                    sm:text-sm
                    md:text-lg
                  "
                >
                  Seconds
                </span>
              </div>
            </div>
          </>
        ) : (
          <p className="text-base md:text-lg font-bold mb-8">
            Loading countdown...
          </p>
        )}

        {/* Email Form */}
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center justify-center w-full max-w-md mx-auto"
        >
          {/* Container for the input & button */}
          <div
            className="relative flex items-center w-full 
                        border border-gray-500 rounded-full
                        pl-4 pr-36 py-3 
                        bg-white/10 backdrop-blur-sm 
                        shadow-lg mt-10"
          >
            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent 
                         text-white placeholder-gray-300
                         focus:outline-none
                         text-sm sm:text-base"
            />

            {/* Notify Me Button */}
            <button
              type="submit"
              className="btn absolute right-1 flex items-center gap-2 
                         bg-black/60 text-white px-3 py-2 
                         rounded-full z-10
                         transition-colors duration-300 ease-in-out
                         hover:bg-gray-700/60
                         text-sm"
            >
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
              </span>

              <span className="font-bold">Notify Me</span>
              {/* SVG Arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="arrowIcon h-4 w-4 md:h-5 md:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </form>

        {/* Status Message */}
        {statusMessage && (
          <p className="text-sm mt-3 font-semibold text-center">
            {statusMessage}
          </p>
        )}

        {/* Social Buttons Section */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {/* LinkedIn Button */}
          <a
            href="https://www.linkedin.com/in/arran-van-aerschot-26415118b/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 text-gray-300 
                       transition-colors duration-300 ease-in-out
                       hover:bg-[#0A66C2] hover:text-white"
          >
            {/* LinkedIn SVG */}
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 448 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M100.28 448H7.4V149.47h92.88zm-46.4-339.9A53.69 53.69 0 010 54.37a53.62 53.62 0 01106.72 0 53.69 53.69 0 01-52.84 53.73zM447.8 448h-92.68V302.4c0-34.7-12.4-58.4-43.4-58.4-23.7 0-37.8 15.9-44 31.3-2.3 5.4-2.8 12.9-2.8 20.4V448h-92.7s1.2-241.4 0-266.5h92.7v37.7c-.2.3-.4.7-.6 1h.6v-1c12.3-18.9 34.2-46 83.4-46 60.9 0 106.6 39.8 106.6 125.4z" />
            </svg>
          </a>

          {/* GitHub Button */}
          <a
            href="https://github.com/Arran-VanAerschot"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 text-gray-300
                       transition-colors duration-300 ease-in-out
                       hover:bg-black hover:text-white"
          >
            {/* GitHub SVG */}
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 0C3.58 0 0 3.64 0 8.13c0 3.59 2.29 6.63 5.47 7.71.4.08.55-.18.55-.39 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.51-2.69-.98-.09-.23-.48-.98-.82-1.18-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.24 1.87.89 2.33.68.07-.52.28-.89.51-1.09-1.78-.21-3.64-.91-3.64-4.07 0-.9.31-1.64.82-2.22-.08-.21-.36-1.07.08-2.23 0 0 .67-.22 2.2.85.64-.18 1.31-.27 1.98-.27.67 0 1.34.09 1.98.27 1.53-1.08 2.2-.85 2.2-.85.44 1.16.16 2.02.08 2.23.51.58.82 1.32.82 2.22 0 3.17-1.87 3.86-3.65 4.06.29.26.54.75.54 1.51 0 1.09-.01 1.96-.01 2.23 0 .21.14.47.55.39C13.71 14.76 16 11.72 16 8.13 16 3.64 12.42 0 8 0z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
