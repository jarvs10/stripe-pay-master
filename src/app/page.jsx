'use client'
import { products } from "@/products";
import axios from "axios";

export default function Home() {

  const handlePay = async (product) => {
    try {
      const response = await axios.post('/api/checkout', product);

      window.location = response.data.url

    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-4xl text-center font-bold mb-10'>Productos</h1>

      <div className='grid grid-cols-3 gap-10'>
        {products.map((product) => {
          return (
            <div className='bg-slate-800 text-center p-4 rounded-md shadow-md text-white' key={product.id}>
              <h2 className='mb-2'>{product.name}</h2>
              <p>${product.price}</p>
              <img className='w-full' src={product.image} alt={product.name} />
              <button onClick={() => handlePay(product)} className='bg-lime-500 py-2 w-full font-bold rounded-md hover:bg-lime-700 mt-6'>Pagar</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
