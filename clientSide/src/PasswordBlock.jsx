import { useState } from "react";
import { InputWithCopy } from "./InputWithCopy";
import { Button } from "./Button";
import "./Login.css";

export function PasswordBlock({ id, pass, uname, URL }) {
  const [passwords, setPassword] = useState(pass);
  const [username, setUsername] = useState(uname);
  const [url, setUrl] = useState(URL);
  const [edit, setEdit] = useState(false);
  const [clicked, setClick] = useState(false);

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
              setUsername(newVal);
            }}
            editing={edit}
          />
          <InputWithCopy
            type="password"
            value={passwords}
            setValue={(newVal) => {
              setPassword(newVal);
            }}
          />
          <InputWithCopy
            type="text"
            value={url}
            setValue={(newVal) => {
              setUrl(newVal);
            }}
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
                  }}
                />
                <Button name="Delete" className="deleteButton button" />
              </>
            ) : (
              <Button
                name="Save"
                className="loginButton button"
                onClick={() => {
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
