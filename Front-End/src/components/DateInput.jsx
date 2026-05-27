function DateInput(props){
    return(
        <div>
          <label className={props.labelClassName}>
            {props.label}
          </label>

          <input 
            type="date"
            value={props.value}
            onChange={props.onChange}
            className={props.className}
          />
          
       </div>
    )
}
export default DateInput