import { CartContents } from "@/components/cart/cart-contents";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { SiteHeader } from "@/components/layout/site-header";

export default function CartPage() {
  return (
    <>
      <SiteHeader />
      <CartContents />
      <MobileBottomNav active="cart" />
    </>
  );
}
