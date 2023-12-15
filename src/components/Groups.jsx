import { useEffect, useState } from "react";
import "./styles.css";
import Modal from "./Modal";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Groups = () => {
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState([]);

  const navigate = useNavigate();
  const [gId, setgId] = useState("");
  // CLOSE MODAL
  const handleClose = (event) => {
    event.stopPropagation();
    event.target.className == "outer-div" ||
    event.target.className == "create-btn"
      ? setOpen(false)
      : null;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  //For Generating Icon Name
  const getIconName = (name) => {
    return name
      .split(" ")
      .map((item) => item[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  // ADD GROUP
  const addGroup = (inpValue, selColor, id) => {
    inpValue &&
      selColor &&
      id &&
      setGroups([
        ...groups,
        {
          id: id,
          name: inpValue,
          logo: getIconName(inpValue),
          color: selColor,
          notes: [],
        },
      ]);
    window.location.reload();
  };

  //Fetch Existing Groups from Local Storage
  useEffect(() => {
    setGroups(JSON.parse(localStorage.getItem("groupsStore")) || []);
  }, []);

  //Update Local Storage when new group is created.
  useEffect(() => {
    const setNewGroup = async () =>
      await localStorage.setItem("groupsStore", JSON.stringify(groups));

    setNewGroup();
  }, [groups]);

  //Go to Clicked Group

  const handleGroup = (id) => {
    setgId(id);
    navigate(`/chat/${id}`);
  };

  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <div className="groups-container">
        <h3 className="groups-title">Pocket Notes</h3>
        <div className="groups-section">
          {groups &&
            groups?.map((group, i) => {
              return (
                <div
                  key={i}
                  className="group-name-container "
                  style={{
                    backgroundColor:
                      gId == group.id ? `rgba(47, 47, 47, 0.17)` : "",
                    borderRadius: "16px",
                  }}
                  onClick={() => handleGroup(group.id)}
                >
                  <div
                    className="group-icon"
                    style={{ backgroundColor: group?.color }}
                  >
                    {group?.logo}
                  </div>
                  <div>{group?.name}</div>
                </div>
              );
            })}
        </div>

        <div className="create" onClick={handleOpen}>
          +
        </div>
      </div>
      <Modal isOpen={open} onClose={handleClose} onClick={addGroup}>
        <></>
      </Modal>
    </>
  );
};

export default Groups;
