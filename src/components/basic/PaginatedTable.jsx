import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { capitalize, formatDate } from "@/utils/helper";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Pencil,
  Trash,
  ChevronLeft,
  ChevronRight,
  Badge,
} from "lucide-react";

export default function PaginatedTable({
  type,
  data = [],
  searchTerm,
  handleEditClick,
  handleDeleteClick,
}) {
  const tableHeaderClass = "font-medium text-[16px] text-gray-700";
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data?.length / itemsPerPage) || 1;
  const currentData = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="overflow-x-auto">
      <div className="mb-2">{data.length} items</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={`w-[5%] ${tableHeaderClass}`}>S.N</TableHead>
            <TableHead className={`w-[10%] ${tableHeaderClass}`}>
              Image
            </TableHead>
            <TableHead className={`w-[10%] ${tableHeaderClass}`}>
              Heading
            </TableHead>
            <TableHead className={`w-[10%] ${tableHeaderClass}`}>
              Content
            </TableHead>
            <TableHead className={`w-[10%] ${tableHeaderClass}`}>
              Featured
            </TableHead>
            <TableHead className={`w-[10%] ${tableHeaderClass}`}>
              Status
            </TableHead>
            <TableHead className={`w-[10%] ${tableHeaderClass}`}>
              Created At
            </TableHead>
            <TableHead className={`w-[5%] ${tableHeaderClass}`}>
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.length > 0 ? (
            currentData.map((item, index) => (
              <TableRow key={index} className="group relative">
                <TableCell>
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>
                <TableCell>
                  <img
                    src={item?.image || item?.icon || ""}
                    alt={item?.heading || "Image"}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell>{item?.heading}</TableCell>
                <TableCell>{item?.content}</TableCell>
                <TableCell>
                  {item?.is_featured ? (
                    <span
                      variant="outline"
                      className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 px-2 py-1 rounded-md"
                    >
                      Yes
                    </span>
                  ) : (
                    <span
                      variant="outline"
                      className="bg-gray-100 text-gray-800 hover:bg-gray-100  px-2 py-1 rounded-md"
                    >
                      No
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.status ? (
                    <span
                      variant="outline"
                      className="bg-green-100 text-green-800 hover:bg-green-100 px-2 py-1 rounded-md"
                    >
                      Active
                    </span>
                  ) : (
                    <span
                      variant="outline"
                      className="bg-red-100 text-red-800 hover:bg-red-100 px-2 py-1 rounded-md"
                    >
                      Inactive
                    </span>
                  )}
                </TableCell>
                <TableCell>{formatDate(item?.created_at)}</TableCell>
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
                colSpan={8}
                className="py-40 text-muted-foreground text-center"
              >
                {searchTerm
                  ? `${capitalize(type)} does not match your search criteria.`
                  : `No ${type}s found. Click "Add ${type}" to create one.`}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {data.length > itemsPerPage && (
        <div className="flex justify-end items-center space-x-2 p-4 border-t">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
