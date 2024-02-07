import { Badge, Dropdown, Form } from "react-bootstrap";
import { useState } from "react";
import AddTaskModal from "../Helper/Modals/Modal";
import ShowDetailsModal from "../Helper/Modals/ShowDetailsModal";

const List = ({
  data,
  tasks,
  setTasks,
  disable,
  selectedIds,
  setSelectedIds,
}) => {
  const [taskId, setTaskId] = useState(null);
  const [show, setShow] = useState(false);
  const [showViewDetails, setShowViewDetails] = useState(false);

  const handleUpdateTask = () => {
    setShow(true);
  };

  const handleViewDetails = (id) => {
    setTaskId(id);
    setShowViewDetails(true);
  };

  // set selected task ids
  const handleCheckboxChange = (event, id) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedIds((prevIds) => [...prevIds, id]);
    } else {
      setSelectedIds((prevIds) => prevIds.filter((itemId) => itemId !== id));
    }
  };

  // set Priority ways list background color
  const defaultStyles = {};

  if (data.priority === "High") {
    defaultStyles.backgroundColor = "#95BDFF";
  }
  if (data.priority === "Medium") {
    defaultStyles.backgroundColor = "#DFFFD8";
  }
  if (data.priority === "Low") {
    defaultStyles.backgroundColor = "#F7C8E0";
  }

  return (
    <>
      <tr
        style={
          disable && {
            backgroundColor: "gray",
            pointerEvents: "none",
            cursor: "not-allowed",
          }
        }
      >
        <td style={defaultStyles}>
          <Form.Check
            aria-label="option 1"
            checked={
              disable
                ? true
                : selectedIds?.length && selectedIds?.includes(data.id)
            }
            onChange={(e) => handleCheckboxChange(e, data.id)}
          />
        </td>
        <td style={defaultStyles}>{data.name}</td>
        <td style={defaultStyles}>
          {data.status === "Incomplete" && (
            <Badge bg="danger">{data.status}</Badge>
          )}
          {data.status === "Complete" && (
            <Badge bg="success">{data.status}</Badge>
          )}
        </td>
        <td style={defaultStyles}>
          {data.priority === "High" && (
            <Badge bg="primary">{data.priority}</Badge>
          )}
          {data.priority === "Medium" && (
            <Badge bg="info">{data.priority}</Badge>
          )}
          {data.priority === "Low" && (
            <Badge bg="warning">{data.priority}</Badge>
          )}
        </td>

        <td style={defaultStyles}>
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              style={{
                backgroundColor: "#0284C7",
                borderColor: "#0284C7",
                color: "white",
              }}
            ></Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleUpdateTask(data.id)}>
                edit
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleViewDetails(data.id)}>
                view details
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
      <ShowDetailsModal
        id={taskId}
        showViewDetails={showViewDetails}
        setShowViewDetails={setShowViewDetails}
      />
    </>
  );
};

export default List;
