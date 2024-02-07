import { Button, Dropdown, Table } from "react-bootstrap";
import { CiCirclePlus } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdDoneAll } from "react-icons/io";
import AddTaskModal from "../Helper/Modals/Modal";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import List from "./List";
import Swal from "sweetalert2";
import "./Home.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [priorityWaysTask, setPriorityWaysTask] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState('All');


  // show modal handler function
  const handleShowModal = () => {
    setShow(true);
  };


  // get task data in localstorage
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks && !tasks.length) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [tasks]);


  // set task data in localstorage
  useEffect(() => {
    if (tasks.length) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);



  //task complete handler function
  const handleMakeTaskComplete = () => {
    const filteredTasks = tasks.filter(task => !selectedIds.includes(task.id));

    const completedTasks = selectedIds.map(id => ({
      ...tasks.find(task => task.id === id),
      status: "Complete"
    }));

    const updatedTasks = [...filteredTasks, ...completedTasks];

    setTasks(updatedTasks);

  };

  //task delete handler function
  const handleTaskDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm"
    }).then((result) => {
      if (result.isConfirmed) {
        const filteredTasks = tasks.filter(task => !selectedIds.includes(task.id));
        setTasks(filteredTasks);
        setSelectedIds(prevIds => prevIds.filter(itemId => !selectedIds.includes(itemId)));


        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {

          let tasks = JSON.parse(storedTasks);
          const index = tasks.findIndex(task => selectedIds.includes(task.id) && task.status !== "Complete");


          if (index !== -1) {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
          }
        }

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });

  }



  // priority ways task sorted handler function
  const taskSorted = selectedPriority === "All" ? tasks : priorityWaysTask;
  const handlePrioritySelect = (priority) => {
    setSelectedPriority(priority);
    setPriorityWaysTask(() => tasks.filter(task => task.priority === priority))

  };

  return (
    <div>
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col className="d-flex justify-content-center align-items-center">
            <Card className="w-100 w-md-75 mt-4">
              <div className="d-flex align-items-center m-4">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-4 text-center text-md-start">
                      <Dropdown onSelect={handlePrioritySelect}>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                          Select Priority {selectedPriority}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="All">All</Dropdown.Item>
                          <Dropdown.Item eventKey="High">High</Dropdown.Item>
                          <Dropdown.Item eventKey="Medium">Medium</Dropdown.Item>
                          <Dropdown.Item eventKey="Low">Low</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="col-md-4 text-center">
                      <h2>
                        You've Got{' '}
                        <span style={{ color: '#F34779' }}>{tasks?.length} Task </span>
                        & Complete{' '}
                        <span style={{ color: '#F34779' }}>
                          {tasks.filter((task) => task.status === 'Complete').length} Task
                        </span>
                      </h2>
                    </div>
                    <div className="col-md-4 text-center">
                      <Button
                        className="me-2"
                        onClick={handleShowModal}
                        style={{ backgroundColor: '#0284C7' }}>
                        <CiCirclePlus size={20} className="me-2" />
                        Add New
                      </Button>
                      {selectedIds.length > 0 && (
                        <>
                          <Button
                            className="me-2"
                            onClick={handleMakeTaskComplete}
                            style={{ backgroundColor: '#25d366', border: 'none' }}>
                            <IoMdDoneAll size={20} className="me-2" />
                            Completed
                          </Button>
                          <Button
                            className="mt-2 mt-md-0"
                            onClick={handleTaskDelete}
                            variant="danger">
                            <RiDeleteBin6Line size={20} className="me-2 mb-1" />
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* task list table */}
              <Table responsive>
                <tbody>
                  <tr>
                    <td colSpan="4">
                      <p>Hold On</p>
                    </td>
                  </tr>
                  {taskSorted.map((item) => {
                    if (item.status !== 'Complete') {
                      return (
                        <List
                          key={item.id}
                          data={item}
                          tasks={tasks}
                          setTasks={setTasks}
                          selectedIds={selectedIds}
                          setSelectedIds={setSelectedIds}
                        />
                      );
                    }
                    return null;
                  })}
                  <tr>
                    <td colSpan="4">
                      <p>Complete</p>
                    </td>
                  </tr>
                  {taskSorted.map((item) => {
                    if (item.status === 'Complete') {
                      return (
                        <List
                          key={item.id}
                          disable={true}
                          data={item}
                          tasks={tasks}
                          setTasks={setTasks}
                          selectedIds={selectedIds}
                          setSelectedIds={setSelectedIds}
                        />
                      );
                    }
                    return null;
                  })}
                </tbody>
              </Table>

              {/* Modal */}
              <AddTaskModal show={show} setShow={setShow} tasks={tasks} setTasks={setTasks} />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
