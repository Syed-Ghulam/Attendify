import Refresh from '../assets/icons/refresh.svg';
import ArrowLeft from '../assets/icons/Arrow Left.svg';
import ArrowRight from '../assets/icons/Arrow Right.svg';
import { useState } from 'react';

function Table({columns, data}) {

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);

    const totalRecords = data.length;
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    const startIndex = (currentPage -1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;

    const paginatedData = data.slice(startIndex, endIndex);

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
                        paginatedData.map((row, rowIndex) => (

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

            <button 
             onClick={() => setCurrentPage(1)}
             disabled={currentPage === 1}
            className="text-[var(--color-text-muted)] text-[18px] cursor-pointer">
                {"<<"}
            </button>

            <button 
            onClick={() => setCurrentPage(currentPage -1)}
            disabled = {currentPage === 1}
            className="text-[var(--color-text-muted)] text-[18px] cursor-pointer">
                <img src={ArrowLeft} alt="left arrow" />
            </button>

            {/* Active Page */}
            <button
            className="w-6 h-6 rounded-full
            bg-[var(--color-table-text)]
            text-[var(--color-white)] text-[12px]
            flex items-center justify-center"
            >
                {currentPage}
            </button>

            <button 
            onClick={() => setCurrentPage(currentPage+1)}
            disabled = {currentPage === totalPages}
            className="text-[var(--color-text-muted)] text-[18px] cursor-pointer">
                <img src={ArrowRight} alt="Right arrow" />
            </button>

            <button 
            onClick={() => setCurrentPage(totalPages)}
            disabled = {currentPage === totalPages}
            className="text-[var(--color-text-muted)] text-[18px] cursor-pointer">
                {">>"}
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
            px-2 border border-[var(--color-border-light)]
            rounded-[4px]
            text-[13px]
            text-[var(--color-table-text)]
            outline-none
            cursor-pointer"
            >
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
            </select>

            <span className="text-[13px] text-[var(--color-text-muted)]">
                Records per page
            </span>

        </div>

    </div>

    {/* Right Side */}
    <div className="flex items-center gap-3">

        <span className="text-[13px] text-[var(--color-text-muted)]">
           {totalRecords === 0
              ? "0 Records" : `${(currentPage -1) * recordsPerPage + 1}
                 - ${Math.min(
                          (currentPage -1) * recordsPerPage + paginatedData.length,
                          totalRecords)}
                          of ${totalRecords} Records`}
        </span>

        <button className="text-[var(--color-text-muted)] text-[18px] cursor-pointer">
            <img src={Refresh} alt="refresh" />
        </button>

    </div>

</div>
</div>

)
}

export default Table;