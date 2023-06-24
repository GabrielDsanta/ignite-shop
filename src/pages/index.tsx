import { Card } from "@material-tailwind/react";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import Link from "next/link";

import "keen-slider/keen-slider.min.css";
import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });
  return (
    <main
      ref={sliderRef}
      className="keen-slider flex max-w-[calc(100vw-(100vw-1280px)/2)] w-full ml-auto min-h-[656px]">
      {products.map((item) => {
        return (
          <Link href={`/product/${item.id}`} key={item.id} prefetch={false}>
            <Card
              className="keen-slider__slide group overflow-hidden bg-gradient-to-t from-gradient100 to-gradient200 cursor-pointer relative flex flex-row items-center justify-center">
              <Image
                src={item.imageUrl}
                alt="camiseta"
                width={520}
                height={480}
              />

              <footer
                className="transition ease-in-out group-hover:-translate-y-2 group-hover:scale-y-100 group-hover:opacity-100
           opacity-0 border-solid absolute bottom-1 left-1 right-1 
           rounded-md flex items-center justify-between bg-rgbaColor p-8">
                <strong className="text-lg text-gray100">{item.name}</strong>
                <span className="text-xl font-bold text-green500">
                  {item.price}
                </span>
              </footer>
            </Card>
          </Link>
        );
      })}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((item) => {
    const price = item.default_price as Stripe.Price;
    return {
      id: item.id,
      name: item.name,
      imageUrl: item.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(price.unit_amount) / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
