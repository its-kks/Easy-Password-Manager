import { PasswordBlock } from "./PasswordBlock";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Add } from "./Add";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const cookieValues = extractCookieValues(document.cookie);
const userName = cookieValues.userName;
const accessToken = cookieValues.accessToken;
const server = import.meta.env.VITE_SERVER;

/*************************************************************/
//fetching data from server


function extractCookieValues(cookieString) {
  const cookiesArray = cookieString.split("; ");
  const cookieValues = {};

  cookiesArray.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    cookieValues[key] = decodeURIComponent(value);
  });

  return cookieValues;
}

/*************************************************************/
export function Passwords({}) {
  const [pass, setPass] = useState("");
  const [uname, setUname] = useState("");
  const [URL, setURL] = useState("");
  const [credentialArray, setCredentialArray] = useState([]);
  const [reload, setReload] = useState(true);

  if(reload) {
    setReload(false);
    setTimeout(() => {
    }
    , 2000);
  }
  //restructure data and save in credentialArray
  function restructureData(data){
    const list = {}
    for(let pass of data){
      // decrypt password
      let decPass = CryptoJS.AES.decrypt(pass.password,cookieValues.password).toString(CryptoJS.enc.Utf8);
      list[pass._id]={
        password:decPass,
        username:pass.username,
        website:pass.website
      }
    }
    setCredentialArray(list);
  }
  //fetching passwords from server
  async function fetchPasswords() {
    try {
      const response = await fetch(server + "api/passwords", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      //decrypt all the passwords

      restructureData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchPasswords();
  }, []);

  //adding password to server
  async function handleAdd() {
    const masterPassword = cookieValues.password;
    const salt = cookieValues.salt;

    const username = uname;
    const password = CryptoJS.AES.encrypt(pass, masterPassword).toString();
    const website = URL;
    setPass("");
    setUname("");
    setURL("");
    try {
      const response = await fetch(server + "api/passwords", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, website }),
      });
      if (!response.ok) {
        throw new Error("Failed to add password");
      }
      const data = await response.json();
      fetchPasswords();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div
      className="flexbox"
      style={{ height: "100vh", width: "100vw", flexDirection: "column" }}
    >
      <div
        className="flexbox"
        style={{
          height: "10vh",
          background: "rgb(0, 142, 251)",
          width: "50vw",
        }}
      >
        <span
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "32px",
            fontWeight: "bold",
            color: "white",
            fontStyle: "italic",
          }}
        >
          {`Welcome ${userName}`}
        </span>
      </div>
      <div className="flexbox" style={{ height: "90vh", width: "50vw" }}>
        <div className="flexbox" style={{ width: "45vw", paddingRight: "1vw" }}>
          <Add
            onClick={handleAdd}
            pass={pass}
            setPass={setPass}
            uname={uname}
            setUname={setUname}
            URL={URL}
            setURL={setURL}
          />
        </div>
        <div
          className="flexbox"
          style={{
            width: "52vw",
            borderLeft: "0.1vw solid white",
            paddingLeft: "0.5vw",
          }}
        >
          <SimpleBar
            forceVisible="y"
            autoHide={false}
            style={{ height: "80vh", width: "100%" }}
            className="flexbox"
          >
            <div
              className="flexbox"
              style={{
                flexDirection: "column",
                width: "fit-content",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              {
                Object.keys(credentialArray).map(function (id){
                  return (
                    <PasswordBlock
                      id={id}
                      credentials={credentialArray}
                      setCredentials={setCredentialArray}
                    />
                  );
                })
              }
            </div>
          </SimpleBar>
        </div>
      </div>
    </div>
  );
}
