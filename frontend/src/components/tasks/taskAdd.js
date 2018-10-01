import React from "react";
import { Redirect } from "react-router-dom";

class ContentTaskAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: JSON.parse(window.sessionStorage.getItem("userData")).googleId,
      title: "",
      content: "",
      date: ""
    };

    this.handleChangeUserId = this.handleChangeUserId.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    //alert('Task Add: ' + this.state.user_id);
    event.preventDefault();

    fetch(
      "/restApi/" +
        JSON.parse(window.sessionStorage.getItem("userData")).googleId +
        "/task",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: this.state.user_id,
          title: this.state.title,
          content: this.state.content,
          date: this.state.date
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
    const title = this.state.title;
    const content = this.state.content;
    const date = this.state.date;
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
              <h3>Add</h3>
            </p>
            <form onSubmit={this.handleSubmit}>
              <fieldset>
                <legend>Title:</legend>
                <input value={title} onChange={this.handleChangeTitle} />
                <legend>Content:</legend>
                <input value={content} onChange={this.handleChangeContent} />
                <legend>Date:</legend>
                <input value={date} onChange={this.handleChangeDate} />
                <p>
                  <input type="submit" value="Submit" />
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ContentTaskAdd;
