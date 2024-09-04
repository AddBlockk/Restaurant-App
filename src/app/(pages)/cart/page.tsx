import CartItems from "@/app/components/CartItems";
import OrderSummary from "@/app/components/OrderSummary";

function CartPage() {
  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      <CartItems />
      <OrderSummary />
    </div>
  );
}

export default CartPage;
