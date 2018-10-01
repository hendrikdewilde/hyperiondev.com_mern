import React from "react";
import { Redirect } from "react-router-dom";

class ContentTaskEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { taskId: props.match.params.taskId };

    this.handleChangeUserId = this.handleChangeUserId.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChangeUserId(event) {
    this.setState({
      user_id: event.target.value
    });
  }

  handleChangeTitle(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleChangeContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  handleChangeDate(event) {
    this.setState({
      date: event.target.value
    });
  }

  handleChangeComplete(event) {
    this.setState({
      complete: event.target.value
    });
  }

  handleSubmit(event) {
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
          complete: this.state.complete
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
          alert(JSON.parse(text).title + " saved");
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
                <input value={title} onChange={this.handleChangeTitle} />
                <legend>Content:</legend>
                <input value={content} onChange={this.handleChangeContent} />
                <legend>Date:</legend>
                <input value={date} onChange={this.handleChangeDate} />
                <legend>Complete:</legend>
                <input value={complete} onChange={this.handleChangeComplete} />
                <p>
                  <input
                    type="submit"
                    value="Submit"
                    onClick={this.handleSubmit}
                  />
                </p>
              </fieldset>
              <div>
                <ul className="myMenuTask">
                  <li>
                    <a href={"/tasks/taskView/" + this.state.taskId}>Back</a>
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

export default ContentTaskEdit;
