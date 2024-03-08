import { FC, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
interface taskFormProps {
  onSubmitAction: any;
  onClose: () => void;
   }

  const AddTaskForm: FC<taskFormProps> = ({ onClose,onSubmitAction }) => {
    const [task, setTask] = useState({
    title: '',
    description: '',
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTask((prevState) => {
      return {
        ...prevState,
        [name]:value
      };
    });
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitAction(task)
  }

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>

    <Form onSubmit={handleOnSubmit} className='add-task-form'>
      <Form.Group controlId='title'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          className='firstName'
          name='title'
          value={task.title}
          type='text'
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId='firstName'>
        <Form.Label>Description</Form.Label>
        <Form.Control
          className='description'
          name='description'
          value={task.description}
          type='text'
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId='submit'>
        <Button variant='primary' type='submit' className='submit-btn'>
          Add Task
        </Button>
      </Form.Group>
    </Form> 
    </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTaskForm;
