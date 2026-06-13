function Button(props){
    return(
        <button  
        type={props.type}
        onClick={props.onClick} 
        className={` h-[42px] text-[14px] rounded-[4px] cursor-pointer
                   ${props.className || ""}`}
        >
            {props.text || props.children}
        </button>
    )
}
export default Button;