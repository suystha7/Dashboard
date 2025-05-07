"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Pagination({ currentPage, previous, next, onPageChange, totalpages }) {
  return (
    <div className="flex justify-center items-center space-x-2 p-4 border-t">
      <Button
        variant="outline"
        size="sm"
        disabled={!previous}
        onClick={() => onPageChange(previous)}
        className="h-8 w-8 p-0 sm:h-9 sm:w-9"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      {/* Display the current page */}
      <span className="text-sm sm:text-base font-semibold">{`${currentPage}/${totalpages}`}</span>

      <Button
        variant="outline"
        size="sm"
        disabled={!next}
        onClick={() => onPageChange(next)}
        className="h-8 w-8 p-0 sm:h-9 sm:w-9"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  )
}
