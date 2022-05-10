import classes from './Input.module.css'

const Input = props => {
    return (
        <>
            <input onChange={props.onChange} value={props.value} ref={props.ref} className={classes.Input} onKeyDown={props.onSubmitHandler} />
        </>
    )
}

export default Input;