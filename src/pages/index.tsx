import Head from "next/head";
import { SubscribeButton } from "../componentes/SubscribeButton";
import { GetStaticProps} from "next";
import styles from "../pages/home.module.scss";
import { stripe } from "../services/stripe";

interface NomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: NomeProps) {
  return (
    <>
      <Head>
        <title>Home ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.here}>
          <span> 👏 Hey welcome</span>
          <h1>
            News abount the <span>React</span> world
          </h1>
          <p>
            Get access to all the publitions <br />
            <span>for {product.amount} monthey</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1LlflqE85WuzWoH10rHMNrPe");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //24horas
  };
};
