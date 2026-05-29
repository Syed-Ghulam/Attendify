function DateInput(props){
    return(
        <div>
          <label className="
                      mb-[6px]
                      block
                      text-[13px]
                      font-semibold
                      text-[#2D2D5A]
                    ">
            {props.label}
          </label>

          <input 
            type="date"
            value={props.value}
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
                cursor-pointer
              "
          />
          
       </div>
    )
}
export default DateInput