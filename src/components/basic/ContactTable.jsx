// import React from "react";
// import { Button } from "../ui/button";
// import {
//   ChevronLeft,
//   ChevronRight,
//   CheckCircle,
//   XCircle,
//   Eye,
//   EyeOff,
//   Star,
//   StarOff,
// } from "lucide-react";
// import { formatDate } from "@/utils/helper";

// const ContactTable = ({ data, currentPage, totalcount, onPageChange }) => {
//   const rowsPerPage = 10;
//   const totalPages = Math.ceil(totalcount / rowsPerPage);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       onPageChange(page);
//     }
//   };

//   const StatusBadge = ({
//     condition,
//     trueIcon: TrueIcon,
//     falseIcon: FalseIcon,
//     trueText,
//     falseText,
//     trueColor,
//     falseColor,
//   }) => (
//     <div
//       className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
//         condition ? trueColor : falseColor
//       }`}
//     >
//       {condition ? (
//         <TrueIcon className="w-4 h-4" />
//       ) : (
//         <FalseIcon className="w-4 h-4" />
//       )}
//       {condition ? trueText : falseText}
//     </div>
//   );

//   return (
//     <div>
//       <table className="w-full text-sm text-left">
//         <thead>
//           <tr className="bg-gray-100 text-gray-700">
//             <th className="px-4 py-3 w-[5%] font-semibold">S.N</th>
//             <th className="px-4 py-3 w-[10%] font-semibold">Name</th>
//             <th className="px-4 py-3 w-[10%] font-semibold">Email</th>
//             <th className="px-4 py-3 w-[10%] font-semibold">Phone</th>
//             <th className="px-4 py-3 w-[10%] font-semibold">Message</th>
//             <th className="px-4 py-3 w-[20%] font-semibold">Status</th>
//             <th className="px-4 py-3 w-[10%] font-semibold">Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.length > 0 ? (
//             data.map((item, index) => (
//               <tr key={item.id} className="border-b hover:bg-gray-50">
//                 <td className="px-4 py-3">
//                   {(currentPage - 1) * rowsPerPage + index + 1}
//                 </td>
//                 <td className="px-4 py-3">{item.name}</td>
//                 <td className="px-4 py-3">{item.email}</td>
//                 <td className="px-4 py-3">{item.phone}</td>
//                 <td className="px-4 py-3">{item.message}</td>
//                 <td className="px-4 py-2 space-y-1">
//                   <StatusBadge
//                     condition={item.is_active}
//                     trueIcon={CheckCircle}
//                     falseIcon={XCircle}
//                     trueText="Active"
//                     falseText="Inactive"
//                     trueColor="bg-green-100 text-green-700"
//                     falseColor="bg-red-100 text-red-700"
//                   />
//                   <StatusBadge
//                     condition={item.is_read}
//                     trueIcon={Eye}
//                     falseIcon={EyeOff}
//                     trueText="Read"
//                     falseText="Unread"
//                     trueColor="bg-blue-100 text-blue-700"
//                     falseColor="bg-gray-100 text-gray-600"
//                   />
//                   <StatusBadge
//                     condition={item.is_important}
//                     trueIcon={Star}
//                     falseIcon={StarOff}
//                     trueText="Important"
//                     falseText="Not Important"
//                     trueColor="bg-yellow-100 text-yellow-700"
//                     falseColor="bg-gray-100 text-gray-600"
//                   />
//                 </td>
//                 <td className="px-4 py-2">{formatDate(item.created_at)}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7" className="text-center py-4">
//                 No contacts found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <div className="flex justify-center items-center space-x-2 p-4 border-t">
//         <Button
//           variant="outline"
//           disabled={currentPage === 1}
//           onClick={() => handlePageChange(currentPage - 1)}
//         >
//           <ChevronLeft className="h-4 w-4" />
//         </Button>

//         <span className="text-lg font-semibold">
//         {currentPage}/{totalPages}
//         </span>

//         <Button
//           variant="outline"
//           disabled={currentPage === totalPages}
//           onClick={() => handlePageChange(currentPage + 1)}
//         >
//           <ChevronRight className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ContactTable;


import React from "react";
import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Star,
  StarOff,
} from "lucide-react";
import { formatDate } from "@/utils/helper";

const ContactTable = ({ data, currentPage, totalcount, onPageChange }) => {
  const rowsPerPage = 10;
  const totalPages = Math.ceil(totalcount / rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const StatusBadge = ({
    condition,
    trueIcon: TrueIcon,
    falseIcon: FalseIcon,
    trueText,
    falseText,
    trueColor,
    falseColor,
  }) => (
    <div
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
        condition ? trueColor : falseColor
      }`}
    >
      {condition ? (
        <TrueIcon className="w-4 h-4" />
      ) : (
        <FalseIcon className="w-4 h-4" />
      )}
      {condition ? trueText : falseText}
    </div>
  );

  return (
    <div>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-3 w-[5%] font-semibold">S.N</th>
            <th className="px-4 py-3 w-[10%] font-semibold">Name</th>
            <th className="px-4 py-3 w-[10%] font-semibold">Email</th>
            <th className="px-4 py-3 w-[10%] font-semibold">Phone</th>
            <th className="px-4 py-3 w-[10%] font-semibold">Message</th>
            <th className="px-4 py-3 w-[20%] font-semibold">Status</th>
            <th className="px-4 py-3 w-[10%] font-semibold">Created At</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  {index + 1}
                </td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.email}</td>
                <td className="px-4 py-3">{item.phone}</td>
                <td className="px-4 py-3">{item.message}</td>
                <td className="px-4 py-2 space-y-1">
                  <StatusBadge
                    condition={item.is_active}
                    trueIcon={CheckCircle}
                    falseIcon={XCircle}
                    trueText="Active"
                    falseText="Inactive"
                    trueColor="bg-green-100 text-green-700"
                    falseColor="bg-red-100 text-red-700"
                  />
                  <StatusBadge
                    condition={item.is_read}
                    trueIcon={Eye}
                    falseIcon={EyeOff}
                    trueText="Read"
                    falseText="Unread"
                    trueColor="bg-blue-100 text-blue-700"
                    falseColor="bg-gray-100 text-gray-600"
                  />
                  <StatusBadge
                    condition={item.is_important}
                    trueIcon={Star}
                    falseIcon={StarOff}
                    trueText="Important"
                    falseText="Not Important"
                    trueColor="bg-yellow-100 text-yellow-700"
                    falseColor="bg-gray-100 text-gray-600"
                  />
                </td>
                <td className="px-4 py-2">{formatDate(item.created_at)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No contacts found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* <div className="flex justify-center items-center space-x-2 p-4 border-t">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <span className="text-lg font-semibold">
        {currentPage}/{totalPages}
        </span>

        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div> */}
    </div>
  );
};

export default ContactTable;
