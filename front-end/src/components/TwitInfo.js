import React, { useState } from 'react'
import { Button, ButtonGroup, Input, Box } from '@material-ui/core'

function TwitInfo(props){
  const [editable, setEditable] = useState(false)

  const style = {
    border: '3px solid black',
    padding: '10px',
    marginTop: '10px'
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
          <Input
            value={props.info.name}
            name="name"
            placeholder="Name"
            onChange={handleUpdate}
          />
        </div>
        <div>
          <Input
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
      <Box clone p={0}>
        <div><b>{props.info.name}</b> · <span>{props.info.time}</span></div>
      </Box>
      <Box clone p={1}>
        <div>{props.info.text}</div>
      </Box>
      <ButtonGroup variant="contained" color="primary" aria-label="text primary button group">
        <Button color="primary" size="small" onClick={handleToggleEdit}>Edit</Button>
        <Button color="secondary" size="small" onClick={handleRemove}>Remove</Button>
      </ButtonGroup>
    </div>
  );
}
export default TwitInfo;