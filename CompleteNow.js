import React, { useState } from "react";
import classes from "./CompleteNow.module.css";
import { useHistory } from "react-router-dom";

const CompleteNow = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const history = useHistory();

  const nameHandler = (event) => {
    console.log(event);
    setName(event.target.value);
  };

  const urlHandler = (event) => {
    
    setUrl(event.target.value);
  };

  const token = localStorage.getItem("idToken");
  console.log(token);

  //     idToken	string	A Firebase Auth ID token for the user.
  // displayName	string	User's new display name.
  // photoUrl	string	User's new photo url.
  // deleteAttribute	List of strings	List of attributes to delete, "DISPLAY_NAME" or "PHOTO_URL". This will nullify these values.
  // returnSecureToken	boolean	Whether or not to return an ID and refresh token.

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredFullName = name;
    const enteredUrl = url;
    console.log(enteredUrl, enteredFullName);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDt8YinXVEx0C7pqrKBiYFIaGPM4P9HrBc",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          displayName: enteredFullName,
          photoUrl: enteredUrl,
        //   deleteAttribute: "DISPLAY_NAME",
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      console.log(res);
      if (res.ok) {
        alert("your profile updated successfully");
        return res.json().then((data) => {
          console.log(data);
          history.push("/");
        });
      } else {
        return res.json().then((data) => {
          let errorMsg = "profile not updated";
          alert(errorMsg);
        });
      }
    });

    console.log(enteredFullName, enteredUrl);
  };

  return (
    <div className={classes.profile}>
      <form onSubmit={submitHandler}>
        <div className={classes.input}>
          <label htmlFor="name">Full Name:</label>
          <input type="name" value={name} onChange={nameHandler} required />
        </div>

        <div className={classes.input}>
          <label htmlFor="number">Url:</label>
          <input type="text" value={url} onChange={urlHandler} required />
        </div>

        <button type="submit" className={classes.update}>
          Update
        </button>
      </form>
    </div>
  );
};

export default CompleteNow;
