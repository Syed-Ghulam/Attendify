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
          text-[var(--color-label)]
        "
      >
        {props.label}

        {props.required && (
          <span className="text-[var(--color-error)]">*</span>
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
        border-[var(--color-border)]
        bg-[var(--color-white)]
        px-4
        py-3
        text-[14px]
        outline-none
        resize-none
        transition-all
        focus:border-[var(--color-focus)]
        "
      />
    </>
  );
}

export default TextArea;