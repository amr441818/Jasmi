import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DataTableColumnHeader } from '../components/customTable/SoartableColumn';

type UseGetColumnsProps<T> = {
    record: T;
    sortableColumns?: (keyof T)[];
};

function useGetColumns<T extends { id: string }>({ record, sortableColumns = [] }: UseGetColumnsProps<T>): ColumnDef<T>[] {
    const entries = Object.keys(record) as (keyof T)[];
    const cols: ColumnDef<T>[] = entries.map((entry) => {
       if(entry!==null){
        return {
            id: entry as string,
            accessorKey: entry!==null? entry: "",
            header: ({ column }) =>
                sortableColumns?.includes(entry) ? (
                    <DataTableColumnHeader column={column} title={String(entry)?.charAt(0)?.toUpperCase() + String(entry)?.slice(1)} />
                ) : (
                    <div>{String(entry)?.charAt(0)?.toUpperCase() + String(entry)?.slice(1)}</div>
                ),
        };
       }
    });

    const actionColumn: ColumnDef<T> = {
        id: 'actions',
        header: () => <div className="">Actions</div>,
        cell: ({ row }) => {
            const item = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=" bg-white !z-[999]" align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.id)}>Copy ID</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    };

    return [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
            enableSorting: false,
            enableHiding: false,
        },
        ...cols,
        actionColumn,
    ];
}

export default useGetColumns;
