import { useRouter } from 'next/router';
import { useState , useEffect} from 'react';
import useSWR from "swr";
/* swr은 old value와 new value를 비교해서 변화가 없다면 old value를 cache로 유지한다 
사용자가 내 웹사이트의 다른 메뉴들을 왔다갔다 했을때도 비교하지만 다른 탭에서 다른짓(?)을 하다 왔을때도 바로 check(update)해주는 기특한녀석
*/

const fetcher = (url:string) => fetch(url).then((response) => response.json());

export default function useUser(){
    // const {data, error} = useSWR("/api/users/me", fetcher)
    const {data, error} = useSWR("/api/users/me")
    const [ user, setUser ] = useState();
    const router = useRouter();
    /*
    useEffect(()=>{
        fetch("/api/users/me")
        .then(response => response.json())
        .then((data) =>{
            if(!data.ok){
                return router.replace("/enter")
            }
            setUser(data.profile);
        })
    },[router]) 
    */
    useEffect(()=>{
        if(data && !data.ok){
            router.replace("/enter");
        }

    }, [data, router])

    return {user: data?.profile, isLoading: !data && !error}
}