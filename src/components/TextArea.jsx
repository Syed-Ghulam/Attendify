function TextArea(props){
    return(
        <>
         <div>
            <label className={props.labelclassName}>
                {props.label}
            </label>

            <textarea 
              placeholder={props.placeholder}
              value={props.value}
              onChange={props.onChange}
              className={props.className}
            />
            
         </div>
        </>
    )
}
export default TextArea