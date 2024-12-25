import "./App.css";
import { io } from "socket.io-client";

function App() {
  const connect = () => {
    const socket = io("http://localhost:3000");
    socket.connect();
    socket.emit("user");
  };

  return (
    <>
      <h1>Web socket</h1>
      <div className="card">
        <button onClick={() => connect()}>connect</button>
      </div>
    </>
  );
}



export default App;
