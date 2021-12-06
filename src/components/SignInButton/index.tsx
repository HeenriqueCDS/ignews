import { FaGithub as Github } from 'react-icons/fa'
import {FiX as Logout} from 'react-icons/fi'
import styles from './styles.module.scss'

export function SignInButton() {
    const isUserLoggedIn = true;

    return isUserLoggedIn ? (
        <button type='button' className={styles.signInButton}>
            <Github color='var(--green-500)' />
            Henrique Carvalho
            <Logout className={styles.closeIcon} color='#737380'/>
        </button> 
        ) : (
        <button type='button' className={styles.signInButton}>
            <Github color='var(--yellow-500)' />
            Sign in with Github
        </button>
        )
}