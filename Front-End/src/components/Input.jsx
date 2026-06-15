function Input(props){
    return(
        <>
          <label htmlFor={props.id}
                className="
                    mt-[15px]
                    block
                    text-[13px]
                    font-semibold
                    text-[var(--primary-900)]
                "
          >
            {props.label}
            {props.required && (
                <span className="text-[var(--error)]">*</span>
            )}
        </label>
            <input 
            id={props.id}
            type={props.type}            
            placeholder={props.placeHolder}
            value={props.value}
            required = {props.required}
            onChange={props.onChange}
            readOnly={props.readOnly}

            className="
                      mt-3
                      h-[42px]
                      w-full
                      rounded-[4px]
                      border
                      border-[var(--neutral-300)]
                      bg-white
                      px-3
                      text-[14px]
                      outline-none
                      transition-all
                      focus:border-[var(--primary-500)]
                    "
            />

            {
                props.error && (
                    <p className="mt-1 text-sm text-[var(--error)]">
                        {props.error}
                    </p>
                )
            }
        </>
    )
}
export default Input;