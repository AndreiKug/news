import { useContext } from "react";
import { themeIcons } from "../../assets";
import { formateDate } from "../../helpers/formateDate";
import styles from './styles.module.css';
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
    const {isDark, toggleTheme} = useTheme();
    return ( 
        <header className={`${styles.header} ${isDark ? styles.dark : styles.light}`}>
            <div className={styles.info}>
                <h1 className={styles.title}>NEWS</h1>
                <p className={styles.date}>{formateDate(new Date())}</p>
            </div>
            
            <img src={isDark ? themeIcons.light : themeIcons.dark} alt="theme" style={{width: 30}} onClick={toggleTheme}/>
        </header>
     );
}
 
export default Header;