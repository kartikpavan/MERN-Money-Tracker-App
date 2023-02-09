import autoAnimate from "@formkit/auto-animate";
import React, { useEffect, useRef, useState } from "react";

export const App = () => {
   const [name, setName] = useState("");
   const [date, setDate] = useState("");
   const [description, setDescription] = useState("");
   const parent = useRef(null); // autoanimate ref

   // Add transaction
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const price = name.split(" ")[0];
      const URL = import.meta.env.VITE_API_URL + "/transaction";
      try {
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
         console.log(data);
         setName("");
         setDescription("");
         setDate("");
      } catch (error) {
         if (error instanceof Error) {
            console.log(error.message);
         }
      }
   };

   useEffect(() => {
      parent.current && autoAnimate(parent.current);
   }, [parent]);

   const TodayDate = new Date().toDateString();

   return (
      <main className="w-11/12 sm:w-9/12 md:9/12 lg:w-8/12 xl:w-1/2 max-w-full mx-auto  border-2 border-red-200">
         <h1 className="text-4xl font-semibold  my-6 text-center">₹4000</h1>
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
            <div className="flex justify-between my-1 py-1 border-b-2 border-gray-200">
               {/* left side */}
               <div className="w-1/2">
                  <h1 className="text-2xl font-semibold">New Samsung TV</h1>
                  <p className="text-sm text-gray-500">
                     I bought a new tv coz old one got very old
                  </p>
               </div>
               {/* Right side */}
               <div className="w-1/2">
                  <h1 className="text-2xl font-semibold text-right text-red-500">
                     - ₹4000
                  </h1>
                  <p className="text-lg text-right">{TodayDate}</p>
               </div>
            </div>
            <div className="flex justify-between my-1 py-1 border-b-2 border-gray-200">
               {/* left side */}
               <div className="w-1/2">
                  <h1 className="text-2xl font-semibold">New Samsung TV</h1>
                  <p className="text-sm text-gray-500">
                     I bought a new tv coz old one got very old
                  </p>
               </div>
               {/* Right side */}
               <div className="w-1/2">
                  <h1 className="text-2xl font-semibold text-right text-green-500">
                     + ₹4000
                  </h1>
                  <p className="text-lg text-right">{TodayDate}</p>
               </div>
            </div>
            <div className="flex justify-between my-1 py-1 border-b-2 border-gray-200">
               {/* left side */}
               <div className="w-1/2">
                  <h1 className="text-2xl font-semibold">New Samsung TV</h1>
                  <p className="text-sm text-gray-500">
                     I bought a new tv coz old one got very old
                  </p>
               </div>
               {/* Right side */}
               <div className="w-1/2">
                  <h1 className="text-2xl font-semibold text-right text-green-500">
                     + ₹4000
                  </h1>
                  <p className="text-lg text-right">{TodayDate}</p>
               </div>
            </div>
         </div>
      </main>
   );
};

export default App;
