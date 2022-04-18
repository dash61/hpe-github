import React from 'react';
import '../App.css';

interface IProps {
  totalItems: number;          // max number of items total, all pages - 49
  maxItemsPerPage: number;     // max number of items to be shown in list to be paginated - 5
  maxPagesToShowInPaginator: number; // max number of pages to show in paginator at a time (ie, max numbered buttons) - 4
  onSelectPage: (currentPage: number) => void;
}

// props.numItemsInPaginator - max number 
const Paginator = (props: IProps): JSX.Element | null => {
  const [currentPage, setCurrentPage] = React.useState(1);       // show a block of items for this page
  const [totalNumPages, setTotalNumPages] = React.useState(1);   // number of circled page numbers that can be shown
  const [firstPageShown, setFirstPageShown] = React.useState(1); // number in 1st circle
  const [lastPageShown, setLastPageShown] = React.useState(1);   // number in last circle
  const [disableLeft, setDisableLeft] = React.useState(false);   // disable left page controls if on 1st page
  const [disableRight, setDisableRight] = React.useState(false); // disable right page controls if on last page

  
  React.useEffect(() => {
    const totalPages = Math.ceil(props.totalItems / props.maxItemsPerPage);
    setTotalNumPages(totalPages);
    setCurrentPage(1);
    setFirstPageShown(1);
    const maxPages = Math.min(props.maxPagesToShowInPaginator,
      (Math.floor(props.totalItems / props.maxPagesToShowInPaginator)) + 1);
    setLastPageShown(maxPages);
  }, [props.totalItems, props.maxItemsPerPage, props.maxPagesToShowInPaginator]);

  React.useEffect(() => {
    setDisableLeft(true);
  }, []);

  const onPress = (val: string) => {
    switch (val) {
      case "<<":
        setFirstPageShown(1);
        setLastPageShown(props.maxPagesToShowInPaginator);
        setCurrentPage(1);
        setDisableLeft(true);
        setDisableRight(false);
        props.onSelectPage(1);
        break;

      case "<":
        setDisableRight(false);
        if (currentPage === firstPageShown && currentPage !== 1) {
          setFirstPageShown(firstPageShown - 1);
          setLastPageShown(lastPageShown - 1);
        }
        if (currentPage > 1) {
          const nextCurrentPage = currentPage - 1;
          setCurrentPage(nextCurrentPage);
          props.onSelectPage(nextCurrentPage);
          if (nextCurrentPage === 1) {
            setDisableLeft(true);
          } 
        }
        break;

      case ">":
        setDisableLeft(false);
        if (currentPage === lastPageShown && currentPage !== totalNumPages) {
          setFirstPageShown(firstPageShown + 1);
          setLastPageShown(lastPageShown + 1);
        }
        if (currentPage < totalNumPages) {
          const nextCurrentPage = currentPage + 1;
          setCurrentPage(nextCurrentPage);
          props.onSelectPage(nextCurrentPage);
          if (nextCurrentPage === totalNumPages) {
            setDisableRight(true);
          }
        }
        break;

      case ">>":
        setFirstPageShown(totalNumPages - props.maxPagesToShowInPaginator);
        setLastPageShown(totalNumPages - 1);
        setCurrentPage(totalNumPages - 1);
        setDisableRight(true);
        setDisableLeft(false);
        props.onSelectPage(totalNumPages);
        break;

      default:  // this will be a numeric page value
        const nextCurrentPage = parseInt(val);
        setCurrentPage(nextCurrentPage);

        if (nextCurrentPage === 1) {
          setDisableRight(false);
          setDisableLeft(true);  
        } else if (nextCurrentPage === totalNumPages) {
          setDisableRight(true);
          setDisableLeft(false);  
        } else {
          setDisableRight(false);
          setDisableLeft(false);  
        }
        props.onSelectPage(nextCurrentPage);
        break;
    }
  }

  // Make an array of numbers to be shown as the circled numbers in the paginator.
  const range = (start: number, end: number) => Array.from(Array(end - start + 1).keys()).map(x => x + start);

  const getButtonClass = (index: number, selectedPage: number) => {
    if (index > props.totalItems) {
      return "paginatorButtons hiddenButton";
    }
    if (index === selectedPage) {
      return "paginatorButtons selectedButton";
    }
    return "paginatorButtons";
  }

  // Don't show any pagination controls if only one page of items is available.
  if (totalNumPages > 1) {
    const selectedPage = currentPage - firstPageShown;

    return (
        <div className='page'>
          <button
            className="paginatorButtons"
            onClick={() => onPress("<<")}
            disabled={disableLeft}>&lsaquo;&lsaquo;
          </button>
          <button
            className="paginatorButtons"
            onClick={() => onPress("<")}
            disabled={disableLeft}>&lsaquo;
          </button>
          { range(firstPageShown, lastPageShown).map((item, index) => 
              <button
                className={getButtonClass(index, selectedPage)}
                onClick={() => onPress(item.toString())}
                key={index}
              >
                {item}
              </button>
          )}
          <button
            className="paginatorButtons"
            onClick={() => onPress(">")}
            disabled={disableRight}
          >
            &rsaquo;
          </button>
          <button
            className="paginatorButtons"
            onClick={() => onPress(">>")}
            disabled={disableRight}>&rsaquo;&rsaquo;
          </button>
        </div>
    );
  } else {
    return null;
  }
}

export default Paginator;
