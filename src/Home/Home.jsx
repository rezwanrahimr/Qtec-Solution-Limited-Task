import { Button, Table } from "react-bootstrap";
import { CiCirclePlus } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdDoneAll } from "react-icons/io";
import AddTaskModal from "../Helper/Modals/Modal";
import { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Home.css";
import List from "./List";
import Swal from "sweetalert2";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const handleShowModal = () => {
    setShow(true);
  };
  console.log(tasks, selectedIds);


  //
  const handleMakeTaskComplete = () => {
    const filteredTasks = tasks.filter(task => !selectedIds.includes(task.id));

    const completedTasks = selectedIds.map(id => ({
      ...tasks.find(task => task.id === id),
      status: "Complete"
    }));

    const updatedTasks = [...filteredTasks, ...completedTasks];

    setTasks(updatedTasks);

    setSelectedIds(prevIds => prevIds.filter(itemId => !selectedIds.includes(itemId)));
  };

  //
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

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });

  }

  return (
    <div>
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col className="d-flex justify-content-center align-items-center">
            <Card className="w-75 w-md-50 mt-4">
              <section className="d-flex justify-content-center align-items-center m-4">
                <h2>
                  You've Got{" "}
                  <span style={{ color: "#F34779" }}>
                    {tasks?.length} Task{" "}
                  </span>
                  & Complete
                </h2>
                <Button
                  className="ms-4"
                  onClick={handleShowModal}
                  style={{ backgroundColor: "#0284C7" }}
                >
                  <CiCirclePlus size={20} className="me-2" />
                  Add New
                </Button>
                {selectedIds.length > 0 && <><Button
                  className="ms-4"
                  onClick={handleMakeTaskComplete}
                  style={{ backgroundColor: "#25d366", border: 'none' }}

                >
                  <IoMdDoneAll size={20} className="me-2" />
                  Completed
                </Button>
                  <Button
                    className="ms-4"
                    onClick={handleTaskDelete}
                    variant="danger"
                  // style={{ backgroundColor: "#0284C7" }}
                  >
                    <RiDeleteBin6Line size={20} className="me-2 mb-1" />
                    Delete
                  </Button></>}
              </section>
              {/* show list item */}
              <Table responsive>
                <tbody>
                  {tasks.map((item) => (
                    <List
                      key={item.id}
                      data={item}
                      tasks={tasks}
                      setTasks={setTasks}
                      selectedIds={selectedIds}
                      setSelectedIds={setSelectedIds}
                    />
                  ))}
                </tbody>
              </Table>
              {/* Add New Task Form Modal */}
              <AddTaskModal
                show={show}
                setShow={setShow}
                tasks={tasks}
                setTasks={setTasks}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
