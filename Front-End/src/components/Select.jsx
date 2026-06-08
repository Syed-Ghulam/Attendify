import Arrow from "../assets/icons/Vector.svg";

function Select(props){

    return(

        <div className="relative">

            {/* Label */}
            <label htmlFor={props.id}
            className={props.labelClassName}>

                {props.label}

                {
                    props.required && (
                        <span className="text-[var(--error)]">*</span>
                    )
                }

            </label>

            {/* Select */}
            <select
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                required={props.required}
                disabled={props.disabled}
                className={`
                ${props.className}
                appearance-none
                pr-10
                `}
            >

                {
                    props.options.map((item, index) => (

                        <option
                        key={index}
                        value={item}
                        >
                            {item}
                        </option>

                    ))
                }

            </select>

            {/* Arrow Icon */}
            <img
               src={Arrow}
               alt="arrow"
               className="
               absolute
               right-4
               top-[70%]
               -translate-y-1/2
               w-3
               h-3
               pointer-events-none
               "
            />

              {props.error && (
                    <p className="mt-1 text-[var(--error)]">
                        {props.error}
                    </p>
                )}

        </div>

    )
}

export default Select;