import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { supplements } from "@/data/supplements";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, Package } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const { items, hasBundle, bundleItems, bundlePrice, removeFromCart, updateQuantity, clearCart, cartTotal, setHasBundle } = useCart();

  const isEmpty = !hasBundle && items.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <span className="font-heading text-xl text-foreground cursor-pointer" onClick={() => navigate("/")}>vitastack</span>
          {!isEmpty && (
            <button onClick={clearCart} className="text-sm text-muted-foreground hover:text-destructive transition-colors">
              Clear Cart
            </button>
          )}
        </div>
      </nav>

      <div className="pt-24 pb-16 section-padding">
        <div className="container max-w-2xl">
          <h1 className="font-heading text-3xl text-foreground mb-8 animate-fade-in">Your Cart</h1>

          {isEmpty ? (
            <div className="text-center py-16 animate-fade-in">
              <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-6">Your cart is empty</p>
              <Button onClick={() => navigate("/quiz")} className="rounded-full">
                Take the Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="animate-fade-in">
              {/* Bundle */}
              {hasBundle && (
                <div className="wellness-card p-6 mb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Personalized Monthly Stack</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {bundleItems.length} nutrients · Subscription · Auto-refill 30 days
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {bundleItems.map((id) => {
                          const supp = supplements.find((s) => s.id === id);
                          return supp ? (
                            <span key={id} className="px-2 py-0.5 bg-sage text-sage-foreground text-xs rounded-full">
                              {supp.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="font-heading text-xl text-foreground">€{bundlePrice}</p>
                      <p className="text-xs text-muted-foreground">/month</p>
                      <button onClick={() => setHasBundle(false)} className="mt-2 text-destructive hover:text-destructive/80 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Individual Items */}
              {items.map((item) => {
                const supp = supplements.find((s) => s.id === item.supplementId);
                if (!supp) return null;
                return (
                  <div key={item.supplementId} className="wellness-card p-5 mb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${supp.color}20` }}>
                          <supp.icon className="h-5 w-5" style={{ color: supp.color }} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{supp.name}</p>
                          <p className="text-xs text-muted-foreground">One-time · €{supp.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-muted rounded-full p-1">
                          <button onClick={() => updateQuantity(supp.id, item.quantity - 1)} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-background transition-colors">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-medium w-5 text-center text-foreground">{item.quantity}</span>
                          <button onClick={() => updateQuantity(supp.id, item.quantity + 1)} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-background transition-colors">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="font-medium text-foreground w-12 text-right">€{supp.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Total */}
              <div className="border-t border-border mt-6 pt-6">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-lg font-medium text-foreground">Total</p>
                  <p className="text-2xl font-heading text-foreground">€{cartTotal}</p>
                </div>
                <Button size="lg" className="w-full rounded-full text-lg py-6" onClick={() => navigate("/checkout")}>
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <div className="flex justify-center gap-6 mt-4">
                  <button onClick={() => navigate("/customize")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    ← Add more supplements
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
