import "./App.css";
import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const surpriseOptions = [
    "Write a short story about a character who discovers a mysterious portal in their backyard.",
    "Imagine a world where animals can communicate with humans. Describe a day in the life of a person navigating this unique reality.",
    "Create a dialogue between two unlikely companions—an alien and a medieval knight—discussing their perspectives on life.",
    "Explore the concept of time travel in a poem. How does it feel to move between different eras?",
    "Write a letter from a character to their future self, reflecting on their current aspirations and dreams.",
    "Describe an abandoned amusement park at night. What secrets does it hold, and who might visit such a place?",
    "Invent a new technology that dramatically changes the way people interact with nature. How does it impact society?",
    "Craft a scene set in a bustling, futuristic city where everyone wears masks. What purpose do these masks serve, and what happens when someone breaks the norm?",
    "Develop a monologue for a character who wakes up with the ability to read minds. How do they navigate this newfound power?",
    "Create a short dialogue between a wise old tree and a curious child. What lessons does the tree share with the young visitor?",
  ];

  const surprise = async () => {
    const randomValue = await surpriseOptions[
      Math.floor(Math.random() * surpriseOptions.length)
    ];
    setValue(randomValue);
  };

  const getResponse = async () => {
    if (!value) {
      setError("Please Ask something");
      return;
    }

    try {
      // Show loading spinner
      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          parts: value,
        },
        {
          role: "model",
          parts: "Loading...", // Placeholder loading message
        },
      ]);

      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("http://localhost:5000/gemini", options);
      const data = await response.text();

      // Update the loading message with the actual response
      setChatHistory((oldChatHistory) => [
        ...oldChatHistory.slice(0, -1), // Remove the loading message
        {
          role: "model",
          parts: data,
        },
      ]);
      setValue(""); // Clear input field
    } catch (error) {
      console.log(error.message, "error in get response");
      setError("Something was supposed to be secret");
    }
  };

  const clearChat = () => {
    setError("");
    setValue("");
    setChatHistory([]);
  };

  return (
    <div className="app">
      <h1>BrilliantBrainiac Bot</h1>
      <h1 className="headingText">What do want to know</h1>
      <button className="button" onClick={surprise} disabled={!chatHistory}>
        Surprise Me
      </button>

      <div className="input-container">
        <input
          value={value}
          type="text"
          placeholder="Mai. Mere ko Sub Ata ha.. Mai Expert Hun...."
          onChange={(e) => setValue(e.target.value)}
        />

        {/* we can render these button conditionally  */}
        {!error && <button onClick={getResponse}>Ask Me</button>}
        {error && <button onClick={clearChat}>Clear</button>}
      </div>
      {error && <p>{error}</p>}

      <div className="search-results">
        {chatHistory.map((chatItem, _index) => (
          <div key={_index}>
            <p className="answer">
              {chatItem.role}: {chatItem.parts}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
