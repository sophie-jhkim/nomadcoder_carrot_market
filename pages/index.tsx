import type { NextPage } from "next";
import Layout from "@components/layout";
import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import "@libs/server/client";
import useUser from "@libs/client/useUser";
import Head from "next/head";
import useSWR from "swr";
import { Product } from "@prisma/client";

const fetcher = (url:string) => fetch(url).then((response) => response.json());
/** 니꼬가 한거엔 fetcher가 없어도 나오던데 왜 난 있어야 나오지.... */

export interface ProductWidthCount extends Product{
    _count:{
        fav: number;
    }
}
interface ProductResponse {
    ok: boolean;
    products: ProductWidthCount[],
}
const Home: NextPage = () => {
    const { user, isLoading } = useUser();
    const { data  } = useSWR<ProductResponse>("/api/products", fetcher)
    console.log(data)
    return (
        <Layout title="홈" hasTabBar>
            <Head>
                <title>Home</title>
            </Head>
            <div className="flex flex-col space-y-5 divide-y">
                {data?.products?.map((product) => (
                    <Item
                        id={product.id}
                        key={product.id}
                        title={product.name}
                        price={product.price}
                        hearts={product._count.fav || 0}
                    ></Item>
                ))}
                <FloatingButton href="/products/upload">
                    <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                </FloatingButton>
            </div>
        </Layout>
    );
};

export default Home;
