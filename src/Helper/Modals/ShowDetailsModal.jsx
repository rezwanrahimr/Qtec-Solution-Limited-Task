import { Modal } from "react-bootstrap";

const ShowDetailsModal = ({ id, showViewDetails, setShowViewDetails }) => {
    const handleClose = () => {
        setShowViewDetails(false);
    }

    const getTask = localStorage.getItem('tasks');
    const task = JSON.parse(getTask).find(task => task.id === id);

    return <>
        <Modal show={showViewDetails} onHide={handleClose} >
            <Modal.Title style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{task?.name}</span>
                <span>{task?.priority}</span>
            </Modal.Title>

            <Modal.Body>
                {task?.details}
            </Modal.Body>
        </Modal>
    </>
}
export default ShowDetailsModal;