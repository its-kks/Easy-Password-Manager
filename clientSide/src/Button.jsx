import React from 'react';
import './Login.css';
import {BiLogIn} from 'react-icons/bi';
import { FaEdit, FaTrash, FaUser,FaKey, FaGlobe,FaTimes } from 'react-icons/fa';
export function Button({onClick,name,className}){
    return (
        <>
            <button className={className+" "+"flexbox"} onClick={onClick}>
                {(name=="user" || name=="pass" || name=="url" || name=="close") ? "" : name}
                {name==="Login"?<BiLogIn style={{marginRight:"5px"}}/>:null}
                {name==="Edit"?<FaEdit style={{marginLeft:"5px"}}/>:null}
                {name==="Delete"?<FaTrash style={{marginLeft:"5px"}}/>:null}
                {name==="user"?<FaUser style={{marginLeft:"5px"}}/>:null}
                {name==="pass"?<FaKey style={{marginLeft:"5px"}}/>:null}
                {name==="url"?<FaGlobe style={{marginLeft:"5px"}}/>:null}
                {name=="close"?<FaTimes style={{marginLeft:"5px"}}/>:null}
            </button>
        </>
    )
}