import React from "react";
import { LeftPagination, RightPagination } from "../../icons";

const Pagination = ({ currentPage, totalPages, onChangePage }) => {
  let pages = [];

  const getPrevPage = () => Number(currentPage) - 1;
  const getNextPage = () => Number(currentPage) + 1;

  if (currentPage > 1) {
    pages.push(
      <>
        <li
          key={1}
          onClick={() => onChangePage(getPrevPage(), "6")}
          className="flex items-center justify-center px-4 h-10 leading-tight text-amber-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        >
          <LeftPagination />
        </li>
        <li
          onClick={() => onChangePage(getPrevPage(), "6")}
          key={2}
          className="flex items-center justify-center px-4 h-10 leading-tight text-amber-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        >
          {getPrevPage()}
        </li>
      </>
    );
  }

  if (totalPages === 1) {
    pages.push(
      <li
        key={3}
        className="flex items-center justify-center px-4 h-10 text-amber-500 border border-gray-300 bg-gray-200 hover:bg-amber-100 hover:text-amber-700"
      >
        1
      </li>
    );
  } else if (totalPages !== 0) {
    pages.push(
      <li
        key={4}
        className="flex items-center justify-center px-4 h-10 text-amber-500 border border-gray-300 bg-gray-200 hover:bg-amber-100 hover:text-amber-700"
      >
        {currentPage}
      </li>
    );
  }

  if (currentPage < totalPages) {
    pages.push(
      <>
        <li
          onClick={() => onChangePage(getNextPage(), "6")}
          key={5}
          className="flex items-center justify-center px-4 h-10 leading-tight text-amber-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        >
          {getNextPage()}
        </li>
        <li
          key={6}
          onClick={() => onChangePage(getNextPage(), "6")}
          className="flex items-center justify-center px-4 h-10 leading-tight text-amber-500  bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
        >
          <RightPagination />
        </li>
      </>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div aria-label="Page navigation w-fit">
        <ul className="inline-flex -space-x-px text-base h-10">{pages}</ul>
      </div>
    </div>
  );
};

export default Pagination;
