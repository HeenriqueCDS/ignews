import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';

import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

import styles from './styles.module.scss'



export function SubscribeButton() {
    const session = useSession();
    const router = useRouter()
    async function handleSubscribe() {
        if (!session.data) {
            signIn('github')
            return;
        }

        if (session.data.activeSubscription){
            router.push('/posts')
        } else{

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