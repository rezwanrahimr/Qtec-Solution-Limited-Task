import { Badge, Dropdown, Form } from "react-bootstrap";
import { useState } from "react";
import AddTaskModal from "../Helper/Modals/Modal";
import ShowDetailsModal from "../Helper/Modals/ShowDetailsModal";

const List = ({ data, tasks, setTasks, disable, selectedIds, setSelectedIds }) => {
  const [taskId, setTaskId] = useState(null);
  const [show, setShow] = useState(false);
  const [showViewDetails, setShowViewDetails] = useState(false);
  const handleUpdateTask = () => {
    setShow(true);
  };

  const handleViewDetails = (id) => {
    setTaskId(id);
    setShowViewDetails(true);
  }


  // set selected task ids
  const handleCheckboxChange = (event, id) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedIds(prevIds => [...prevIds, id]);
    } else {
      setSelectedIds(prevIds => prevIds.filter(itemId => itemId !== id));
    }
  };

  return (
    <>
      <tr style={disable && { backgroundColor: 'gray', color: '#999999', pointerEvents: 'none', cursor: 'not-allowed', }}>
        <td>
          <Form.Check
            aria-label="option 1"
            checked={disable ? true : selectedIds.length && selectedIds?.includes(data.id)}
            onChange={(e) => handleCheckboxChange(e, data.id)}
          />
        </td>
        <td>{data.name}</td>
        <td>
          {data.status === "Incomplete" && (
            <Badge bg="warning">{data.status}</Badge>
          )}
          {data.status === "Complete" && (
            <Badge bg="success">{data.status}</Badge>
          )}
        </td>
        <td>
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
            </Dropdown.Toggle>
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
      < ShowDetailsModal id={taskId} showViewDetails={showViewDetails} setShowViewDetails={setShowViewDetails} />
    </>
  );
};

export default List;
