import React, { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import "./Login.css";
export function Add({ onClick,pass,setPass,uname,setUname,URL,setURL }) {
  return (
    <div className="flexbox" style={{ flexDirection: "column" }}>
      <Input placeholder="Username" value={uname} upDate={setUname} />
      <Input placeholder="Password" value={pass} upDate={setPass} />
      <Input placeholder="URL" value={URL} upDate={setURL} />
      <Button onClick={onClick} name={"Add"} className={"loginButton button"} />
    </div>
  );
}
