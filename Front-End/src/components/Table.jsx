

function Table({ columns, data }) {

    return(

        <div className="relative overflow-visible rounded-[5px]
        border border-[#E4E6F1] bg-white">
          <div className="overflow-auto max-h-[500px]">
            <table className="min-w-full border-collapse">

                {/* Header */}
                <thead className="sticky top-0 bg-[#DFDFE7] z-10">

                    <tr>

                        {
                            columns.map((column, index) => (

                                <th
                                   key={index}
                                   className="px-4 py-4 text-left
                                   text-[13px] font-semibold
                                   text-[#2B2E5B]
                                   border-b border-[#E4E6F1]"
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
                               className="border-b border-[#E4E6F1]"
                            >

                                {
                                    columns.map((column, colIndex) => (

                                        <td
                                           key={colIndex}
                                           className="px-4 py-4 text-[14px]
                                           text-[#2B2E5B]"
                                        >
                                                {
                                column.key === "status" ? (

                                    <div className="flex items-center gap-2">

                                        <div
                                            className={`w-[8px] h-[8px] rounded-full
                                            ${
                                            row[column.key] === "Active"
                                            ? "bg-[#22C55E]"
                                            : "bg-[#EF4444]"
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
px-4 border-t border-[#E4E6F1]
bg-[#F5F6FA] flex items-center justify-between"
>

    {/* Left Side */}
    <div className="flex items-center gap-5">

        {/* Pagination */}
        <div className="flex items-center gap-3">

            <button className="text-[#6E7191] text-[18px] cursor-pointer">
                {"<<"}
            </button>

            <button className="text-[#6E7191] text-[18px] cursor-pointer">
                {"<"}
            </button>

            {/* Active Page */}
            <button
            className="w-6 h-6 rounded-full
            bg-[#2B2E5B]
            text-white text-[12px]
            flex items-center justify-center"
            >
                1
            </button>

            <button className="text-[#6E7191] text-[18px] cursor-pointer">
                {">"}
            </button>

            <button className="text-[#6E7191] text-[18px] cursor-pointer">
                {">>"}
            </button>

        </div>

        {/* Records Per Page */}
        <div className="flex items-center gap-2">

            <select
            className="h-[28px]
            px-2 border border-[#E4E6F1]
            rounded-[4px]
            text-[13px]
            text-[#2B2E5B]
            outline-none
            cursor-pointer"
            >
                <option>25</option>
            </select>

            <span className="text-[13px] text-[#6E7191]">
                Records per page
            </span>

        </div>

    </div>

    {/* Right Side */}
    <div className="flex items-center gap-3">

        <span className="text-[13px] text-[#6E7191]">
            1 - 6 of 6 Records
        </span>

        <button className="text-[#6E7191] text-[18px] cursor-pointer">
            ↻
        </button>

    </div>

</div>
        </div>

    )
}

export default Table