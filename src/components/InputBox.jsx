import { useState } from 'react';

const InputBox = (props) => {
    const [url, setUrl] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.callBackFunc(url);
        event.target.reset(); // Clear the input field after submission
    };

    const handleChange = (event) => {
        setUrl(event.target.value);
    };

    return (
        <>
            <form onSubmit={(e) =>{
                handleSubmit(e);
            }} className="input-box">
                <input
                    disabled={props.disable}
                    type="text"
                    placeholder="Enter YouTube video URL"
                    className="input-field"
                    onChange={(e) => {
                        handleChange(e);
                    }}
                />
                <button type="submit" disabled={props.disable} className="submit-button">
                    Summarize
                </button>
            </form>
        </>
    )
}

export default InputBox;