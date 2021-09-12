import React, { useState } from 'react';

function TwitForm(props) {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const now = new Date()
    const nowString = `${month[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}`

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
        props.addData({name: name, text: text, time: nowString})
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