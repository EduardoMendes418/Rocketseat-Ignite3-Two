import { signIn, useSession } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe.js";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const session = useSession();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    try {
      const response = await api.post('/subscribe', {
        user: session.data
        })

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId: sessionId});
    } catch (error) {
      alert(error);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subcribe now
    </button>
  );
}
