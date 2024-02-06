import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { v4 as uuidv4 } from "uuid";

const AddTaskModal = ({ show, setShow, setTasks, initialValues }) => {
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
      id: uuidv4(),
      name,
      priority,
      details,
      status: "incomplete",
    };

    setTasks((prevState) => [...prevState, newTask]);
    handleClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
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
                placeholder="enter task title"
                autoFocus
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Priority</Form.Label>
              <Form.Select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
              >
                <option value="High">High</option>
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
                placeholder="enter task details"
                rows={3}
                value={formData.details}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddTaskModal;