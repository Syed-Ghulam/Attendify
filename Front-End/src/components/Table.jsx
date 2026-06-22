import Icon from "./Icon";
import { useState } from 'react';

function Table({columns, data, selectedRows = [], rowKey}) {

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);

    const totalRecords = data.length;
    const totalPages = Math.max(1, Math.ceil(totalRecords / recordsPerPage));
    const startIndex = (currentPage -1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;

    const paginatedData = data.slice(startIndex, endIndex);

    return(

        <div className="h-full min-h-0 flex flex-col rounded-[5px]
            border border-[var(--neutral-200)] bg-white">
          <div className="flex-1 overflow-auto">
            <table className="min-w-full border-collapse">

                {/* Header */}
                <thead className="sticky top-0 bg-[var(--neutral-200)] z-10">

                    <tr>

                        {
                            columns.map((column, index) => (

                                <th
                                   key={index}
                                   className="px-4 py-4 text-left
                                   text-[13px] font-semibold
                                   text-[var(--neutral-800)]
                                   border-b border-[var(--neutral-200)]"
                                >
                                    {column.label}
                                </th>

                            ))
                        }

                    </tr>

                </thead>

                {/* Body */}
              <tbody className='h-[1px]'>

                    {
                        paginatedData.length > 0 ? (
                        paginatedData.map((row, rowIndex) => (

                            <tr
                            key={rowIndex}
                            className={`border-b border-[var(--neutral-200)] 
                                ${
                                    selectedRows.includes(row[rowKey]) ? "bg-gray-300" : "bg-white"
                            }`}
                            >

                            {
                                columns.map((column, colIndex) => (

                                <td
                                    key={colIndex}
                                    className="px-4 py-4 text-[14px]
                                    text-[var(--neutral-800)]"
                                >
                                    {
                                    column.key === "status" ? (

                                        <div className="flex items-center gap-2">

                                        <div
                                            className={`w-[8px] h-[8px] rounded-full
                                            ${
                                            row[column.key] === "Active"
                                            ? "bg-[var(--success)]"
                                            : "bg-[var(--error)]"
                                            }`}
                                        />

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
                        ) : (
                        <tr>
                            <td
                            colSpan={columns.length}
                            className="
                                py-8
                                text-center
                                text-[14px]
                                text-[var(--neutral-500)]
                            "
                            >
                            No Data Found
                            </td>
                        </tr>
                        )
                    }

                    </tbody>

            </table>
            </div>
           {/* Table Footer */}

            <div
            className="h-[48px]
            px-4 border-t border-[var(--neutral-200)]
            bg-[var(--neutral-100)] flex items-center justify-between"
            >

    {/* Left Side */}
    <div className="flex items-center gap-5">

        {/* Pagination */}
        <div className="flex items-center gap-2">

            <button 
             onClick={() => setCurrentPage(1)}
             disabled={currentPage === 1}
             className="flex text-[var(--neutral-500)] text-[18px] cursor-pointer">
                
                <Icon name="ArrowLeft" alt="First Page" /> 
                <Icon name="ArrowLeft" alt="First Page" className='-ml-3' />
                
            </button>

            <button 
            onClick={() => setCurrentPage(currentPage -1)}
            disabled = {currentPage === 1}
            className="text-[var(--neutral-500)] text-[18px] cursor-pointer">

                <Icon name="ArrowLeft" alt="Previous" />

            </button>

            {/* Active Page */}
            <button
            className="w-6 h-6 rounded-full
            bg-[var(--neutral-800)]
            text-white text-[12px]
            flex items-center justify-center"
            >
                {currentPage}
            </button>

            <button 
            onClick={() => setCurrentPage(currentPage+1)}
            disabled = {currentPage === totalPages}
            className="text-[var(--neutral-500)] text-[18px] cursor-pointer">

                <Icon name="ArrowRight" alt="Next" />

            </button>

            <button 
            onClick={() => setCurrentPage(totalPages)}
            disabled = {currentPage === totalPages}
            className="flex text-[var(--neutral-500)] text-[18px] cursor-pointer">

                <Icon name="ArrowRight" alt="Last Page" />
                <Icon name="ArrowRight" alt="Last Page" className='-ml-3'/>

            </button>

        </div>

        {/* Records Per Page */}
        <div className="flex items-center gap-2">

            <select
            value={recordsPerPage}
            onChange={(e) => {
                setRecordsPerPage(Number(e.target.value));
                setCurrentPage(1);
            }}
            className="h-[28px]
            px-2 border border-[var(--neutral-200)]
            rounded-[4px]
            text-[13px]
            text-[var(--neutral-800)]
            outline-none
            cursor-pointer"
            >
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </select>

            <span className="text-[13px] text-[var(--neutral-500)]">
                Records per page
            </span>

        </div>

    </div>

    {/* Right Side */}
    <div className="flex items-center gap-3">

        <span className="text-[13px] text-[var(--neutral-500)]">
           {totalRecords === 0
              ? "0 Records" : `${(currentPage -1) * recordsPerPage + 1}
                 - ${Math.min(
                          (currentPage -1) * recordsPerPage + paginatedData.length,
                          totalRecords)}
                          of ${totalRecords} Records`}
        </span>

        <button className="text-[var(--neutral-500)] text-[18px] cursor-pointer">

            <Icon name="Refresh" alt="refresh" />

        </button>

    </div>

</div>
</div>

)
}

export default Table;