import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { supplements, categories } from "@/data/supplements";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Search, Star, Plus, Check, ArrowRight, SlidersHorizontal } from "lucide-react";
import supplementBottle from "@/assets/supplement-bottle.jpg";

const Marketplace = () => {
  const navigate = useNavigate();
  const { items, addToCart, removeFromCart, hasBundle } = useCart();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "price-low" | "price-high">("popular");

  const isInCart = (id: string) => items.some((i) => i.supplementId === id);
  const cartCount = items.length + (hasBundle ? 1 : 0);

  const filtered = supplements
    .filter((s) => activeCategory === "all" || s.category === activeCategory)
    .filter((s) =>
      searchQuery === "" ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.benefit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return b.reviews - a.reviews;
    });

  const featuredProducts = supplements.filter((s) => s.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <span className="font-heading text-xl text-foreground cursor-pointer" onClick={() => navigate("/")}>vitastack</span>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>Dashboard</Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/cart")} className="relative">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-16">
        {/* Hero Banner */}
        <section className="section-padding bg-gradient-to-br from-sage/60 to-warm/60">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="animate-fade-in">
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">New Arrivals</Badge>
                <h1 className="font-heading text-3xl md:text-5xl text-foreground mb-4">
                  Shop Premium Supplements
                </h1>
                <p className="text-muted-foreground text-lg mb-6 max-w-md">
                  Science-backed, third-party tested vitamins and supplements. Free shipping on bundles.
                </p>
                <Button size="lg" className="rounded-full" onClick={() => navigate("/quiz")}>
                  Get Personalized Picks
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="hidden md:flex justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <img src={supplementBottle} alt="Premium supplements" className="h-72 object-contain drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Featured */}
        <section className="section-padding">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl text-foreground">Bestsellers</h2>
              <button onClick={() => setActiveCategory("all")} className="text-sm text-primary hover:underline">View all →</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredProducts.map((supp, i) => (
                <div
                  key={supp.id}
                  className="wellness-card p-5 group animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ backgroundColor: `${supp.color}15` }}>
                    <supp.icon className="h-7 w-7" style={{ color: supp.color }} />
                  </div>
                  <Badge variant="secondary" className="text-xs mb-2">Bestseller</Badge>
                  <h3 className="font-medium text-foreground">{supp.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{supp.benefit}</p>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    <span className="text-xs font-medium text-foreground">{supp.rating}</span>
                    <span className="text-xs text-muted-foreground">({supp.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-lg text-foreground">€{supp.price}</span>
                    <Button
                      size="sm"
                      variant={isInCart(supp.id) ? "secondary" : "default"}
                      className="rounded-full h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        isInCart(supp.id) ? removeFromCart(supp.id) : addToCart(supp.id, "one-time");
                      }}
                    >
                      {isInCart(supp.id) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Products */}
        <section className="px-4 pb-16 md:px-8 lg:px-16">
          <div className="container">
            <h2 className="font-heading text-2xl text-foreground mb-6">All Supplements</h2>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search supplements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-full"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      activeCategory === cat.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    <cat.icon className="h-3.5 w-3.5" />
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Sort:</span>
              {(["popular", "price-low", "price-high"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`text-sm px-3 py-1 rounded-full transition-colors ${
                    sortBy === s ? "bg-secondary text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s === "popular" ? "Popular" : s === "price-low" ? "Price ↑" : "Price ↓"}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((supp, i) => {
                const inCart = isInCart(supp.id);
                return (
                  <div
                    key={supp.id}
                    className="wellness-card p-6 group animate-fade-in"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: `${supp.color}15` }}>
                        <supp.icon className="h-7 w-7" style={{ color: supp.color }} />
                      </div>
                      <div className="flex gap-1.5">
                        {supp.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-[10px] capitalize">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    <h3 className="font-medium text-foreground text-lg mb-1">{supp.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{supp.benefit}</p>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{supp.description}</p>
                    <div className="flex items-center gap-1 mb-4">
                      <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                      <span className="text-sm font-medium text-foreground">{supp.rating}</span>
                      <span className="text-xs text-muted-foreground">({supp.reviews.toLocaleString()} reviews)</span>
                      <span className="text-xs text-muted-foreground ml-auto">{supp.servings} servings</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="font-heading text-xl text-foreground">€{supp.price}<span className="text-sm text-muted-foreground font-body">/mo</span></span>
                      <Button
                        size="sm"
                        variant={inCart ? "secondary" : "default"}
                        className="rounded-full"
                        onClick={() => inCart ? removeFromCart(supp.id) : addToCart(supp.id, "one-time")}
                      >
                        {inCart ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-1" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No supplements found. Try a different search or category.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Marketplace;
