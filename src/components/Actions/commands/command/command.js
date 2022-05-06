import classes from "./command.module.css"


const Command = props => {
    return (
        <li className={classes.Command}>
            {props.children}
        </li>
    )
}

export default Command;