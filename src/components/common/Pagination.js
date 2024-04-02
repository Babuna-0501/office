import css from "./pagination.module.css";

export const Pagination = ({ totalPage, currentPage, setCurrentPage }) => {
  return (
    <div className={css.paginationContainer}>
      {totalPage > 0 && (
        <>
          {/* First Page */}
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`${css.singlePagination} ${
              1 === currentPage ? css.active : ""
            }`}
          >
            {1}
          </button>

          {/* First Dots */}
          {currentPage - 1 >= 3 && totalPage > 4 && <div>...</div>}

          {currentPage === totalPage && totalPage > 3 && (
            <button
              type="button"
              onClick={() => setCurrentPage(currentPage - 2)}
              className={`${css.singlePagination}`}
            >
              {currentPage - 2}
            </button>
          )}

          {/* Prev of Current Page */}
          {(currentPage - 1 >= 3 || currentPage === 3) && (
            <button
              type="button"
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`${css.singlePagination}`}
            >
              {currentPage - 1}
            </button>
          )}

          {/* Current Page */}
          {currentPage !== 1 && currentPage !== totalPage && (
            <button
              type="button"
              className={`${css.singlePagination} ${css.active}`}
            >
              {currentPage}
            </button>
          )}

          {/* Next of Current Page */}
          {totalPage - 1 !== currentPage && totalPage !== currentPage && (
            <button
              type="button"
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`${css.singlePagination}`}
            >
              {currentPage + 1}
            </button>
          )}

          {currentPage === 1 && totalPage > 3 && (
            <button
              type="button"
              onClick={() => setCurrentPage(currentPage + 2)}
              className={`${css.singlePagination}`}
            >
              {currentPage + 2}
            </button>
          )}

          {/* Last Dots */}
          {totalPage - currentPage >= 3 && totalPage > 4 && <div>...</div>}

          {/* Last Page */}
          {1 !== totalPage && (
            <button
              type="button"
              onClick={() => setCurrentPage(totalPage)}
              className={`${css.singlePagination} ${
                totalPage === currentPage ? css.active : ""
              }`}
            >
              {totalPage}
            </button>
          )}
        </>
      )}
    </div>
  );
};
