import styles from './styles.module.css'

const Skeleton = ({count = 1, type='banner'}) => {
    const items = [...Array(count)].map((_, index) => (
        <li key={index} className={type === 'banner' ? styles.banner : styles.item}></li>
    ));

    return ( 
        <>
            {count > 1 ? (
                <ul className={styles.list}>
                    {items}
                </ul>                             
            ) : (           
                <li className={type === 'banner' ? styles.banner : styles.item}></li>
            )}
        </>
     );
}
 
export default Skeleton;