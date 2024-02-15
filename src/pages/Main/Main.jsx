import { useEffect, useState } from 'react';
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import NewsList from '../../components/NewsList/NewsList';
import { getCategories, getNews } from '../../api/apiNews';
import styles from './styles.module.css';
import Skeleton from '../../components/Skeleton/Skeleton';
import Pagination from '../../components/Pagination/Pagination';
import Categories from '../../components/Categories/Categories';
import Search from '../../components/Search/Search';
import { useDebounce } from '../../helpers/hooks/useDebounce';



const Main = () => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [keywords, setKeywords] = useState('');

    const totalPages = 10;
    const pageSize = 10;

    const debouncedKeywords = useDebounce(keywords, 1500);

    const fetchNews = async (currentPage) => {
        try {
            setIsLoading(true);
            const response = await getNews({
                currentPage: currentPage, 
                pageSize: pageSize,
                category: selectedCategory === 'All' ? null : selectedCategory,
                keywords: debouncedKeywords
            });
            setNews(response.news);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(["All", ...response.categories]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])
    
    useEffect(() => {
        fetchNews(currentPage);
    }, [currentPage, selectedCategory, debouncedKeywords])

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    }   

    return ( 
        <main className={styles.main}>
            <Categories 
                categories={categories} 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory}
            />

            <Search keywords={keywords} setKeywords={setKeywords}/>

            {news.length > 0 && !isLoading ? (
                <NewsBanner item={news[0]}/>
            ) : (
                <Skeleton count={1} type={'banner'}/>
            )}

            <Pagination 
                handleNextPage={handleNextPage} 
                handlePrevPage={handlePrevPage} 
                handlePageClick={handlePageClick} 
                totalPages={totalPages}
                currentPage={currentPage}
            />

            {!isLoading ? <NewsList news={news}/> : <Skeleton count={10} type={'item'}/>}

            <Pagination 
                handleNextPage={handleNextPage} 
                handlePrevPage={handlePrevPage} 
                handlePageClick={handlePageClick} 
                totalPages={totalPages}
                currentPage={currentPage}
            />
                       
        </main>
     );
}
 
export default Main;