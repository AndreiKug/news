import { forwardRef } from 'react';
import styles from './styles.module.css'

const Categories = forwardRef(({categories, selectedCategory, setSelectedCategory}, ref) => {
    return ( 
        <div ref={ref} className={styles.categories}>

            <button 
                onClick={() => setSelectedCategory(null)} 
                className={!selectedCategory ? styles.active : styles.item}
            >
                All
            </button>


            {categories.map(category => {
                return (
                    <button 
                        onClick={() => setSelectedCategory(category)} 
                        key={category} 
                        className={selectedCategory === category ? styles.active : styles.item}
                    >
                        {category}
                    </button>
                )
            })}
        </div>
     );
})

 
export default Categories;