import { useState } from "react";
import ProductsCatalog from "./ProductsCatalog";
import './pagination.css';

const Pagination = ({ data, dataLimit }) => {

    const [pages] = useState(Math.ceil(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);

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

    return (
        <>
            <ProductsCatalog data={getPaginatedData} />
            <div className='pagination'>
                <button onClick={goToPreviousPage}>
                    Назад
                </button>
                {new Array(pages).fill().map((_, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                    >
                        <span>{index + 1}</span>
                    </button>
                ))}
                <button
                    onClick={goToNextPage}>
                    Вперед
                </button>
            </div>
        </>
    )
}

export default Pagination;