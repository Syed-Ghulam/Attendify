function TextArea(props) {
  return (
    <>
      <label
        htmlFor={props.id}
        className="
        mt-[15px]
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

      <textarea
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeHolder}
       className="
        h-[62px]
        w-full
        rounded-[4px]
        border
        border-[#D9DCEA]
        bg-white
        px-4
        py-3
        text-[14px]
        outline-none
        resize-none
        transition-all
        focus:border-[#5B52A3]
        "
      />
    </>
  );
}

export default TextArea;