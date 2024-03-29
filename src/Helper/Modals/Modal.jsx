import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

const AddTaskModal = ({ show, setShow, tasks, setTasks, initialValues }) => {
  const [formData, setFormData] = useState(
    initialValues || {
      name: "",
      priority: "High",
      details: "",
    }
  );

  useEffect(() => {
    setFormData(
      initialValues || {
        name: "",
        priority: "High",
        details: "",
      }
    );
  }, [initialValues]);

  const handleClose = () => {
    setShow(false);
  };

  const handleTaskForm = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const priority = e.target.priority.value;
    const details = e.target.details.value;

    const newTask = {
      // set unique id
      id: uuidv4(),
      name,
      priority,
      details,
      status: "Incomplete",
    };

    if (initialValues && initialValues?.id) {
      const checkTask = tasks?.filter((task) => task.id !== initialValues.id);
      console.log("checkTask", checkTask);
      setTasks(() => [...checkTask, newTask]);
    } else {
      setTasks((prevState) => [...prevState, newTask]);
    }

    setFormData({
      name: "",
      priority: "",
      details: "",
    });

    handleClose();

    Swal.fire({
      title: "Good job!",
      text: "New Task is Added!",
      icon: "success",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // normal form validation script
  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.priority.trim() !== "" &&
      formData.details.trim() !== ""
    );
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTaskForm}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter Task Name"
                autoFocus
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Priority</Form.Label>
              <Form.Select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
              >
                <option value="High" defaultChecked>
                  High
                </option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Task Details</Form.Label>
              <Form.Control
                name="details"
                as="textarea"
                placeholder="Enter Task Details"
                rows={3}
                value={formData.details}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button
              className="me-2"
              variant="success"
              type="submit"
              disabled={!isFormValid()}
            >
              Submit
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddTaskModal;
