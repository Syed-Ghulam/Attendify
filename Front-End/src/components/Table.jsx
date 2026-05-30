

function Table({ columns, data }) {

    return(

        <div className="relative overflow-visible rounded-[5px]
        border border-[var(--color-border-light)] bg-[var(--color-white)]">
          <div className="overflow-auto max-h-[500px]">
            <table className="min-w-full border-collapse">

                {/* Header */}
                <thead className="sticky top-0 bg-[var(--color-table-header-bg)] z-10">

                    <tr>

                        {
                            columns.map((column, index) => (

                                <th
                                   key={index}
                                   className="px-4 py-4 text-left
                                   text-[13px] font-semibold
                                   text-[var(--color-table-text)]
                                   border-b border-[var(--color-border-light)]"
                                >
                                    {column.label}
                                </th>

                            ))
                        }

                    </tr>

                </thead>

                {/* Body */}
                <tbody>

                    {
                        data.map((row, rowIndex) => (

                            <tr
                               key={rowIndex}
                               className="border-b border-[var(--color-border-light)]"
                            >

                                {
                                    columns.map((column, colIndex) => (

                                        <td
                                           key={colIndex}
                                           className="px-4 py-4 text-[14px]
                                           text-[var(--color-table-text)]"
                                        >
                                                {
                                column.key === "status" ? (

                                    <div className="flex items-center gap-2">

                                        <div
                                            className={`w-[8px] h-[8px] rounded-full
                                            ${
                                            row[column.key] === "Active"
                                            ? "bg-[var(--color-success)]"
                                            : "bg-[var(--color-error)]"
                                            }`}
                                        >

                                        </div>

                                        <span>
                                            {row[column.key]}
                                        </span>

                                    </div>

                                ) : (

                                    row[column.key]

                                )
                                }                                       
                                        </td>

                                    ))
                                }

                            </tr>

                        ))
                    }

                </tbody>

            </table>
            </div>
           {/* Table Footer */}

<div
className="h-[48px]
px-4 border-t border-[var(--color-border-light)]
bg-[var(--color-table-footer-bg)] flex items-center justify-between"
>

    {/* Left Side */}
    <div className="flex items-center gap-5">

        {/* Pagination */}
        <div className="flex items-center gap-3">

            <button className="text-[var(--color-text-muted)] text-[18px] cursor-pointer">
                {"<<"}
            </button>

            <button className="text-[var(--color-text-muted)] text-[18px] cursor-pointer">
                {"<"}
            </button>

            {/* Active Page */}
            <button
            className="w-6 h-6 rounded-full
            bg-[var(--color-table-text)]
            text-[var(--color-white)] text-[12px]
            flex items-center justify-center"
            >
                1
            </button>

            <button className="text-[var(--color-text-muted)] text-[18px] cursor-pointer">
                {">"}
            </button>

            <button className="text-[var(--color-text-muted)] text-[18px] cursor-pointer">
                {">>"}
            </button>

        </div>

        {/* Records Per Page */}
        <div className="flex items-center gap-2">

            <select
            className="h-[28px]
            px-2 border border-[var(--color-border-light)]
            rounded-[4px]
            text-[13px]
            text-[var(--color-table-text)]
            outline-none
            cursor-pointer"
            >
                <option>25</option>
            </select>

            <span className="text-[13px] text-[var(--color-text-muted)]">
                Records per page
            </span>

        </div>

    </div>

    {/* Right Side */}
    <div className="flex items-center gap-3">

        <span className="text-[13px] text-[var(--color-text-muted)]">
            1 - 6 of 6 Records
        </span>

        <button className="text-[var(--color-text-muted)] text-[18px] cursor-pointer">
            ↻
        </button>

    </div>

</div>
        </div>

    )
}

export default Table