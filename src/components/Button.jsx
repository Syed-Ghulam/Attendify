function Button(props){
    return(
        <button  
        onClick={props.onClick} 
        className={props.className} 
        >
            {props.text || props.children}
        </button>
    )
}
export default Button