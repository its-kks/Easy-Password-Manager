import { useState } from "react";
import { InputWithCopy } from "./InputWithCopy";
import { Button } from "./Button";
import "./Login.css";
import CryptoJS from "crypto-js";

function extractCookieValues(cookieString) {
  const cookiesArray = cookieString.split("; ");
  const cookieValues = {};

  cookiesArray.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    cookieValues[key] = decodeURIComponent(value);
  });

  return cookieValues;
}
const server = import.meta.env.VITE_SERVER;
const cookieValues = extractCookieValues(document.cookie);


export function PasswordBlock({id,credentials,setCredentials}) {
  const [edit, setEdit] = useState(false);
  const [clicked, setClick] = useState(false);
  const username = credentials[id].username;
  const passwords = credentials[id].password;
  const url = credentials[id].website;

  //update data in database 
/*
const handleUpdate = async (obj, usernameTD, passwordTD, websiteTD, updateTD) => {
  const id = obj.id;
  const username = usernameTD.querySelector('input').value;
  const password = passwordTD.querySelector('input').value;
  const website = websiteTD.querySelector('input').value;

  console.log(userName);
  console.log(password);
  console.log(website);
  
  if(username && password && website){
    // Set the new text values
    usernameTD.textContent = username;
    passwordTD.textContent = password;
    websiteTD.textContent = website;
    try{
      const response = await fetch(`/api/passwords/${id}`,{
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            website,
            password,
            })
        });
        if(!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update password');
        }
        const updatedPassword = await response.json();
        const tickIcon = updateTD.querySelector('i');

        //updating the data in the table
        tickIcon.remove();

        const updateIcon = document.createElement("i");
        updateIcon.classList.add("fas", "fa-edit", "update-icon");
        updateIcon.addEventListener('click', () => changeToUpdate(obj, usernameTD, passwordTD, websiteTD, updateTD));
        updateTD.appendChild(updateIcon);
        console.log('Password updated succesfull',updatedPassword);


    } catch (error){
      console.error('Error updating password:', error.message);
    }
  }
  else{
    alert('All fields are mandatory');
  }
};
*/

  async function handleUpdate(){
    if(username && passwords && url){
      try{
        //encrypt the password
        const enPass = CryptoJS.AES.encrypt(passwords, cookieValues.password).toString();
        const response = await fetch(`${server}api/passwords/${id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${cookieValues.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            website:url,
            password:enPass
          })
        });
        if(!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update data");
        }
        const updatedPassword = await response.json();

      }
      catch(err){
        alert(`Error in updating password: ${err.message}`);
      }
    }
    else{
      alert("No field can be empty!");
    }
  }

  return (
    <div
      className="flexbox passwordBox"
      style={{
        flexDirection: "column",
        width: "fit-content",
        cursor: "pointer",
      }}
    >
      {clicked ? (
        <>
          <Button name="close" className={"crossButton"} onClick={() => {setClick(false)}}/>
          <InputWithCopy
            type="text"
            value={username}
            setValue={(newVal) => {
              // setUsername(newVal);
            }}
            id={id}
            credentials={credentials}
            iname={"username"}
            editing={edit}
            setCredentials={setCredentials}
          />
          <InputWithCopy
            type="password"
            value={passwords}
            setValue={(newVal) => {
              // setPassword(newVal);
            }}
            id={id}
            credentials={credentials}
            iname={"password"}
            editing={edit}
            setCredentials={setCredentials}
          />
          <InputWithCopy
            type="text"
            value={url}
            setValue={(newVal) => {
              // setUrl(newVal);
            }}
            id={id}
            credentials={credentials}
            editing={edit}
            iname={"website"}
            setCredentials={setCredentials}

          />
          <div
            className="flexbox"
            style={{
              alignItems: "centre",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            {!edit ? (
              <>
                <Button
                  name="Edit"
                  className="loginButton button"
                  onClick={() => {
                    setEdit(true);
                    console.log("Editing");
                  }}
                />
                <Button name="Delete" className="deleteButton button" />
              </>
            ) : (
              <Button
                name="Save"
                className="loginButton button"
                onClick={() => {
                  //update data on server
                  handleUpdate();
                  setEdit(false);
                }}
              />
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flexbox">
            <div className="flexbox" style={
              {flexDirection: "column",
              alignItems:"flex-start",
              margin:"10px",
              }}
              onClick={() => {
                setClick(true);
              }
            }>
                <big style={{color:"white"}}>
                  {username}
                </big>
                <small style={{color:"grey"}}>
                  {url}
                </small>
            </div>
            <div className="flexbox">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(username);
                }}
                name={"user"}
                className={"miniCopyButton"}
              />
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(passwords);
                }}
                name={"pass"}
                className={"miniCopyButton"}
              />
              <Button
                onClick={() => {
                  window.open(url);
                }}
                name={"url"}
                className={"miniCopyButton"}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
