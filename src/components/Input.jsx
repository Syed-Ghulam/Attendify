function Input(props){
    return(
        <>
          <label>{props.label}</label>
            <input 
            type={props.type}            
            placeholder={props.placeHolder}
            value={props.value}
            onChange={props.onChange}

            className="w-full p-[12px] mb-[22px] border border-[#CED4DA] rounded-[4px] text-[15px] box-border outline-none"
            
            
            />


        
        </>
    )
}
export default Input