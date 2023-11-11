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

  //delete credentials
/*
const handleDelete = async (obj,row) => {
  const id = obj.id;
  try {
    const response = await fetch(`/api/passwords/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message);
      throw new Error(errorData.message || 'Failed to delete Password');
    }

    const deletedPassword = await response.json();
    row.remove();
    console.log('Password deleted successfully:', deletedPassword);

  } catch (error) {
    console.log('Error deleting password', error.message);
  }
};
*/
  async function deleteCred(){
    try{
      const response = await fetch(`${server}api/passwords/${id}`,{
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${cookieValues.accessToken}`,
          'Content-Type': 'application/json'
        }
      })

      if(!response.ok){
        const errorData = await response.json();
        alert(errorData.message);
        throw new Error(errorData.message || 'Failed to delete credentials');
      }

      const delPass = await response.json();
    }
    catch(err){
      alert('Error deleting password:',err.message);
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
                <Button 
                  name="Delete" 
                  className="deleteButton button" 
                  onClick={()=>{
                    deleteCred();
                    setCredentials(()=>{
                      delete credentials[id];
                      return {...credentials};
                    });
                  }}
                />
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
