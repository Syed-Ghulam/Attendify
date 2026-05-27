function Select(props){

    return(
        <div>

            <label className={props.labelClassName}>
                {props.label}
            </label>

            <select
                multiple = {props.multiple}
                value={props.value}
                onChange={props.onChange}
                className={props.className}
            >

                {
                    props.options.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))
                }

            </select>

        </div>
    )
}

export default Select