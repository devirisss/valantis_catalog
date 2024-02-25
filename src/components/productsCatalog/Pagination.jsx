import { useState } from "react";
import ProductsCatalog from "./ProductsCatalog";
import './pagination.css';

const Pagination = ({ data, dataLimit }) => {

    const pagesLimit = 3;
    const pages = Math.ceil(data.length / dataLimit);
    const [currentPage, setCurrentPage] = useState(1);
    const start = Math.floor((currentPage - 1) / pagesLimit) * pagesLimit;
    const [nPage, setNPage] = useState(0);

    function goToNextPage() {
        if (currentPage < pages) {
            setCurrentPage((currentPage) => currentPage + 1);
        }
    }

    function goToPreviousPage() {
        if (currentPage > 1) {
            setCurrentPage((currentPage) => currentPage - 1);
        } else {
            setCurrentPage((currentPage) => currentPage)
        }
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = (currentPage * dataLimit) - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };


    const getPaginationGroup = () => {
        return new Array(pages).fill().map((_, idx) => idx + 1).slice(nPage, nPage + 3);
    };

    return (
        <>
            <ProductsCatalog data={getPaginatedData} />
            <div className='pagination'>
                <button onClick={goToPreviousPage}>
                    Назад
                </button>
                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                    >
                        <span>{item}</span>
                    </button>
                ))}
                {pages > pagesLimit ?
                    <button onClick={() => setNPage(nPage + 3)}>
                        <span>{">"}</span>
                    </button>
                    :
                    null
                }
                <button
                    onClick={goToNextPage}>
                    Вперед
                </button>
            </div>
        </>
    )
}

export default Pagination;