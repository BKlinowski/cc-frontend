import classes from './Input.module.css'

const Input = props => {
    return (
        <>
            <input className={classes.Input} onKeyDown={props.onSubmitHandler} />
        </>
    )
}

export default Input;