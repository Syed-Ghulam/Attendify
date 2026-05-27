import Arrow from "../assets/icons/Vector.svg";

function Select(props){

    return(

        <div className="relative">

            {/* Label */}
            <label className={props.labelClassName}>

                {props.label}

                {
                    props.required && (
                        <span className="text-red-500">*</span>
                    )
                }

            </label>

            {/* Select */}
            <select
                value={props.value}
                onChange={props.onChange}
                required={props.required}
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

        </div>

    )
}

export default Select