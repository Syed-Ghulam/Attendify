function Input(props){
    return(
        <>
          <label htmlFor={props.id}
                className="
                    mb-[6px]
                    block
                    text-[13px]
                    font-semibold
                    text-[#2D2D5A]
                "
          >
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

            className="
                      h-[42px]
                      w-full
                      rounded-[4px]
                      border
                      border-[#D9DCEA]
                      bg-white
                      px-3
                      text-[14px]
                      outline-none
                      transition-all
                      focus:border-[#5B52A3]
                    "
            />

            {
                props.error && (
                    <p className="mt-1 text-sm text-red-500">
                        {props.error}
                    </p>
                )
            }
        </>
    )
}
export default Input;