import React,{useState} from "react";
import { Link } from "react-router-dom";
import classes from './AuthForm.module.css';
import { useHistory } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState('');

  const history = useHistory();

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

//   const confirmHandler = (event) => {
//     setConfirm(event.target.value);
//   };
 
  const submitHandler = (event) => {
    event.preventDefault();
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDt8YinXVEx0C7pqrKBiYFIaGPM4P9HrBc";

    if (password) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            alert("you logged in Successfully");
            return res.json();
          } else {
            return res.json().then((data) => {
              
              let errorMessage = "Authentication failed";
             
              throw new Error(errorMessage);
            });
          }
        })
         .then((data) => {
            console.log(data.idToken);
            history.push('/complete');
         })
         .catch((err) => {
            alert(err.message);
         });
         } else {
            alert("password didn't match");
         };
        
         setEmail("");
         setPassword("");
        // setConfirm("");
    
};

return (
        <section className={classes.auth}>
      
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input 
          type='email'  
          required 
          value={email}
          onChange={emailHandler}
        />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input 
          type='password' 
          required
          value={password}
          onChange={passwordHandler} />
        </div>
       
        <div className={classes.actions}>
          <button>Login</button>
        </div>
      </form>
        <button type="button" >
            <Link to="/email">Forgot Password</Link>
        </button>
    </section>
    );
};


export default Login;
