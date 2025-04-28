import React, { useState } from "react";
import styles from "./style.module.css";
import { IoSendSharp } from "react-icons/io5";
import { assistantResponse } from "../../services/api";

const Chat = () => {
  const [userQuestion, setUserQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  async function postAssistantResponse(question) {
    assistantResponse(question)
      .then((response) => {
        setMessages((messages) => [...messages, response.data]);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages((messages) => [
      ...messages,
      {
        text: userQuestion,
        type: "user",
      },
    ]);

    postAssistantResponse(userQuestion);

    setUserQuestion("");
  };

  return (
    <>
      <section className={styles.chatSection}>
        <div className={styles.chatDisplay}>
          <div className={styles.chatMessages}>
            <div>
              {messages.map((message) =>
                message.type == "user" ? <div className={styles.userMessage}>User: {message.text}</div> : <div className={ styles.assistantMessage }>Assistant: { message.text}</div>
              )}
            </div>
          </div>
          <div className={styles.inputSection}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Pergunte algo"
                onChange={(e) => setUserQuestion(e.target.value)}
                value={userQuestion}
              />
              <button type="submit" className={styles.sendMessageBtn}>
                <IoSendSharp />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Chat;
