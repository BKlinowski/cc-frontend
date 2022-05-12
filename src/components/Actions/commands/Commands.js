import Command from "./command/command"
import classes from './Commands.module.css'

const Commands = props => {

    return (
        <ul className={classes.Commands}>
            {
                props.commands.map((command, i) => {
                    return (
                        <Command key={i}>{command}</Command>
                    )
                })
            }
        </ul>
    )
}

export default Commands