import { useState } from 'react';
import './Login.css';
import { FiCopy } from 'react-icons/fi';

export function InputWithCopy({ value, type, setValue, editing }) {
  const [copy, setCopy] = useState(false);
  const [inputType, setInputType] = useState(type);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(value);
    const currVal = value;
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
        value={value} onChange={(event)=>{
            if(editing){
                setValue(event.target.value)
            }
        }}/>

      <button className='copyButton' onClick={handleCopyClick}>
        <FiCopy />
      </button>
    </div>
  );
}