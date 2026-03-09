import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { supplements } from "@/data/supplements";
import { Button } from "@/components/ui/button";
import { Plus, ShoppingCart } from "lucide-react";

const Customize = () => {
  const navigate = useNavigate();
  const { items, addToCart, removeFromCart, hasBundle, bundleItems, bundlePrice, cartTotal } = useCart();

  const isInCart = (id: string) => items.some((i) => i.supplementId === id);

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <span className="font-heading text-xl text-foreground cursor-pointer" onClick={() => navigate("/")}>vitastack</span>
          <Button variant="outline" size="sm" onClick={() => navigate("/cart")}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart {(items.length > 0 || hasBundle) && `(${items.length + (hasBundle ? 1 : 0)})`}
          </Button>
        </div>
      </nav>

      <div className="pt-24 pb-16 section-padding">
        <div className="container max-w-4xl">
          <div className="mb-12 animate-fade-in">
            <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-3">Individual Supplements</h1>
            <p className="text-muted-foreground text-lg">Buy individual supplements as one-time purchases.</p>
          </div>

          {hasBundle && (
            <div className="wellness-card-selected p-6 mb-8 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">✅ Monthly Personalized Pack</h3>
                  <p className="text-sm text-muted-foreground">{bundleItems.length} nutrients · Auto-refill every 30 days</p>
                </div>
                <p className="text-xl font-heading text-foreground">€{bundlePrice}/mo</p>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supplements.map((supp, i) => {
              const inCart = isInCart(supp.id);
              return (
                <div key={supp.id} className="wellness-card p-5 animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${supp.color}20` }}>
                    <supp.icon className="h-6 w-6" style={{ color: supp.color }} />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">{supp.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{supp.benefit}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-heading text-lg text-foreground">€{supp.price}</p>
                    <Button
                      size="sm"
                      variant={inCart ? "secondary" : "default"}
                      className="rounded-full"
                      onClick={() => (inCart ? removeFromCart(supp.id) : addToCart(supp.id, "one-time"))}
                    >
                      {inCart ? "Remove" : (
                        <>
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {(items.length > 0 || hasBundle) && (
            <div className="mt-12 text-center">
              <Button size="lg" className="rounded-full text-lg px-8 py-6" onClick={() => navigate("/cart")}>
                View Cart · €{cartTotal}
                <ShoppingCart className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customize;
