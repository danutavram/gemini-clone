import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="relative min-h-screen flex-1 pb-36">
      <div className="flex items-center justify-between text-2xl p-5 text-gray-700">
        <p className="">Gemini</p>
        <img src={assets.user_icon} alt="" className="w-10 h-10 rounded-full" />
      </div>
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-0">
        {!showResult ? (
          <>
            <div className="my-12 text-gray-400 font-medium leading-tight">
              <p className="text-5xl sm:text-6xl md:text-7xl font-medium">
                <span className="bg-gradient-to-r from-blue-500 to-red-400 bg-clip-text text-transparent">
                  Hello, Dev.
                </span>
              </p>
              <p className="text-lg sm:text-xl mt-2">
                How can I help you today?
              </p>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  text: "Suggest beautiful places to see on an upcoming road trip",
                  icon: assets.compass_icon,
                },
                {
                  text: "Briefly summarize this concept: urban planning",
                  icon: assets.bulb_icon,
                },
                {
                  text: "Brainstorm team bonding activities for our work retreat",
                  icon: assets.message_icon,
                },
                {
                  text: "Improve the readability of the following code",
                  icon: assets.code_icon,
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="relative h-52 sm:h-56 bg-gray-200 rounded-xl p-4 
          cursor-pointer hover:bg-gray-300 text-gray-700"
                >
                  <p className="text-sm sm:text-base">{card.text}</p>
                  <img
                    src={card.icon}
                    className="w-9 h-9 p-1 absolute bottom-2 right-2 bg-white rounded-full"
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="px-4 max-h-[70vh] overflow-y-scroll no-scrollbar">
            <div className="flex items-center gap-5 my-10">
              <img src={assets.user_icon} className="w-10 h-10 rounded-full" />
              <p className="text-lg sm:text-xl">{recentPrompt}</p>
            </div>
            <div className="flex items-start gap-5">
              <img
                src={assets.gemini_icon}
                className="w-10 h-10 rounded-full"
              />
              {loading ? (
                <div className="flex flex-col gap-2 w-full -">
                  {[...Array(3)].map((_, idx) => (
                    <hr
                      key={idx}
                      className="h-5 rounded bg-gradient-to-r from-blue-200 via-gray-100 to-blue-200 bg-[length:200%_100%] animate-loader"
                    />
                  ))}
                </div>
              ) : (
                <p
                  className="text-base sm:text-lg font-light leading-7"
                  dangerouslySetInnerHTML={{ __html: resultData }}
                ></p>
              )}
            </div>
          </div>
        )}

        <div className="absolute bottom-0 w-full max-w-4xl px-4">
          <div className="flex items-center justify-between gap-4 bg-gray-200 rounded-full px-5 py-2">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
              className="flex-1 bg-transparent border-none outline-none text-base sm:text-lg"
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim() !== "") {
                  onSent(input);
                  setInput("");
                }
              }}
            />

            <div className="flex items-center gap-3 sm:gap-4">
              <img
                src={assets.gallery_icon}
                className="w-6 h-6 cursor-pointer"
              />
              <img
                src={assets.mic_icon}
                alt=""
                className="w-6 h-6 cursor-pointer"
              />
              {input ? (
                <img
                  onClick={() => {
                    onSent();
                    setInput("");
                  }}
                  src={assets.send_icon}
                  alt=""
                  className="w-6 h-6 cursor-pointer"
                />
              ) : null}
            </div>
          </div>
          <p className="text-xs sm:text-sm text-center font-light mt-2">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
