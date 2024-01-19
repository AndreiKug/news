import { formateDate } from "../../helpers/formateDate";
import styles from './styles.module.css'

const Header = () => {
    return ( 
        <header className={styles.header}>
            <h1 className={styles.title}>NEWS</h1>
            <p className={styles.date}>{formateDate(new Date())}</p>
        </header>
     );
}
 
export default Header;