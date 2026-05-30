function DateInput(props){
    return(
        <div>
          <label htmlFor={props.id}
          className="
                      mb-[6px]
                      block
                      text-[13px]
                      font-semibold
                      text-[var(--color-label)]
                    ">
            {props.label}
          </label>

          <input 
            id={props.id}
            type="date"
            value={props.value}
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
                cursor-pointer
              "
          />
          
       </div>
    )
}
export default DateInput