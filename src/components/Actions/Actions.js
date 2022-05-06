import { useState } from "react"

import Commands from "./commands/Commands"
import Input from "./Input/Input"
import classes from "./Actions.module.css"

const Actions = props => {
    const [commands, setCommands] = useState([])
    const onSubmitHandler = (e) => {
        if (e.key === "Enter") {
            console.log(`Clicked ${e.target.value}`)
            setCommands(prevCommands => {
                console.log(prevCommands)
                const updatedCommands = [...prevCommands];
                updatedCommands.push(e.target.value);
                return updatedCommands;
            });
        }
    }

    return (
        <div className={classes.Actions}>
            <Commands commands={commands} />
            <Input onSubmitHandler={onSubmitHandler} />
        </div>
    )
}

export default Actions;