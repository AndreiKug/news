import { TOTAL_PAGES } from '../../constants/constants';
import { useDebounce } from '../../helpers/hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../../store';
import { useGetNewsQuery } from '../../store/services/newsApi';
import { setFilters } from '../../store/slices/newsSlice';
import NewsFilters from '../NewsFilters/NewsFilters';
import NewsList from '../NewsList/NewsList';
import PaginationWrapper from '../PaginationWrapper/PaginationWrapper';
import styles from './styles.module.css';


const NewsByFilters = () => {
    const filters = useAppSelector(state => state.news.filters);
    const news = useAppSelector(state => state.news.news);
    const dispatch = useAppDispatch();

    const debouncedKeywords = useDebounce(filters.keywords, 1500);

    const { isLoading } = useGetNewsQuery({
        ...filters,
        keywords: debouncedKeywords
    })

    const handleNextPage = () => {
        if (filters.page_number < TOTAL_PAGES) {
            dispatch(
                setFilters({key: 'page_number', value: filters.page_number + 1})
            );
        }
    }

    const handlePrevPage = () => {
        if (filters.page_number > 1) {
            dispatch(
                setFilters({key: 'page_number', value: filters.page_number - 1})
            );
        }
    }

    const handlePageClick = (pageNumber: number) => {
        dispatch(
            setFilters({key: 'page_number', value: pageNumber})
        );
    } 

    return ( 
        <section className={styles.section}>
            <NewsFilters filters={filters}/>

            <PaginationWrapper
                top
                bottom
                handleNextPage={handleNextPage} 
                handlePrevPage={handlePrevPage} 
                handlePageClick={handlePageClick} 
                totalPages={TOTAL_PAGES}
                currentPage={filters.page_number}
            >
                <NewsList isLoading={isLoading} news={news}/>
            </PaginationWrapper>

        </section>
     );
}
 
export default NewsByFilters;