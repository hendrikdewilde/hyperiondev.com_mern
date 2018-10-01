import React from "react";
import { Redirect } from "react-router-dom";

class ContentTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      userData: null
    };
    ContentTask.buildLinkAll = ContentTask.buildLinkAll.bind(this);
  }

  static buildLinkAll() {
    let userId = JSON.parse(window.sessionStorage.getItem("userData")).googleId;
    let obj = {
      link: "/tasks/" + userId + "/task"
    };
    return <a href={obj.link}>All</a>;
  }

  render() {
    if (!window.sessionStorage.getItem("userData")) {
      return <Redirect to={"/"} />;
    }
    //alert('sessionStorage: ' + JSON.parse(window.sessionStorage.getItem('userData')).googleId);
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
          </div>
        </div>
      </div>
    );
  }
}

export default ContentTask;
