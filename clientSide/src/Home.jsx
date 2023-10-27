import { useState } from "react";
import {Login} from './Login'
import {Signup} from './Signup'
import {Passwords} from './Passwords'
export function Home(){
    const [login,setLogin] = useState(true);
    const [signUp,setSignUp] = useState(false);
    const [passwords,setPasswords] = useState(false);
    return (
        <>
        {login && <Login setLogin={setLogin} setPasswords={setPasswords} setSignUp={setSignUp}/>}
        {signUp && <Signup setLogin={setLogin} setSignUp={setSignUp}/>}
        {passwords && <Passwords login={login} signup={signUp}/>}
        </>
    )
}