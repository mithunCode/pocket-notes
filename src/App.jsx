import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import ChatPage from "./pages/ChatPage/ChatPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
      </Routes>
    </div>
  );
};

export default App;
