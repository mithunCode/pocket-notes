/* eslint-disable react-hooks/exhaustive-deps */
import Groups from "../../components/Groups";
import "./chatpage.css";
import send from "../../assets/send.png";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ChatPage = () => {
  const param = useParams();
  const navigate = useNavigate();

  const [allGroups, setAllGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [text, setText] = useState("");

  const customData = JSON.parse(localStorage.getItem("groupsStore")) || [];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await setAllGroups(customData);
  };

  useEffect(() => {
    const getData = allGroups.filter((item) => item.id == param.id);
    setSelectedGroup(getData);
  }, [allGroups, param]);

  useEffect(() => {}, [selectedGroup]);

  const handleSubmit = async () => {
    const currentDate = new Date();
    const formattedTime = currentDate.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const formattedDate = currentDate.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const addNote = [
      {
        text: text,
        date: formattedDate,
        time: formattedTime,
      },
    ];
    await setSelectedGroup([
      ...selectedGroup,
      selectedGroup[0].notes.push(addNote),
    ]);

    await setAllGroups((prev) => [...prev, selectedGroup]);

    await localStorage.setItem("groupsStore", JSON.stringify(allGroups));
    setText("");
  };

  return (
    <section className="chat-container">
      <section className="chat-left mobile-chat-view">
        <Groups />
      </section>
      <section className="chat-right">
        <div className="chat-header">
          <div className="back-btn" onClick={() => navigate("/")}>
            ←
          </div>
          <div
            className="group-icon"
            style={{ backgroundColor: selectedGroup[0]?.color }}
          >
            {selectedGroup[0]?.logo}
          </div>
          <p>{selectedGroup[0]?.name}</p>
        </div>
        <div className="chat-content">
          <div className="chat-content-body">
            {selectedGroup[0]?.notes?.map((note, i) => {
              return (
                <div key={i} className="chat-body">
                  <div>{note[0]?.text}</div>
                  <div className="date-time">
                    <p>{note[0]?.date}</p>
                    <p style={{ fontSize: "60px" }}>∙</p>
                    <p>{note[0]?.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="chat-write ">
          <div className="chat-text-area">
            <textarea
              placeholder="Enter your Text here"
              rows={7}
              cols={105}
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <img
              className={text ? "" : "btn-disable"}
              src={send}
              width={25}
              height={25}
              alt="send"
              onClick={() => {
                text ? handleSubmit() : "";
              }}
            />
          </div>
        </div>
      </section>
    </section>
  );
};

export default ChatPage;
