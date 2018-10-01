import React from "react";
import GreetingMenu from "../../functions/menu";

class ContentMenus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: props.isLoggedIn
    };
  }

  render() {
    return (
      <div>
        <div className="myNav">
          <GreetingMenu isLoggedIn={this.state.isLoggedIn} />
        </div>
      </div>
    );
  }
}

export default ContentMenus;
