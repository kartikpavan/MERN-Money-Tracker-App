import autoAnimate from "@formkit/auto-animate";
import React, { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import { formatDate } from "./utils/DateFormatter";

type TransactionProps = {
   id: string;
   name: string;
   price: number;
   date: string;
   description: string;
};

export const App = () => {
   const [name, setName] = useState("");
   const [date, setDate] = useState("");
   const [description, setDescription] = useState("");
   const [isLoading, setIsloading] = useState(false);
   const [transactionData, setTransactionData] = useState<TransactionProps[]>(
      []
   );
   const parent = useRef(null); // autoanimate ref

   // Add transaction
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const price = name.split(" ")[0];
      const URL = import.meta.env.VITE_API_URL + "/transaction";
      try {
         setIsloading(true);
         const response = await fetch(URL, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
               price,
               name: name.substring(price.length + 1),
               date,
               description,
            }),
         });
         const data = await response.json();
         setName("");
         setDescription("");
         setDate("");
         setIsloading(false);
         setTransactionData(data);
      } catch (error) {
         if (error instanceof Error) {
            console.log(error.message);
            setIsloading(false);
         }
      }
   };

   // Fetch All Transactions
   const fetchAllTransactions = async () => {
      const URL = import.meta.env.VITE_API_URL + "/transaction";
      try {
         setIsloading(true);
         const response = await fetch(URL);
         const data = await response.json();
         setTransactionData(data);
         setIsloading(false);
      } catch (error) {
         if (error instanceof Error) console.log(error.message);
         setIsloading(false);
      }
   };

   useEffect(() => {
      fetchAllTransactions();
   }, []);

   useEffect(() => {
      parent.current && autoAnimate(parent.current);
   }, [parent]);

   if (isLoading) return <Loader />;

   //Calculating Balance
   let balance = 0;
   for (let item of transactionData) {
      balance = balance + item.price;
   }

   return (
      <main className="w-11/12 sm:w-9/12 md:9/12 lg:w-8/12 xl:w-1/2 max-w-full mx-auto ">
         <h1 className="text-4xl font-semibold  my-6 text-center">
            ₹{balance}.00
         </h1>
         {/* Form */}
         <form action="" className="my-4" onSubmit={handleSubmit}>
            <div className="my-2 flex flex-col sm:flex-row gap-2">
               <div className="w-full">
                  {/* Name */}
                  <input
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     type="text"
                     placeholder="+200 | New Samsung TV"
                     className="input input-sm input-bordered input-neutral w-full   "
                  />
               </div>
               <div className="w-full">
                  {/* Date */}

                  <input
                     value={date}
                     onChange={(e) => setDate(e.target.value)}
                     type="date"
                     className="input input-sm input-bordered input-neutral w-full "
                  />
               </div>
            </div>
            {/* Description */}
            <div>
               <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  placeholder="Description"
                  className="input input-bordered input-neutral w-full mb-4"
               />
            </div>
            <button type="submit" className="btn btn-neutral w-full">
               Add new Transaction
            </button>
         </form>
         {/* Transactions List */}
         <div ref={parent}>
            {!transactionData?.length ? (
               <h1 className="text-2xl font-serif">No Transaction found!!</h1>
            ) : (
               <>
                  {transactionData?.map((transaction, idx) => {
                     return (
                        <div
                           key={idx}
                           className="flex justify-between my-1 py-1 border-b-2 border-gray-200"
                        >
                           {/* left side */}
                           <div className="w-1/2">
                              <h1 className="text-2xl font-semibold">
                                 {transaction?.name}
                              </h1>
                              <p className="text-sm text-gray-500">
                                 {transaction?.description}
                              </p>
                           </div>
                           {/* Right side */}
                           <div className="w-1/2">
                              <h1></h1>
                              <h1
                                 className={`text-2xl font-semibold text-right ${
                                    transaction?.price < 0
                                       ? "text-red-500"
                                       : "text-green-600"
                                 } `}
                              >
                                 {transaction?.price}
                              </h1>
                              <p className="text-lg text-right">
                                 {formatDate(transaction?.date)}
                              </p>
                           </div>
                        </div>
                     );
                  })}
               </>
            )}
         </div>
      </main>
   );
};

export default App;
