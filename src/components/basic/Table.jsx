// import { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { MoreVertical, Pencil, Trash } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { formatDate } from "@/utils/helper";
// import { useNavigate } from "react-router-dom";

// export default function TableComponent({
//   data,
//   handleDeleteClick,
//   onDataUpdate,
//   type,
// }) {
//   const [selectedHero, setSelectedHero] = useState(null);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleEditClick = (item) => {
//     const path =
//       type === "facility"
//         ? `/facilities/editFacility/${item.id}`
//         : type === "hero"
//         ? `/hero/editHero/${item.id}`
//         : type === "activity"
//         ? `/activities/editActivity/${item.id}`
//         : null;
  
//     if (path) {
//       navigate(path);
//     } else {
//       console.warn("Unknown type:", type);
//       // Optionally navigate to a fallback route
//     }
//   };

//   const handleCloseModal = () => {
//     setSelectedHero(null);
//     setIsFormOpen(false);
//   };

//   return (
//     <>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[5%]">S.N</TableHead>
//             {/* <TableHead className="w-[10%]">
//               {type === "facility" ? "Icon" : "Image"}
//             </TableHead> */}

//           {type === "facility" ? (
//             <>
//               <TableHead className="w-[10%]">Icon</TableHead>
//               <TableHead className="w-[10%]">Image</TableHead>
//             </>
//           ) : (
//             <TableHead className="w-[10%]">Image</TableHead>
//           )}

//             <TableHead className="w-[10%]">Heading</TableHead>
//             <TableHead className="w-[10%]">Featured</TableHead>
//             <TableHead className="w-[10%]">Status</TableHead>
//             <TableHead className="w-[10%]">Created At</TableHead>
//             <TableHead className="w-[5%]">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.length > 0 ? (
//             data.map((item, index) => (
//               <TableRow key={index}>
//                 <TableCell>{index + 1}</TableCell>
//                 {/* <TableCell>
//                   {type === "facility" ? (
//                     <img
//                       src={item?.icon}
//                       alt={item?.heading || "Icon"}
//                       className="w-16 h-16 object-contain rounded-md"
//                     />
//                   ) : (
//                     <img
//                       src={item.image}
//                       alt={item.heading || "Image"}
//                       className="w-16 h-16 object-cover rounded-md"
//                     />
//                   )}
//                 </TableCell> */}
//               {type === "facility" ? (
//               <>
//                 <TableCell>
//                   <img
//                     src={item?.icon}
//                     alt={item?.heading || "Icon"}
//                     className="w-16 h-16 object-contain rounded-md"
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <img
//                     src={item?.image}
//                     alt={item?.heading || "Image"}
//                     className="w-16 h-16 object-cover rounded-md"
//                   />
//                 </TableCell>
//               </>
//             ) : (
//               <TableCell>
//                 <img
//                   src={item?.image}
//                   alt={item?.heading || "Image"}
//                   className="w-16 h-16 object-cover rounded-md"
//                 />
//               </TableCell>
//             )}


//                 <TableCell>{item.heading}</TableCell>
//                 {/* <TableCell>{item.content}</TableCell> */}
//                 <TableCell>
//                   {item?.is_featured ? (
//                     <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md">
//                       Yes
//                     </span>
//                   ) : (
//                     <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md">
//                       No
//                     </span>
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   {item?.status ? (
//                     <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md">
//                       Active
//                     </span>
//                   ) : (
//                     <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md">
//                       Inactive
//                     </span>
//                   )}
//                 </TableCell>
//                 <TableCell>{formatDate(item.created_at)}</TableCell>
//                 <TableCell>
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" className="h-8 w-8 p-0">
//                         <MoreVertical className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem onClick={() => handleEditClick(item)}>
//                         <Pencil className="mr-2 h-4 w-4" /> Edit
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         onClick={() => handleDeleteClick(item)}
//                         className="text-red-600"
//                       >
//                         <Trash className="mr-2 h-4 w-4" /> Delete
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={8} className="py-40 text-center">
//                 No records found.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>

//       {/* <DialogForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen}>
//         {isFormOpen && (
//           <HeroForm
//             hero={selectedHero}
//             onSubmit={(updatedHero) => {
//               onDataUpdate(updatedHero);
//               handleCloseModal();
//             }}
//             onCancel={handleCloseModal}
//           />
//         )}
//       </DialogForm> */}
//     </>
//   );
// }




import { useState } from "react";
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
import { MoreVertical, Pencil, Trash, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/helper";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function TableComponent({
  data,
  handleDeleteClick,
  onDataUpdate,
  type,
}) {
  const [viewItem, setViewItem] = useState(null);
  const navigate = useNavigate();

  const handleEditClick = (item) => {
    const path =
      type === "facility"
        ? `/facilities/editFacility/${item.id}`
        : type === "hero"
        ? `/hero/editHero/${item.id}`
        : type === "activity"
        ? `/activities/editActivity/${item.id}`
        : null;

    if (path) {
      navigate(path);
    } else {
      console.warn("Unknown type:", type);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[5%]">S.N</TableHead>
            {type === "facility" ? (
              <>
                <TableHead className="w-[10%]">Icon</TableHead>
                <TableHead className="w-[10%]">Image</TableHead>
              </>
            ) : (
              <TableHead className="w-[10%]">Image</TableHead>
            )}
            <TableHead className="w-[10%]">Heading</TableHead>
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

                {type === "facility" ? (
                  <>
                    <TableCell>
                      <img
                        src={item?.icon}
                        alt={item?.heading || "Icon"}
                        className="w-16 h-16 object-contain rounded-md"
                      />
                    </TableCell>
                    <TableCell>
                      <img
                        src={item?.image}
                        alt={item?.heading || "Image"}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </TableCell>
                  </>
                ) : (
                  <TableCell>
                    <img
                      src={item?.image}
                      alt={item?.heading || "Image"}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </TableCell>
                )}

                <TableCell>{item.heading}</TableCell>

                <TableCell>
                  {item?.is_featured ? (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md">
                      Yes
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md">
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
                      <DropdownMenuItem onClick={() => setViewItem(item)}>
                        <Eye className="mr-2 h-4 w-4" /> View
                      </DropdownMenuItem>
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

      {/* View Content Dialog */}
      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Content</DialogTitle>
          </DialogHeader>
          <div
            className="mt-2 text-sm text-gray-700 space-y-2"
            dangerouslySetInnerHTML={{
              __html: viewItem?.content || "<p>No content available.</p>",
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

