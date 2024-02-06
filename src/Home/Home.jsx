import { Button } from "react-bootstrap";
import { CiCirclePlus } from "react-icons/ci";

const Home = () => {
  return (
    <div>
      <section className="d-flex justify-content-center align-items-center">
        <h1>You've Got Task & Complete</h1>
        <Button className="ms-4">
          <CiCirclePlus size={20} className="me-2" />
          Add New
        </Button>
      </section>
    </div>
  );
};

export default Home;
