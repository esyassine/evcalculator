import React from 'react';
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-8" aria-label="Paginación">
      <ul className="flex items-center space-x-2">
        <li>
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
            size="icon"
            className="text-emerald-600 border-emerald-600 hover:bg-emerald-100 dark:text-emerald-400 dark:border-emerald-400 dark:hover:bg-emerald-900"
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </li>
        {pageNumbers.map(number => (
          <li key={number}>
            <Button
              onClick={() => onPageChange(number)}
              variant={currentPage === number ? "default" : "outline"}
              className={`w-10 h-10 ${
                currentPage === number
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600'
                  : 'text-emerald-600 border-emerald-600 hover:bg-emerald-100 dark:text-emerald-400 dark:border-emerald-400 dark:hover:bg-emerald-900'
              }`}
              aria-label={`Ir a la página ${number}`}
              aria-current={currentPage === number ? "page" : undefined}
            >
              {number}
            </Button>
          </li>
        ))}
        <li>
          <Button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
            size="icon"
            className="text-emerald-600 border-emerald-600 hover:bg-emerald-100 dark:text-emerald-400 dark:border-emerald-400 dark:hover:bg-emerald-900"
            aria-label="Página siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
