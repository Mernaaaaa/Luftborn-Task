import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

 export interface EditTask {
  id:number;
  title: string;
  description: string;
}


interface EditModalProps {
  task: EditTask;
  onClose: () => void;
  onUpdate: (taskId: number, updatedTask: EditTask) => void;
}

const EditModalComponent: React.FC<EditModalProps> = ({ task, onClose, onUpdate }) => {
  const [updatedTask, setUpdatedTask] = React.useState<EditTask>({ ...task });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedTask(prevState => ({ ...prevState, [name]: value }));
  };

  const handleUpdate = () => {
    onUpdate(task.id, updatedTask);
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={updatedTask.title}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={updatedTask.description}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModalComponent;
