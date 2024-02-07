import { Badge, Modal } from "react-bootstrap";

const ShowDetailsModal = ({ id, showViewDetails, setShowViewDetails }) => {
  const handleClose = () => {
    setShowViewDetails(false);
  };

  const getTask = localStorage.getItem("tasks");
  const task = JSON.parse(getTask)?.find((task) => task.id === id);

  return (
    <>
      <Modal show={showViewDetails} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span>{task?.name}</span>
          </Modal.Title>
          {task?.priority === "High" && (
            <Badge className="ms-2" bg="primary">
              {task.priority}
            </Badge>
          )}
          {task?.priority === "Medium" && (
            <Badge className="ms-2" bg="info">
              {task.priority}
            </Badge>
          )}
          {task?.priority === "Low" && (
            <Badge className="ms-2" bg="warning">
              {task.priority}
            </Badge>
          )}
        </Modal.Header>
        <Modal.Body>{task?.details}</Modal.Body>
      </Modal>
    </>
  );
};
export default ShowDetailsModal;
