import React, { useState } from 'react';

function TwitInfo(props){
  const [editable, setEditable] = useState(false)

  const style = {
    border: '1px solid black',
    padding: '8px',
    margin: '8px'
  }

  const handleToggleEdit = () => {
    setEditable(!editable)
  }

  const handleUpdate = (e) => {
    if (e.target.name === 'name'){
      props.info.name = e.target.value
    } else if(e.target.name === 'text'){
      props.info.text = e.target.value
    }
    props.updateData(props.info.id, props.info);
  }

  const handleRemove = () => {
    props.removeData(props.info.id);
  }

  if (editable) {
    return (
      <div style={style}>
        <div>
          <input
            value={props.info.name}
            name="name"
            placeholder="Name"
            onChange={handleUpdate}
          />
        </div>
        <div>
          <input
            value={props.info.text}
            name="text"
            placeholder="Text"
            onChange={handleUpdate}
          />
        </div>
        <button onClick={handleToggleEdit}>Apply</button>
        <button onClick={handleRemove}>Remove</button>
      </div>
    );
  }
  return (
    <div style={style}>
      <div><b>{props.info.name}</b></div>
      <div>{props.info.text}</div>
      <button onClick={handleToggleEdit}>Edit</button>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
}
export default TwitInfo;