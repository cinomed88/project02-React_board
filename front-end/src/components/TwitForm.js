import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core"
import Icon from '@material-ui/core/Icon';

function TwitForm(props) {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ')

    const [twit, setTwit] = useState({
        name: "",
        text: ""
    });
    const { name, text } = twit

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setTwit({ ...twit, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addData({name: name, text: text, time: now})
        setTwit({name: "", text: ""})
    } 

    const useStyles = makeStyles((theme) => ({
        button: {
          margin: theme.spacing(1),
        },
      }));

    const classes = useStyles()

    return (
        <form onSubmit = {handleSubmit}>
            <input
                placeholder="NAME"
                name="name"
                value={name}
                onChange={onChangeInput}
            />
            <input
                placeholder="Text"
                name="text"
                value={text}
                onChange={onChangeInput}
            />
            <Button variant="contained" color="primary" size="medium" className={classes.button} type="submit">Twit</Button>
        </form>
    );
}

export default TwitForm;