import { useState } from "react"

import Commands from "./commands/Commands"
import Input from "./Input/Input"
import classes from "./Actions.module.css"
import axios from "axios"

const Actions = props => {
    const [commands, setCommands] = useState([])
    const [inputVal, setInputVal] = useState('')

    const changeInputHandler = e => {
        setInputVal(e.target.value)
    }

    const onSubmitHandler = (e) => {
        if (e.key === "Enter") {
            console.log(`Clicked ${e.target.value}`)
            setCommands(prevCommands => {
                console.log(prevCommands)
                const updatedCommands = [...prevCommands];
                updatedCommands.push(e.target.value);
                setInputVal('')
                console.log(e.target.value)
                axios.post("http://127.0.0.1:4000/command", { command: e.target.value })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    });
                return updatedCommands;
            })
        }
    }

    return (
        <div className={classes.Actions}>
            <Commands commands={commands} />
            <Input onChange={changeInputHandler} value={inputVal} onSubmitHandler={onSubmitHandler} />
        </div>
    )
}

export default Actions;