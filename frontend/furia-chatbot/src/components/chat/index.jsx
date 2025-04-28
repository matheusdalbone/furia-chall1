import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";

import { assistantResponse } from "../../services/api";

import { IoSendSharp } from "react-icons/io5";
import { BarLoader } from "react-spinners";
import Markdown from "react-markdown";

const Chat = () => {
  const [userQuestion, setUserQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const scrollInto = useRef();

  async function postAssistantResponse(question) {
    setLoading(() => true);
    await assistantResponse(question)
      .then((response) => {
        setMessages((messages) => [...messages, response.data]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
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

  useEffect(() => {
    if (!messages.length <= 0) {
      scrollInto.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <section className={styles.chatSection}>
        <div className={styles.chatDisplay}>
          <div className={styles.chatMessages}>
            {messages.map((message) =>
              message.type == "user" ? (
                <div ref={scrollInto} className={styles.userMessage}>
                  <span>{message.text}</span>
                </div>
              ) : (
                <div className={styles.assistantMessage}>
                  <Markdown>{message.text}</Markdown>
                </div>
              )
            )}
            {loading ? 
              <div className={styles.assistantMessage}>
                <BarLoader width={68} height={4}/>
              </div>
             : null}
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
