import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { capitalize } from "@/utils/helper";

export default function PaginatedTable({
  type,
  data,
  searchTerm,
  handleEditClick,
  handleDeleteClick,
}) {
  const tableHeaderClass = "font-medium text-[16px] text-gray-700";
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const currentData = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={`w-[5%] ${tableHeaderClass}`}>S.N</TableHead>
            <TableHead className={`w-[10%] ${tableHeaderClass}`}>
              Image
            </TableHead>
            <TableHead className={`w-[15%] ${tableHeaderClass}`}>
              Heading
            </TableHead>
            <TableHead className={`w-[15%] ${tableHeaderClass}`}>
              Content
            </TableHead>
            <TableHead className={`w-[10%] ${tableHeaderClass}`}>
              Status
            </TableHead>
            <TableHead className={`w-[10%] ${tableHeaderClass}`}>
              Featured
            </TableHead>
            <TableHead className={`w-[15%] ${tableHeaderClass}`}>
              Created At
            </TableHead>
            <TableHead className={`w-[5%] ${tableHeaderClass}`}>
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentData?.length > 0 ? (
            currentData.map((item, index) => (
              <TableRow key={index} className="group relative">
                {Object.values(item).map((value, i) => (
                  <TableCell key={i}>{value.toString()}</TableCell>
                ))}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditClick(item)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(item)}
                        className="text-red-600"
                      >
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={Object.keys(data?.[0] || {}).length + 1}
                className="py-40 text-muted-foreground"
              >
                {searchTerm && data?.length === 0 ? (
                  `${capitalize(type)} match your search criteria.`
                ) : data?.length === 0 ? (
                  `No ${type}s found. Click "Add ${type}" to create one.`
                ): null}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-end items-center space-x-2 p-4 border-t">
        {data?.length > 0 ? (
          <>
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              <ChevronRight className="transform rotate-180" />
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <ChevronRight className="transform rotate-0" />
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
}
