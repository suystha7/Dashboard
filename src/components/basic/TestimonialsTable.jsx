import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/helper";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TestimonialsTable({
  data,
  handleDeleteClick,
  onDataUpdate,
  type,
}) {
  const [selectedHero, setSelectedHero] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = (item) => {
    const path =
      type === "testimonials"
        ? `/testimonials/edtiTestimonial/${item.id}`
        : null;

    if (path) {
      navigate(path);
    } else {
      console.warn("Unknown type:", type);
      // Optionally navigate to a fallback route
    }
  };


  const handleCloseModal = () => {
    setSelectedHero(null);
    setIsFormOpen(false);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[5%]">S.N</TableHead>
            <TableHead className="w-[10%]">Image</TableHead>
            {/* <TableHead className="w-[10%]">Quote</TableHead> */}
            <TableHead className="w-[15%]">Designation</TableHead>
            <TableHead className="w-[10%]">Featured</TableHead>
            <TableHead className="w-[10%]">Status</TableHead>
            <TableHead className="w-[10%]">Created At</TableHead>
            <TableHead className="w-[5%]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={item.image}
                    alt={item.quote || "Image"}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </TableCell>

                {/* <TableCell>{item.quote}</TableCell> */}
                <TableCell>{item.designation}</TableCell>
                <TableCell>
                  {item?.is_featured ? (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md">
                      Yes
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-800 pxstatus2 py-1 rounded-md">
                      No
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.status ? (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md">
                      Inactive
                    </span>
                  )}
                </TableCell>
                <TableCell>{formatDate(item.created_at)}</TableCell>
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
              <TableCell colSpan={8} className="py-40 text-center">
                No records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
