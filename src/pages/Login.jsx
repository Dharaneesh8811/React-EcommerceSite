import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    function login(e){

        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));

        if(
            user &&
            email===user.email &&
            password===user.password
        ){

            localStorage.setItem("loggedIn","true");

            alert("Login Successful");

            navigate("/");

        }else{

            alert("Invalid Email or Password");

        }

    }

    return(

<div className="login-page">

<div className="login-card">

<h1>Welcome Back</h1>

<p>Login to continue shopping</p>

<form onSubmit={login}>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button>Login</button>

</form>

<p>

Don't have an account?

<Link to="/register"> Register</Link>

</p>

</div>

</div>

    )

}

export default Login;