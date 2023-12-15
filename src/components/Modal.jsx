import { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

/* eslint-disable react/prop-types */
const Modal = ({ isOpen, onClose, onClick }) => {
  const [inpValue, setInpValue] = useState("");
  const [selColor, setSelColor] = useState("");
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "  #6691FF",
  ];
  const id = uuidv4();
  if (!isOpen) return null;

  const handleClick = (e) => {
    if (inpValue === "" || selColor === "") {
      toast.error("Please enter a name and select a color", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          fontFamily: "Roboto",
        },
      });
    } else {
      onClick(inpValue, selColor, id);
      setInpValue("");
      setSelColor("");
      onClose(e);
    }
  };

  return (
    <>
      <div
        onClick={(e) => {
          onClose(e);
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          fontFamily: "Roboto",
          fontSize: "20px",
          fontWeight: 500,
          lineHeight: "160.188%",
          letterSpacing: 1,
        }}
        className="outer-div"
      >
        <div
          style={{
            background: "white",
            width: 500,
            padding: "2%",
            borderRadius: "6px",
            margin: "10px",
          }}
        >
          <h2 className="create-new">Create New group</h2>
          <div className="group-name-container">
            <label htmlFor="group-name">Group Name</label>
            <input
              type="text"
              name=""
              id=""
              className="group-input"
              value={inpValue}
              placeholder="Enter Group Name"
              onChange={(e) => setInpValue(e.target.value)}
            />
          </div>
          <div className="grp-colors">
            <label htmlFor="group-name">Choose Color</label>
            {colors.map((color) => (
              <div
                style={{
                  border: selColor == color ? "2px solid #00ab41 " : "",
                  backgroundColor: color,
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                }}
                key={color}
                onClick={() => {
                  setSelColor("");
                  setSelColor(color);
                }}
              ></div>
            ))}
          </div>

          <div className="btn-container">
            <button className="create-btn" onClick={(e) => handleClick(e)}>
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
