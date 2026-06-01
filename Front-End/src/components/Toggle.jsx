import Button from './Button'
function Toggle(props){
    return(
        <>
        <label className={props.labelClassName}>
            {props.label}
        </label>
        <div className='flex items-center gap-3'>
      <Button 
        type={props.type}
        onClick = {props.onClick}
        className={`
                w-16 h-8 rounded-full p-1 flex items-center transition-all duration-300 cursor-pointer
                ${props.isOn ? "bg-green-500 justify-end": "bg-gray-400 justify-start"}
            `}
        
      >
    <div className="w-6 h-6 bg-white rounded-full"/>
        </Button>

        <span className='text-[14px] text-[var(--color-heading)]'>
           {props.isOn ? "Active" : "Inactive"}
        </span>
        </div>
      </>
    )

}
export default Toggle