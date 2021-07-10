import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState, useEffect } from "react";

//TODO: Components can be functions or classes.  Functions more commonly used.

// Class Component
// class App extends React.Component {
//   render() {
//     return <h1>Hello from a class</h1>
//   }
// }

// Function Component
const App = () => {
  //TODO: Defining tasks state globally in the App component
  //      States are immutable
  //      States get passed down through the app
  //      Actions get passed up

  // States
  const [showAddTask, setShowAddTask] = useState(true);
  const [tasks, setTasks] = useState([]);

  // Fetch req to json-server backend
  // useEffect() used to force fetchTasks to run on pageload
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  // Add Task
  // Post req to server having the task passed in as a property
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    // Store response in data variable
    const data = await res.json();
    // Use setTasks to update the state with new task (data)
    setTasks([...tasks, data]);
    // const id = Math.floor(Math.random() * 10000) + 1
    // console.log(id);
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  };

  // Delete Task
  const deleteTask = async (id) => {
    // DELETE req to server using id that has been passed in as a property (Back-End)
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    // Filtering to get only tasks that do not match the id, and using setTasks to set the state (Front-End)
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();
    setTasks(tasks.map((task) => (task.id === id ? { ...task, reminder: data.reminder } : task)));
  };

  return (
    // Everything inside return is in a Router Wrapper in order to use routing
    <Router>
      <div className="container">
        {/* passing in 'Hello' as title property to component */}
        {/* <Header title={'Hello'} />  */}

        {/* not passing in title property will result in use of default title prop in Header component if available */}
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />

        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {/* Using shorthand ternary (&&) to decide whether or not to call AddTask form
                  If showAddTask then call AddTask
                  && - shorthand ternary when there is no else condition */}
              {showAddTask && <AddTask onAdd={addTask} />}

              {/* Calling Tasks components and passing in tasks state defined above as a prop  */}
              {/* <Tasks tasks={tasks} onDelete={deleteTask} /> */}

              {/* Using ternary to call task components if they exist, otherwise show No task msg */}
              {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : "No Tasks To Show"}
            </>
          )}
        />

        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
