import { stripe } from "@/lib/stripe";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SucessProps {
    customerName: string;
    product: {
        name: string;
        imageUrl: string;
    }
}

export default function Sucess({ customerName, product }: SucessProps){
    return(
        <main className="flex flex-col items-center mx-auto my-auto h-[656px] justify-center">
            <h1 className="text-2xl text-gray100">Compra efetuada!</h1>

            <div className="mt-16 w-full max-w-[130px] h-[145px] bg-gradient-to-t from-gradient100 to-gradient200 rounded-lg p-1 flex items-center justify-center">
                <Image width={120} height={110} alt="" src={product.imageUrl} />
            </div>

            <p className="mt-8 text-xl text-gray300 max-w-[560px] text-center">Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa. </p>

            <Link className="mt-20 block text-lg text-green500 hover:text-green300 no-underline font-bold" href="/">
                Voltar ao catálogo
            </Link>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const sessionId = String(query.session_id)

    const response = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    const customerName = response.customer_details?.name
    const product = response.line_items?.data[0].price?.product as Stripe.Product


    return {
        props: {
            customerName,
            product: {
                name: product.name,
                imageUrl: product.images[0]
            }
        }
    }
}