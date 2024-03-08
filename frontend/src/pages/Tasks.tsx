import  { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Header from "../components/Header";
import EditModal, { EditTask } from "../components/EditTaskModal";
import AddTaskForm from "../components/AddTaskModal";
import { API_URL } from "../config";
interface Task {
  id: number;
  title: string;
  description: string;
  created: Date;
}


function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editedTask, setEditedTask] = useState<EditTask | null >(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openEditModal = (task: EditTask) => {
    setEditedTask(task);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditedTask(null);
    setIsEditModalOpen(false);
  };
  const handleUpdateTask = async (taskId: number, updatedTask: EditTask) => {
    try {
      const response = await fetch(API_URL+ `/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });


       if (response.ok) {
        const newTasks = tasks.map((task) => {
          if (task.id !== updatedTask.id)
          {return task}
          else {
            task.description = updatedTask.description
            task.title = updatedTask.title
            return task
          }
        })

        setTasks(newTasks);
        closeEditModal(); 
       } 
       else {
        console.error('Failed to update task:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      const response = await fetch(API_URL+`/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Delete was successful, update the list
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
      } else {
        console.error('Failed to delete task:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  
  const handleAddOnSubmit = async (task:Task) => {

    try {
        const response = await fetch(API_URL+'/tasks/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        if (response.ok) {
            const createdTask = await response.json();
            const updatedTasks  = [...tasks, createdTask]
            setTasks(updatedTasks);
            closeAddModal(); 

            
        } else {
            console.error('Failed to create task:', response.statusText);
        }
    } catch (error) {
        console.error('Error creating task:', error);
    }
};


  useEffect(() => {
    fetch(API_URL+'/tasks')
      .then(response => response.json())
      .then((data: Task[]) => {
        setTasks(data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error.message);
      });
  }, []);

  return (
    <>
     <Button variant="primary" onClick={() => openAddModal()}>
                    Add Task
                  </Button>
                  {isAddModalOpen && (
      <AddTaskForm onSubmitAction={handleAddOnSubmit}
      onClose={closeAddModal}

       />
    )}
 
      {isEditModalOpen && editedTask && (
        <EditModal
          task={editedTask}
          onClose={closeEditModal}
          onUpdate={handleUpdateTask}
        />
      )}
      <div className='App'>
        <Header text="Tasks"></Header>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((element, index) => (
              <tr key={`${element.id}_${index}`}>
                <td>{element.title}</td>
                <td>{element.description}</td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(element.id)}>
                    Delete
                  </Button>{' '}
                  <Button variant="primary" onClick={() => openEditModal(element)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Tasks;