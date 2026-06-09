function ConfirmationModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel
}) {

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0
        bg-black/40
        flex items-center justify-center
        z-50
      "
    >
      <div
        className="
          w-[400px]
          bg-white
          rounded-[8px]
          shadow-xl
          p-6
        "
      >
        <h3
          className="
            text-[18px]
            font-semibold
            text-[var(--primary-900)]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-3
            text-[14px]
            text-[var(--neutral-600)]
          "
        >
          {message}
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onCancel}
            className="
              px-4 py-2
              border
              border-[var(--neutral-300)]
              rounded-[6px]
              cursor-pointer
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              px-4 py-2
              bg-[var(--primary-900)]
              text-white
              rounded-[6px]
              cursor-pointer
            "
          >
            OK
          </button>

        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;