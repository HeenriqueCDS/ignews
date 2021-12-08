import {signIn, useSession, signOut} from 'next-auth/react'

import { FaGithub as Github } from 'react-icons/fa'
import {FiX as Logout} from 'react-icons/fi'
import styles from './styles.module.scss'


export function SignInButton() {
    const session = useSession()

    return session.status === 'authenticated' ? (
        <button 
        type='button' 
        className={styles.signInButton}
        onClick={() => signOut()}
        >
            <Github color='var(--green-500)' />
            {session.data.user.name}
            <Logout className={styles.closeIcon} color='#737380'/>
        </button> 
        ) : (
        <button 
        type='button' 
        className={styles.signInButton}
        onClick={() => signIn('github')}
        >
            <Github color='var(--yellow-500)' />
            Sign in with Github
        </button>
        )
}