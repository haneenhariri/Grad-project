import { useEffect, useState } from "react"
import { userPayment } from "../../services/payment";

export default function PurchaseHistory() {
    const [payments, setPayments] = useState<any[]>([]);
    useEffect( () => 
        {
            const gitPayments = async () => 
            {
                try{
                    const myTeacher = await userPayment();
                    setPayments(myTeacher.data);
                }catch (error) {
                    console.error("Error fetching user:", error);
                  }
            };
            gitPayments();
    
        }, []);
  return (
    <div className="py-10 p-5 border grid grid-cols-4 gap-6 border-violet-400 rounded-b">  
      {payments?.map((t,i) => 
        (
            <div key={i} className=" border">
                <p>{t?.course}</p>
            </div>
        ))}
    </div>
  )
}
