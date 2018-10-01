import React from "react";
import Greeting from "../../functions/users.js";

class ContentHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: props.isLoggedIn
    };
  }

  render() {
    return (
      <div>
        <div className="myHeader">
          <div className="myHeader-jpeg" />
          <header>
            <h1 id="mainHeading">Task-System</h1>

            <div className="mySubHeader">
              <Greeting isLoggedIn={this.state.isLoggedIn} />
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default ContentHeader;
