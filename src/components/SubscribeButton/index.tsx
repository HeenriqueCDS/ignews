import { signIn, useSession } from 'next-auth/react'

import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

import styles from './styles.module.scss'

type SubscribeButtonProps = {
    price: string;
}

export function SubscribeButton({ price }: SubscribeButtonProps) {
    const session = useSession();
    async function handleSubscribe() {
        if (!session.data) {
            signIn('github')
            return;
        }

        try {
            const stripe = await getStripeJs()

            const response = await api.post('/subscribe')
            const { sessionId } = response.data
            await stripe.redirectToCheckout({
                sessionId,
            })

        } catch(err) {
            alert(err.message)
            return;
        }

    }
    return (
        <button
            type='button'
            onClick={handleSubscribe}
            className={styles.subscribeButton}
        >
            Subscribe now
        </button>
    )
}