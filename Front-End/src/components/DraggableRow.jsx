import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function DraggableRow({id, row, columns, selectedRows, rowKey}){

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id});

    const style = {transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <tr
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className={`border-b border-[var(--neutral-200)]
            ${
                selectedRows.includes(row[rowKey]) ? "bg-gray-300" : "bg-white"
            }`}
          >
            {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-4 text-[14px] text-[var(--neutral-800)]"
                >
                    {column.key === "status" ? (
                        <div className="flex items-center gap-2">
                            <div className={`w-[8px] h-[8px] rounded-full 
                                ${
                                    row[column.key] === "Active" ? "bg-[var(--success)]" : "bg-[var(--error)]"
                                }`}
                            />

                            <span>{row[column.key]}</span>
                        </div>
                    ) : (row[column.key])}
                </td>
            ))}

        </tr>
    );
}

export default DraggableRow;