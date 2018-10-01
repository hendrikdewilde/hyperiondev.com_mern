import React from "react";
import { Redirect } from "react-router-dom";

class ContentProfile extends React.Component {
  state = {
    google_id: "",
    imageUrl: "",
    email: "",
    name: "",
    db_id: ""
  };

  componentDidMount() {
    if (!window.sessionStorage.getItem("userData")) {
      this.props.history.replace("/");
    } else if (window.sessionStorage.getItem("userData") === null) {
      this.props.history.replace("/");
    } else {
      fetch(
        "/restApi/" +
          JSON.parse(window.sessionStorage.getItem("userData")).googleId +
          "/profile"
      )
        .then(res => res.json())
        .then(data =>
          this.setState({
            google_id: data.google.id,
            imageUrl: data.google.imageUrl,
            email: data.google.email,
            name: data.google.name,
            db_id: data._id
          })
        );
    }
  }

  render() {
    if (!window.sessionStorage.getItem("userData")) {
      return <Redirect to={"/"} />;
    }
    const googleId = this.state.google_id;
    const imageUrl = this.state.imageUrl;
    const email = this.state.email;
    const name = this.state.name;
    const dbId = this.state.db_id;
    return (
      <div>
        <div className="myContentLayout">
          <div className="myContent">
            <div className="myLogin">
              <div className="text-center">
                <h3>Profile</h3>
                <img src={imageUrl} alt="" />
                <fieldset>
                  <legend>Name & Surname:</legend>
                  <input value={name} />
                  <legend>Email:</legend>
                  <input value={email} />
                  <legend>Google ID:</legend>
                  <input value={googleId} />
                  <legend>DB ID:</legend>
                  <input value={dbId} />
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContentProfile;
