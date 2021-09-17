import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from "@material-ui/core"


function TwitForm(props) {
    const now = new Date().toLocaleString('en-CA')

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
        input1: {
            margin: theme.spacing(1),
            width: "150px",
        },
        input2: {
            margin: theme.spacing(1),
            width: "100%",
        },
        button: {
          margin: theme.spacing(1),
        },
      }));

    const classes = useStyles()

    return (
        <form onSubmit = {handleSubmit}>
            <Input
                placeholder="Name"
                name="name"
                value={name}
                className={classes.input1}
                onChange={onChangeInput}
            />
            <Input
                placeholder="Text"
                name="text"
                value={text}
                className={classes.input2}
                onChange={onChangeInput}
            />
            <Button variant="contained" color="primary" size="medium" className={classes.button} type="submit">Twit</Button>
        </form>
    );
}

export default TwitForm;