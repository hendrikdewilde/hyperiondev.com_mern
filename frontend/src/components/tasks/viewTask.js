import React from "react";
import { Redirect } from "react-router-dom";

class ContentViewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = { taskId: props.match.params.taskId };
    this.handleDelete = this.handleDelete.bind(this);
    this.markComplete = this.markComplete.bind(this);
  }
  state = {
    user_id: "",
    title: "",
    content: "",
    date: "",
    complete: ""
  };

  componentDidMount() {
    if (!window.sessionStorage.getItem("userData")) {
      this.props.history.replace("/");
    } else if (window.sessionStorage.getItem("userData") === null) {
      this.props.history.replace("/");
    } else {
      //alert(window.sessionStorage.getItem('userData'));
      let url =
        "/restApi/" +
        JSON.parse(window.sessionStorage.getItem("userData")).googleId +
        "/task/" +
        this.state.taskId;
      fetch(url)
        .then(res => res.json())
        .then(data =>
          this.setState({
            user_id: data.user_id,
            title: data.title,
            content: data.content,
            date: data.date,
            complete: data.complete
          })
        );
    }
  }

  handleDelete(event) {
    event.preventDefault();
    let urlDel =
      "/restApi/" +
      JSON.parse(window.sessionStorage.getItem("userData")).googleId +
      "/task/" +
      this.state.taskId +
      "";
    fetch(urlDel, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })
      .then(resp => {
        return resp.text();
      })
      .then(text => {
        //alert(text);
        if (JSON.parse(text).message) {
          alert(JSON.parse(text).message);
          this.props.history.push("/tasks");
        } else {
          alert("Something went wrong");
          //this.props.history.push("/tasks");
        }
      });
  }

  markComplete(event) {
    //alert('Task Add: ' + this.state.user_id);
    event.preventDefault();
    fetch(
      "/restApi/" +
        JSON.parse(window.sessionStorage.getItem("userData")).googleId +
        "/task/" +
        this.state.taskId +
        "",
      {
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: JSON.parse(window.sessionStorage.getItem("userData"))
            .googleId,
          title: this.state.title,
          content: this.state.content,
          date: this.state.date,
          complete: true
        })
      }
    )
      .then(resp => {
        return resp.text();
      })
      .then(text => {
        //alert(text);
        if (JSON.parse(text).message) {
          alert(JSON.parse(text).message);
        } else {
          alert(JSON.parse(text).title + " Completed");
          this.props.history.push("/tasks");
        }
      });
  }

  render() {
    if (!window.sessionStorage.getItem("userData")) {
      return <Redirect to={"/"} />;
    }
    //const user_id = this.state.user_id;
    const title = this.state.title;
    const content = this.state.content;
    const date = this.state.date;
    const complete = this.state.complete;
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

            <div>
              <h3>View</h3>
            </div>

            <div>
              <fieldset>
                <legend>Title:</legend>
                <input value={title} />
                <legend>Content:</legend>
                <input value={content} />
                <legend>Date:</legend>
                <input value={date} />
                <legend>Complete:</legend>
                <input value={complete} />
              </fieldset>
              <div>
                <ul className="myMenuTask">
                  <li>
                    <a
                      href={
                        "/tasks/taskView/" + this.state.taskId + "/taskEdit/"
                      }
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a href="" onClick={this.handleDelete}>
                      Delete
                    </a>
                  </li>
                  <li>
                    <a href="" onClick={this.markComplete}>
                      Mark Complete
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContentViewTask;
