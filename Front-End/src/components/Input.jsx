function Input(props){
    return(
        <>
          <label htmlFor={props.id}
                className="
                    mb-[6px]
                    block
                    text-[13px]
                    font-semibold
                    text-[var(--color-label)]
                "
          >
            {props.label}
            {props.required && (
                <span className="text-[var(--color-error)]">*</span>
            )}
        </label>
            <input 
            id={props.id}
            type={props.type}            
            placeholder={props.placeHolder}
            value={props.value}
            required = {props.required}
            onChange={props.onChange}

            className="
                      h-[42px]
                      w-full
                      rounded-[4px]
                      border
                      border-[var(--color-border)]
                      bg-[var(--color-white)]
                      px-3
                      text-[14px]
                      outline-none
                      transition-all
                      focus:border-[var(--color-focus)]
                    "
            />

            {
                props.error && (
                    <p className="mt-1 text-sm text-[var(--color-error)]">
                        {props.error}
                    </p>
                )
            }
        </>
    )
}
export default Input;