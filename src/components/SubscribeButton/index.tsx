import styles from './styles.module.scss'

type SubscribeButtonProps = {
    price: string;
}

export function SubscribeButton({price} : SubscribeButtonProps) {
    return (
        <button
            type='button'
            className={styles.subscribeButton}
        >
            Subscribe now
        </button>
    )
}