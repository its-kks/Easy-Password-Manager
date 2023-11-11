import { useState } from 'react';
import './Login.css';
import { FiCopy } from 'react-icons/fi';

export function InputWithCopy({ type, setValue, editing, iname, id, credentials,setCredentials }) {
  const [copy, setCopy] = useState(false);
  const [inputType, setInputType] = useState(type);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(credentials[id][iname]);
    const currVal = credentials[id][iname];
    setCopy(true);
    setValue('Copied!');
    setInputType('text');
    setTimeout(() => {
      setCopy(false);
      setValue(currVal);
      setInputType(type);
    }, 1000);
  };

  return (
    <div style={{ margin: '10px', position: 'relative' }}>
      <input 
        type={inputType} 
        className='copyInput' 
        value={credentials[id][iname]} 
        onChange={(event)=>{
          if(editing){
            const newCredentials = { ...credentials };
            newCredentials[id] = { ...newCredentials[id], [iname]: event.target.value };
            setCredentials(newCredentials);
          }
        }}
      />

      <button className='copyButton' onClick={handleCopyClick}>
        <FiCopy />
      </button>
    </div>
  );
}