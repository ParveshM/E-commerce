import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React, { useMemo } from "react";

type PaginateProps = {
  onPageChange: (page: number) => void;
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
};

function usePagination({
  currentPage,
  itemsPerPage,
  totalPages,
}: {
  totalPages: number;
  itemsPerPage: number;
  currentPage: number;
}) {
  const paginationRange = useMemo(() => {
    return Math.ceil(totalPages / itemsPerPage);
  }, [totalPages, itemsPerPage, currentPage]);
  return paginationRange;
}

const Paginate: React.FC<PaginateProps> = ({
  onPageChange,
  totalPages,
  itemsPerPage,
  currentPage,
}) => {
  const paginationRange = usePagination({
    currentPage,
    itemsPerPage,
    totalPages,
  });
  const onPrevious = () => {
    onPageChange(Math.max(currentPage - 1, 1));
  };
  const onNext = () => onPageChange(Math.min(currentPage + 1, totalPages));
  return paginationRange > 0 ? (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="hover:cursor-pointer"
            aria-disabled={currentPage === 1}
            onClick={onPrevious}
          />
        </PaginationItem>
        {Array.from({ length: paginationRange }).map((_, i) => (
          <PaginationItem key={i + 1}>
            <PaginationLink
              className={`${
                currentPage === i + 1 && "bg-slate-100"
              } hover:cursor-pointer`}
              onClick={() => onPageChange(i + 1)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            className="hover:cursor-pointer"
            aria-disabled={currentPage === totalPages}
            onClick={onNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ) : null;
};
export default Paginate;
