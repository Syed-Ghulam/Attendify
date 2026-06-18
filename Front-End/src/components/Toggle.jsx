import Button from './Button'
function Toggle(props){
    return(
        <>
        <label className={props.labelClassName}>
            {props.label}
        </label>
        <div className='flex items-center gap-3'>
      <button 
        type="button"
        onClick = {props.disabled ? undefined : props.onClick}
        className={`mt-3 w-10
                 rounded-full flex items-center transition-all duration-300 ${props.disabled ? "cursor-not-allowed" : "cursor-pointer"}
                ${props.isOn ? "bg-[var(--success)] justify-end": "bg-[var(--neutral-300)] justify-start"}
            `}
        
      >
    <div className="m-1 w-3 h-3 bg-white rounded-full"/>
        </button>

        <span className='mt-3 text-[14px] text-[var(--primary-900)]'>
           {props.isOn ? "Active" : "Inactive"}
        </span>
        </div>
      </>
    )

}
export default Toggle;