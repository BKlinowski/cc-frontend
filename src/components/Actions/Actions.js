import { useState, useEffect } from "react"
import socketIOClient from "socket.io-client";
import Commands from "./commands/Commands"
import Results from "./results/Results"
import Input from "./Input/Input"
import classes from "./Actions.module.css"
import axios from "axios"
const ENDPOINT = "http://127.0.0.1:4000";

const Actions = props => {
    const [commands, setCommands] = useState([])
    const [inputVal, setInputVal] = useState('')
    const [responses, setResponses] = useState([])
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("command_res", data => {
            if (data.command) {
                setResponses(prevRes => {
                    const res = [...prevRes]
                    res.push("\n", data.data)
                    return res;
                })
            }
            console.log(data)
        });
    }, []);

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

                return updatedCommands;
            })
            axios.post("http://127.0.0.1:4000/command", { command: e.target.value })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                });
        }
    }

    return (
        <div className={classes.Actions}>
            <Commands commands={commands} />
            <Results responses={responses} />
            <Input onChange={changeInputHandler} value={inputVal} onSubmitHandler={onSubmitHandler} />
        </div>
    )
}

export default Actions;