import React from "react";
import { Link, Redirect } from "react-router-dom";

class ContentTaskUncompleted extends React.Component {
  state = { tasks: [] };

  componentDidMount() {
    if (!window.sessionStorage.getItem("userData")) {
      this.props.history.replace("/");
    } else if (window.sessionStorage.getItem("userData") === null) {
      this.props.history.replace("/");
    } else {
      fetch(
        "/restApi/" +
          JSON.parse(window.sessionStorage.getItem("userData")).googleId +
          "/taskUncompleted"
      )
        .then(res => res.json())
        .then(tasks => this.setState({ tasks }));
    }
  }
  render() {
    if (!window.sessionStorage.getItem("userData")) {
      return <Redirect to={"/"} />;
    }
    return (
      <div>
        <div className="myContentLayout">
          <div className="myContent">
            <h2>Tasks</h2>

            <ul className="myMenuTask">
              <li>
                <a href="/tasks/task">All</a>
              </li>
              <li>
                <a href="/tasks/taskCompleted">Completed</a>
              </li>
              <li>
                <a href="/tasks/taskUncompleted">Uncompleted</a>
              </li>
              <li>
                <a href="/tasks/taskDeadline">Deadline</a>
              </li>
              <li>
                <a href="/tasks/taskOutstanding">Outstanding</a>
              </li>
              <li>
                <a href="/tasks/taskCompletedLastMonth">Completed last month</a>
              </li>
              <li>
                <a href="/tasks/taskAdd">Add</a>
              </li>
            </ul>

            <p>
              <h3>Uncompleted Page</h3>
            </p>

            {this.state.tasks.map(task => (
              <div key={task._id}>
                <Link to={"/tasks/taskView/" + task._id}>
                  Title: {task.title} ({task.date})
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ContentTaskUncompleted;
