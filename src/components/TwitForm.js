import React, { useState } from 'react';

function TwitForm(props) {
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
        props.addData({name: name, text: text})
        setTwit({name: "", text: ""})
    } 

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
            <button type="submit"> Twit </button>
        </form>
    );
}

export default TwitForm;