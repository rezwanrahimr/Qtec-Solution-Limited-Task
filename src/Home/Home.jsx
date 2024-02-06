import { Button, Table } from "react-bootstrap";
import { CiCirclePlus } from "react-icons/ci";
import AddTaskModal from "../Helper/Modals/Modal";
import { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Home.css";
import List from "./List";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);
  const handleShowModal = () => {
    setShow(true);
  };
  console.log(tasks);
  return (
    <div>
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col className="d-flex justify-content-center align-items-center">
            <Card className="w-75 w-md-50 mt-4">
              <section className="d-flex justify-content-center align-items-center m-4">
                <h2>You've Got Task & Complete</h2>
                <Button
                  className="ms-4"
                  onClick={handleShowModal}
                  style={{ backgroundColor: "#0284C7" }}
                >
                  <CiCirclePlus size={20} className="me-2" />
                  Add New
                </Button>
              </section>
              {/* show list item */}
              <Table responsive>
                <tbody>
                  {tasks.map((item) => (
                    <List key={item.id} data={item} />
                  ))}
                </tbody>
              </Table>
              {/* Add New Task Form Modal */}
              <AddTaskModal show={show} setShow={setShow} setTasks={setTasks} />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
