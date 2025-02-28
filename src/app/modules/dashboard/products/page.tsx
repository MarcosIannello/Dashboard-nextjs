import { products } from "@/models/products";
import { ProductCard } from "./productCard/ProductCard";

export default function CartPage() {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex justify-center items-center h-20 bg-gray-200 rounded">
        <h1 className="text-xl font-bold">Products Page</h1>
      </div>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
          products.map((product) => {
            return (
              <ProductCard key={product.id} product={product} />
            )
          })
        }
      </div>
      
    </div>
  );
}