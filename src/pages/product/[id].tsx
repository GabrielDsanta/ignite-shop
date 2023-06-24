import { stripe } from "@/lib/stripe";
import { Button } from "@material-tailwind/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Stripe from "stripe";

interface ProductsProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        price: string;
        description: string;
        defaultPriceId: string;
    }
}

export default function Product({ product }: ProductsProps) {

  function handleBuyProduct(){
    
  }

  return (
    <main className="grid grid-cols-2 items-stretch gap-16 max-w-7xl my-0 mx-auto">
      <div className="w-full h-[calc(656px-0.5rem)] max-w[576] bg-gradient-to-t from-gradient100 to-gradient200 rounded-lg p-1 flex items-center justify-center">
        <Image src={product.imageUrl} alt="Foto Do Produto" width={520} height={480} className="object-cover" />
      </div>

      <div className="flex flex-col">
        <h1 className="text-2xl text-gray300">{product.name}</h1>
        <span className="mt-4 block text-2xl text-green300">{product.price}</span>

        <p className="mt-10 text-lg leading-[1.6] text-gray300">{product.description}</p>

        <Button
          onClick={handleBuyProduct}
          color="green"
          className="p-4 mt-auto bg-green500 border-0 font-bold">
          Comprar agora
        </Button>
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_O8WNPZ6A5Ey1Vd' } }
    ],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id;

  const product = await stripe.products.retrieve(productId!, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(price.unit_amount) / 100),
        description: product.description,
        defaultPriceId: price.id
      },
    },
    revalidate: 60 * 60 * 1, // 1 hours
  };
};
