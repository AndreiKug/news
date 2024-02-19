import styles from './styles.module.css'

const Skeleton = ({count = 1, type='banner', direction='column'}) => {
    const items = [...Array(count)].map((_, index) => (
        <li 
            key={index} 
            className={type === 'banner' ? styles.banner : styles.item}
        >
        </li>
    ));

    return ( 
        <>
            {count > 1 ? (
                <ul className={direction==='column' ? styles.columnList : styles.rowList }>
                    {items}
                </ul>                             
            ) : (           
                <li className={type === 'banner' ? styles.banner : styles.item}></li>
            )}
        </>
     );
}
 
export default Skeleton;