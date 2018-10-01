import React from "react";
import { GoogleLogin } from "react-google-login";

// Test - local Google OAuth
//const clientId = "475972098448-ba88bsj74h3ug7konomdus8m3oju1k8d.apps.googleusercontent.com";
// Production - task24.herokuapp.com Google OAuth
const clientId = '475972098448-3envl079c65trjj362kd5g49dkjj3ih2.apps.googleusercontent.com';

class ContentLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
  }

  success(response) {
    //console.log(response);
    this.setState({ redirect: true });
    //let responseJson = response;
    //alert(JSON.stringify(response.profileObj));
    window.sessionStorage.setItem(
      "userData",
      JSON.stringify(response.profileObj)
    );

    fetch(
      "/restApi/" +
        JSON.parse(window.sessionStorage.getItem("userData")).googleId +
        "/user",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          imageUrl: JSON.parse(window.sessionStorage.getItem("userData"))
            .imageUrl,
          email: JSON.parse(window.sessionStorage.getItem("userData")).email,
          name: JSON.parse(window.sessionStorage.getItem("userData")).name
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
        this.props.history.push("/tasks");
      } else {
        //alert(JSON.parse(text).google.name + ' - '+ JSON.parse(text).google.email);
        this.props.history.push("/tasks");
      }
    });
    //this.props.history.push("/tasks");
  }

  error(response) {
    console.error(response);
    alert("error");
    this.setState({ redirect: false });
    window.sessionStorage.removeItem("userData");
    //let responseJson = response;
    //alert(JSON.stringify(responseJson));
  }

  render() {
    return (
      <div>
        <div className="myContentLayout">
          <div className="myContent">
            <div className="myLogin">
              <div className="text-center">
                <h3>Login</h3>

                <GoogleLogin
                  clientId={clientId}
                  scope="https://www.googleapis.com/auth/plus.me"
                  onSuccess={this.success}
                  onFailure={this.error}
                  // onRequest={loading}
                  approvalPrompt="force"
                  //responseType="code"
                  fetchBasicProfile="true"
                  //uxMode="redirect"
                  //redirectUri="/aboutUs"
                  //disabled
                  // prompt="consent"
                  // className='button'
                  // style={{ color: 'red' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContentLogin;
