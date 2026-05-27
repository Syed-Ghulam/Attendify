function Input(props){
    return(
        <>
          <label htmlFor={props.id}>
            {props.label}
            {props.required && (
                <span className="text-red-500">*</span>
            )}
        </label>
            <input 
            id={props.id}
            type={props.type}            
            placeholder={props.placeHolder}
            value={props.value}
            required = {props.required}
            onChange={props.onChange}

            className={props.className}
            
            
            />


        
        </>
    )
}
export default Input