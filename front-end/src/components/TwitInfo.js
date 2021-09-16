import React, { useState } from 'react'
import { Button } from '@material-ui/core'

function TwitInfo(props){
  const [editable, setEditable] = useState(false)

  const style = {
    border: '1px solid black',
    padding: '8px',
    margin: '10px'
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
        <Button variant="outlined" color="primary" size="small" onClick={handleToggleEdit} >Apply</Button>
        <Button variant="outlined" color="secondary" size="small" onClick={handleRemove} >Remove</Button>
      </div>
    );
  }
  return (
    <div style={style}>
      <div><b>{props.info.name}</b> · <span>{props.info.time}</span></div>
      <div>{props.info.text}</div>
      <Button variant="contained" color="primary" size="small" onClick={handleToggleEdit}>Edit</Button>
      <Button variant="contained" color="secondary" size="small" onClick={handleRemove}>Remove</Button>
    </div>
  );
}
export default TwitInfo;