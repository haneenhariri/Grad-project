import { useEffect, useState } from "react"
import { getWishList } from "../../services/wishlist"

export default function Wishlist() {
    const [wish, setWish] = useState<any[]>([])
    console.log(wish)
  useEffect( () => {
    const fetchWishList = async () => 
    {
        try{
            const response = await getWishList();
            console.log("response.data:", response.data);
            setWish(response.data);
        }catch (err :any){
            console.log(err);
        }
    };
    fetchWishList();
  },[])
  return (
    <section className="pt-[108px] min-h-screen">
        <div>
            hi
           {wish?.map((e,i) => (
            <div key={i}>
                {e.title}
                hi
            </div>
           ))}
        </div>
        
    </section>
  )
}
