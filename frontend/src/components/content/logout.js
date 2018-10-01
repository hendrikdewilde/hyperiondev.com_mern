import React from "react";

class ContentLogout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  componentDidMount() {
    //console.log("logout");
    alert("logout");
    this.setState({ redirect: false });
    window.sessionStorage.removeItem("userData");
    this.props.history.push("/login");
  }

  render() {
    return (
      <div>
        <div className="myContentLayout">
          <div className="myContent">
            <div className="myLogin">
              <div className="text-center">
                <h3>Logout</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContentLogout;
