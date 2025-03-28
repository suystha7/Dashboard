import React from "react";
import { Dialog, DialogClose, DialogContent } from "../ui/dialog";
import { X } from "lucide-react";

const Add = ({ children, isFormOpen, setIsFormOpen }) => {
  return (
    <div>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Add;
