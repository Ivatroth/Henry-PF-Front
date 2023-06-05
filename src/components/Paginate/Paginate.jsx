import "./Paginate.css";

export default function Paginate(props) {
  let totalPages = [];
  let pagesView = [];

  for (
    let i = 1;
    i <= Math.ceil(props.totalProducts / props.productsPerPage);
    i++
  ) {
    totalPages.push(i);
  }

  if (props.currentPage - 1 > 0) {
    pagesView.push(props.currentPage - 1);
  }
  pagesView.push(props.currentPage);

  if (props.currentPage + 1 <= totalPages.length) {
    pagesView.push(props.currentPage + 1);
  }

  return (
    <div className="paginate-container">
      <ul className="pages-list">
        <button
          className="buttons-pages"
          onClick={() =>
            props.currentPage - 5 <= 0
              ? props.changePage(totalPages[0])
              : props.changePage(props.currentPage - 5)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            style={{ fill: "rgba(0, 0, 0, 1)" }}
          >
            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            style={{ fill: "rgba(0, 0, 0, 1)" }}
          >
            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
          </svg>
        </button>
        <button
          className="buttons-pages"
          onClick={() =>
            props.currentPage - 1 <= 0
              ? null
              : props.changePage(props.currentPage - 1)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{ fill: "rgba(0, 0, 0, 1)" }}
          >
            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
          </svg>
        </button>
        {pagesView.map((e) => (
          <li
            key={e}
            className={e === props.currentPage ? "page-active" : "pages"}
            value={e}
          >
            {e}
          </li>
        ))}
        <button
          className="buttons-pages"
          onClick={() =>
            props.currentPage < totalPages.length
              ? props.changePage(props.currentPage + 1)
              : null
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{ fill: "rgba(0, 0, 0, 1)" }}
          >
            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
          </svg>
        </button>
        <button
          className="buttons-pages"
          onClick={() =>
            props.currentPage + 5 > totalPages.length
              ? props.changePage(totalPages.length)
              : props.changePage(props.currentPage + 5)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            style={{ fill: "rgba(0, 0, 0, 1)" }}
          >
            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            style={{ fill: "rgba(0, 0, 0, 1)" }}
          >
            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
          </svg>
        </button>
      </ul>
      <p>
        {props.currentPage} / {totalPages.length}
      </p>
    </div>
  );
}
