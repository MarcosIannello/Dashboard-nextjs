import { Widget } from "@/app/shared/components";
import { Product, products } from "@/models/products";
import { cookies } from "next/headers";
import { ItemCard } from "./components/ItemCard";


export const metadata = {
  title: 'Cart Page',
  description: 'Cart Products',
};

interface productsInCart {
  product: Product,
  quantity: number
}



const getProductsInCart = async (cart: { [id: string]: number }) => {

  const productsInCart: productsInCart[] = [];


  for (const id of Object.keys(cart)) {
    const product = products.find(p => p.id === id);
    if (product) {
      productsInCart.push({ product, quantity: cart[id] });
    }
  }

  return productsInCart;

}


export default async function CartPage() {

  const cookiesStore = await cookies()
  const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}');
  const productsInCart = getProductsInCart(cart);
  const totalToPay = (await productsInCart).reduce((prev, current) => (current.product.price * current.quantity) + prev, 0)

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-5xl">Cart Products</h1>
      <hr />

      <div className="flex sm:flex-row w-full gap-2">
        <div className="flex flex-col gap-2 w-full">
          {
            (await productsInCart).map((product) => (
              <ItemCard key={`${product.product.id}-${product.quantity}`} product={product.product} quantity={product.quantity} />
            ))
          }
        </div>

        <div className="flex flex-col w-full sm:w-4/12 justify-center">
          <Widget title="Cart Summary">
            <div>
              <h3 className="text-3xl font-bold text-gray-700">${(totalToPay * 1.15).toFixed(2)}</h3>
            </div>
            <span className="font-bold text-gray-500">Tax 15%: ${(totalToPay * 0.15).toFixed(2)}  </span>
          </Widget>

        </div>
      </div>

    </div>
  );
}