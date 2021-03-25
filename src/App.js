import React, { useState, useEffect } from 'react';
import './App.css';

function App() {


    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [inputTxt, setinputTxt] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const [name, setName] = useState("");
    const [ischeck, setIscheck] = useState(false);

    useEffect(() => {
        if(inputTxt.length > 2)
        {
            fetch("https://api.datamuse.com/words?sl="+inputTxt)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setItems(result.slice(0,10));
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }

    }, [inputTxt])

    const handleSubmit = () =>{
        localStorage.setItem('name', name);
        localStorage.setItem('checked', ischeck);
        localStorage.setItem('word', inputTxt);
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    else {
        return (
            <div className="App appifySection">
                <div className="container">
                    <form className="appifyForm">
                        <div className="form-group">
                            <label>User Name</label>
                            <input type="text" className="form-control" placeholder="User Name" value={name}
                                   onChange={e => setName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Enter Word</label>
                            <input type="text" className="form-control" placeholder="Enter Word" value={inputTxt} onChange={(e) => {setShowDropdown(true); setinputTxt(e.target.value)}}/>
                            {
                                showDropdown &&
                                <ul>
                                    {items.map((item,index) =>(
                                            <li key={index} onClick={() => {setinputTxt(item.word);setShowDropdown(false)}}>
                                                <span>{item.word}</span>
                                                {/*<span>{item.score}</span>*/}
                                            </li>
                                        )
                                    )}
                                </ul>
                            }

                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="checkMe" value={ischeck}
                                   onChange={e => setIscheck(e.target.checked)}/>
                            <label className="form-check-label" htmlFor="checkMe">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={() => handleSubmit()}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }

}

export default App;
