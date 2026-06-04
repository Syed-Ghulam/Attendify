function TextArea(props) {
  return (
    <>
      <label
        htmlFor={props.id}
        className="
          mt-[30px]
          mb-[6px]
          block
          text-[13px]
          font-semibold
          text-[var(--primary-900)]
        "
      >
        {props.label}

        {props.required && (
          <span className="text-[var(--error)]">*</span>
        )}
      </label>

      <textarea
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeHolder}
       className="
        h-[75px]
        w-full
        rounded-[4px]
        border
        border-[var(--neutral-300)]
        bg-white
        px-4
        py-3
        text-[14px]
        outline-none
        resize-none
        transition-all
        focus:border-[var(--primary-500)]
        "
      />
    </>
  );
}

export default TextArea;