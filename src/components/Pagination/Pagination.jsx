import styles from './styles.module.css'

const Pagination = ({
    totalPages, 
    handlePrevPage, 
    handleNextPage, 
    handlePageClick, 
    currentPage
}) => {
    return ( 
        <div className={styles.pagination}>
            <button onClick={handlePrevPage} disabled={currentPage <= 1} className={styles.arrow}>{'<'}</button>
            <div className={styles.list}>
                {[...Array(totalPages)].map((item, index) => {
                    return (
                        <button 
                            onClick={() => handlePageClick(index + 1)} 
                            className={styles.pageNumber} 
                            key={index}
                            disabled={index + 1 === currentPage}
                        >
                            {index + 1}
                        </button>
                    )
                })}
            </div>
            <button onClick={handleNextPage} disabled={currentPage >= totalPages} className={styles.arrow}>{'>'}</button>
        </div>
     );
}
 
export default Pagination;