import { TbPointFilled } from "react-icons/tb";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import AddTaskModal from "../Helper/Modals/Modal";
const List = ({ data, tasks, setTasks }) => {
  const [show, setShow] = useState(false);
  const handleUpdateTask = () => {
    setShow(true);
  };

  // Delete A Single Task Handler
  const handleDeleteTask = (id) => {
    const confirm = window.confirm("Are You Sure ?");
    if (confirm) {
      const deleteTask = tasks?.filter((task) => task.id !== id);
      setTasks(() => [...deleteTask]);
    }
  };
  return (
    <>
      <tr>
        <td>
          <TbPointFilled />
        </td>
        <td>{data.name}</td>
        <td>{data.status}</td>
        <td>{data.priority}</td>
        <td>
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              style={{
                backgroundColor: "#0284C7",
                borderColor: "#0284C7",
                color: "white",
              }}
            >
              {/* <HiDotsHorizontal /> */}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleUpdateTask(data.id)}>
                edit
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleDeleteTask(data.id)}>
                delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
      <AddTaskModal
        show={show}
        setShow={setShow}
        tasks={tasks}
        setTasks={setTasks}
        initialValues={{
          id: data.id,
          name: data.name,
          priority: data.priority,
          details: data.details,
        }}
      />
    </>
  );
};

export default List;
