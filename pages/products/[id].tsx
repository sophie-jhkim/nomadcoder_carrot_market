import type { NextPage } from "next";
import Layout from "../../components/layout";
import Button from "../../components/button";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import { Product, User } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import { joinClass } from "@libs/client/utils";

const fetcher = (url:string) => fetch(url).then((response) => response.json());
// 아니 왜 나는 fetcher가 있어야만 나오는가...

interface ProductWithUser extends Product{
  user: User
}
interface ItemDetailResponse{
  ok: boolean;
  product:ProductWithUser;
  relatedProducts: Product[];
  isLiked: Boolean
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const {data, error} = useSWR<ItemDetailResponse>(router.query.id ? `/api/products/${router.query.id}` : null, fetcher);
  const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);
  const onFavClick = ()=>{
    toggleFav({})
  }
  return (
    <Layout canGoBack>
      <div className="p-4">
        <div className="mb-8">
          <div className="h-96 bg-slate-300" />
          <div className="flex py-3 cursor-pointer border-t border-b items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium text-gray-700 ">{data?.product?.user?.name}</p>
              <Link href={`/users/profiles/${data?.product?.user?.id}`}><a href="" className="text-xs font-medium text-gray-500">View profile &rarr;</a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">{data?.product?.name}</h1>
            <span className="text-3xl mt-3 text-gray-900 block">${data?.product?.price}</span>
            <p className="text-base my-6 text-gray-700">
            {data?.product?.description}
            </p>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="Talk to seller" />
              <button onClick={onFavClick} className={joinClass('p-3 flex rounded-md items-center justify-centerrounded-md hover:bg-gray-100 ', data?.isLiked ? "text-red-500 hover:text-red-600 " : " text-gray-400 hover:text-gray-500 ")}>
                {data?.isLiked? 
                  < svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  < path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                  </svg> :  <svg
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>}
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {data?.relatedProducts?.map((product) => (
              <Link href={`/products/${product.id}`}>
              <a>
                <div key={product.id}>
                  <div className="mb-4 h-56 w-full bg-slate-300" />
                  <h3 className=" text-gray-700 -mb-1">{product.name}</h3>
                  <span className="text-xs font-medium text-gray-900 ">${product.price}</span>
                </div>
              </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
