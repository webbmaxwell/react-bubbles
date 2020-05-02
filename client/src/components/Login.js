import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: "",
        password: "",
      };
    };
  };

  handleChange = e => {
    this.setState ({
      credentals: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    })
  };

  login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("http://localhost:5000/login", this.state.credentials)
      .then(res => {
        console.log(res)
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/protected");
      })
      .catch(err => console.error(err))
  };

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
    </>
  );
};

export default Login;
