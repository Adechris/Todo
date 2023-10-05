import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container, Form, Modal } from "react-bootstrap";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
const Todo = () => {
  const storeDetails = () => {
    let store = localStorage.getItem("title");
    if (store) {
      return JSON.parse(localStorage.getItem("title"));
    } else if (localStorage.getItem("category")) {
      return JSON.parse(localStorage.getItem("category"));
    } else if (localStorage.getItem("time")) {
      return JSON.parse(localStorage.getItem("time"));
    } else {
      return [];
    }
  };

  const [todoTitle, setTodoTitle] = useState("");
  const [todoCategory, setTodoCategory] = useState("");
  const [todoTime, setTodoTime] = useState("");
  const [todo, setTodo] = useState(storeDetails());

  const [show, setShow] = useState(false);
  const [userIndex, setUserIndex] = useState(0);

  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoCategory, setNewTodoCategory] = useState("");
  const [newTodoTime, setNewTodoTime] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (item, index) => {
    setShow(true);
    setUserIndex(index);
    setNewTodoTitle(item.TIT);
    setNewTodoCategory(item.CAT);
    setNewTodoTime(item.TIM);
  };

  const saveChanges = (e) => {
    e.preventDefault();
    setShow(false);
    const newState = todo.map((obj, indx) => {
      if (indx === userIndex) {
        return {
          ...obj,
          TIT: newTodoTitle,
          CAT: newTodoCategory,
          TIM: newTodoTime,
        };
      }
      return obj;
    });

    setTodo(newState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newObject = {
      TIT: todoTitle,
      CAT: todoCategory,
      TIM: todoTime,
    };
    if (todoTitle && todoCategory && todoTime) {
      setTodo((current) => [...current, newObject]);
    }
    setTodoTitle("");
    setTodoCategory("");
    setTodoTime("");
  };

  const deletebtn = (index) => {
    setTodo(todo.filter((item, ind) => ind !== index));
  };

  useEffect(() => {
    localStorage.setItem("title", JSON.stringify(todo));
  }, [todo]);

  useEffect(() => {
    localStorage.setItem("category", JSON.stringify(todo));
  }, [todo]);

  useEffect(() => {
    localStorage.setItem("time", JSON.stringify(todo));
  }, [todo]);

  return (
    <Container className="mt-5">
      <h3 className=" text-center text-primary">MY TODO LISTS</h3>
      <marquee className="text-info">
        Welcome To My Todo Lists
      </marquee>
      <form onSubmit={handleSubmit}>
        <label>Todo Title</label>
        <input
          type="text"
          className="form-control  shadow-none"
          placeholder="Todo Title"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <label className="mt-3">Todo Category</label>
        <Form.Select
         value={todoCategory}
          onChange={(e) => setTodoCategory(e.target.value)}  
          className="form-control shadow-none"
          >
        <option>choose...</option>
        <option value='Praying'>Praying</option>
        <option value='Eating'>Eating</option>
        <option value='Miscellaneous'>Miscellaneous</option>
        </Form.Select>
   
        <label className="mt-3">Todo Time</label>
        <input
          type="time"
          className="form-control shadow-none  "
          placeholder="Enter your matric Number"
          value={todoTime}
          onChange={(e) => setTodoTime(e.target.value)}
        />

        <button
          type="submit"
          className="btn btn-primary  mt-4 shadow-none"
        >
          <FaPlus/>
        </button>
      </form>

      {todo.length > 0 ? (
        <table className="table  table-hover text-center mt-4">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Todo Title</th>
              <th>Todo Category</th>
              <th>Todo Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todo.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.TIT}</td>
                <td>{item.CAT}</td>
                <td>{item.TIM}</td>
                <td>
                  <button
                    title="delete"
                    onClick={() => deletebtn(index)}
                    className="btn"
                    style={{ color: "red" }}
                  >
                    <FaTrash />
                  </button>
                  <button
                    title="edit"
                    style={{ color: "green" }}
                    onClick={() => handleShow(item, index)}
                    className="btn "
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center mt-4 text-danger">
          <h4>No data available</h4>
        </div>
      )}

      {/* MODAL */}

      <Modal show={show} onHide={handleClose}>
        <Form action="" onSubmit={saveChanges}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Section</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Todo Title</label>
            <input
              type="text"
              value={newTodoTitle}
              onChange={(event) => setNewTodoTitle(event.target.value)}
              className="form-control shadow-none"
            />
            <label className="mt-3">Todo Category</label>
            <Form.Select
         value={newTodoCategory}
          onChange={(e) => setNewTodoCategory(e.target.value)}  
          className="form-control shadow-none"
          >
        <option>choose...</option>
        <option value='Praying'>Praying</option>
        <option value='Eating'>Eating</option>
        <option value='Miscellaneous'>Miscellaneous</option>
        </Form.Select>
            <label className="mt-3">Todo Time</label>
            <input
              type="time"
              value={newTodoTime}
              onChange={(event) => setNewTodoTime(event.target.value)}
              className="form-control shadow-none"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Todo;
