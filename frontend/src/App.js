import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ContentHeader from "./components/header";
import ContentMenus from "./components/menus";
import ContentFooter from "./components/footer";
import ContentHome from "./components/content/home";
import ContentAboutUs from "./components/content/aboutUs";
import ContentMeetTheTeam from "./components/content/meetTheTeam";
import ContentLogin from "./components/content/login";
import ContentListTask from "./components/tasks/listTask";
import ContentTaskCompleted from "./components/tasks/taskCompleted";
import ContentTaskUncompleted from "./components/tasks/taskUncompleted";
import ContentTaskDeadline from "./components/tasks/taskDeadline";
import ContentTaskOutstanding from "./components/tasks/taskOutstanding";
import ContentTaskCompletedLastMonth from "./components/tasks/taskCompletedLastMonth";
import ContentTask from "./components/tasks/taskMenu";
import ContentTaskAdd from "./components/tasks/taskAdd";
import ContentLogout from "./components/content/logout";
import ContentViewTask from "./components/tasks/viewTask";
import ContentTaskEdit from "./components/tasks/taskEdit";
import ContentProfile from "./components/content/profile";

class App extends Component {
  render() {
    let isLoggedIn = false;

    if (!window.sessionStorage.getItem("userData")) {
      isLoggedIn = false;
    } else {
      //alert('sessionStorage: ' + JSON.parse(window.sessionStorage.getItem('userData')).googleId);
      isLoggedIn = true;
    }

    return (
      <Router>
        <div id="myMain">
          <div className="mySheet">
            <div className="myBody">
              <ContentHeader isLoggedIn={isLoggedIn} />

              <ContentMenus isLoggedIn={isLoggedIn} />

              <Route exact path="/" component={ContentHome} />
              <Route exact path="/aboutUs" component={ContentAboutUs} />
              <Route exact path="/meetTheTeam" component={ContentMeetTheTeam} />
              <Route exact path="/login" component={ContentLogin} />
              <Route exact path="/logout" component={ContentLogout} />

              <Route exact path="/tasks" component={ContentTask} />
              <Route exact path="/tasks/task" component={ContentListTask} />
              <Route exact path="/tasks/taskCompleted" component={ContentTaskCompleted} />
              <Route exact path="/tasks/taskUncompleted" component={ContentTaskUncompleted} />
              <Route exact path="/tasks/taskDeadline" component={ContentTaskDeadline} />
              <Route exact path="/tasks/taskOutstanding" component={ContentTaskOutstanding} />
              <Route exact path="/tasks/taskCompletedLastMonth" component={ContentTaskCompletedLastMonth} />

              <Route exact path="/tasks/taskAdd" component={ContentTaskAdd} />
              <Route exact path="/tasks/taskView/:taskId" component={ContentViewTask} />
              <Route exact path="/tasks/taskView/:taskId/taskEdit" component={ContentTaskEdit} />

              <Route exact path="/profile" component={ContentProfile} />

              <ContentFooter />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
