import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:3000");
  const [data, setData] = useState({});
  const inputRef = useRef<HTMLInputElement>(null!);
  const [list, setList] = useState<{ message: string }[]>([]);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setData((data) => ({ ...data, [event.target.name]: event.target.value }));

  const startConnection = () => {
    socket.on("connection", () => {
      console.log("Connected on client");
    });
  };

  useEffect(() => {
    startConnection();
  }, []);

  useEffect(() => {
    socket.on("list-update", (data) => {
      console.log(data);
      setList(data);

      return () => socket.off("list-update");
    });
  }, [socket]);

  return (
    <>
      <h1>Web socket</h1>
      <div className="card">
        <input
          ref={inputRef}
          className="message-input"
          name="message"
          type="text"
          onChange={handleChange}
        />
        <br />
        <button
          onClick={() => {
            socket.emit("message", data);
            inputRef.current.value = "";
          }}
        >
          connect
        </button>

        <ol>
          {list.map((item, i) => (
            <li key={i}>{item.message}</li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App;
