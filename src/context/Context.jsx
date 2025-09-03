import { createContext, useState, useEffect } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");

  const [prevPrompts, setPrevPrompts] = useState(() => {
    const saved = localStorage.getItem("prevPrompts");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  useEffect(() => {
    localStorage.setItem("prevPrompts", JSON.stringify(prevPrompts));
  }, [prevPrompts]);

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let usedPrompt = prompt ?? input;

    if (!prompt) {
      setPrevPrompts((prev) => [usedPrompt, ...prev]); 
    } else {
      setPrevPrompts((prev) => [usedPrompt, ...prev.filter((p) => p !== usedPrompt)]);
    }

    setRecentPrompt(usedPrompt);

    const response = await runChat(usedPrompt);

    // formatare bold și line break
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      newResponse += i % 2 === 1 ? `<b>${responseArray[i]}</b>` : responseArray[i];
    }
    let newResponse2 = newResponse.split("*").join("<br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      delayPara(i, newResponseArray[i] + " ");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
