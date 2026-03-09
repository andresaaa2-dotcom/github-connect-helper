import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import { useCart } from "@/context/CartContext";
import { supplements, calculateBundlePrice } from "@/data/supplements";
import { generateRecommendations } from "@/utils/recommendations";
import { Button } from "@/components/ui/button";
import { Check, Plus, Minus, ArrowRight, Package, ShoppingCart } from "lucide-react";

const Recommendation = () => {
  const navigate = useNavigate();
  const { answers } = useQuiz();
  const { setBundleItems, setHasBundle } = useCart();

  const recommendations = useMemo(() => generateRecommendations(answers), [answers]);
  const [selectedIds, setSelectedIds] = useState<string[]>(recommendations.map((r) => r.supplementId));

  const toggleSupplement = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const bundlePrice = calculateBundlePrice(selectedIds);
  const userName = answers.name || "there";

  const handleSubscribe = () => {
    setBundleItems(selectedIds);
    setHasBundle(true);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <span className="font-heading text-xl text-foreground cursor-pointer" onClick={() => navigate("/")}>vitastack</span>
          <Button variant="outline" size="sm" onClick={() => navigate("/cart")}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart
          </Button>
        </div>
      </nav>

      <div className="pt-24 pb-32 section-padding">
        <div className="container max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-12 animate-fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full bg-sage text-sage-foreground text-sm font-medium mb-4">
              Your Results
            </span>
            <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-3">
              {userName}, here's your personalized vitamin stack
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Based on your profile, we've selected {recommendations.length} nutrients optimized for your health.
            </p>
          </div>

          {/* Supplement Cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {recommendations.map((rec, i) => {
              const supp = supplements.find((s) => s.id === rec.supplementId)!;
              const isSelected = selectedIds.includes(supp.id);

              return (
                <div
                  key={supp.id}
                  className={`${isSelected ? "wellness-card-selected" : "wellness-card"} p-6 cursor-pointer animate-fade-in`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                  onClick={() => toggleSupplement(supp.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${supp.color}20` }}>
                        <supp.icon className="h-5 w-5" style={{ color: supp.color }} />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{supp.name}</h3>
                        <p className="text-sm text-muted-foreground">{supp.benefit}</p>
                      </div>
                    </div>
                    <button
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isSelected ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      {isSelected ? (
                        <Check className="h-4 w-4 text-primary-foreground" />
                      ) : (
                        <Plus className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">{rec.reason}</p>
                  <p className="text-sm font-medium text-foreground mt-2">€{supp.price}/month</p>
                </div>
              );
            })}
          </div>

          {/* All Supplements */}
          <div className="mb-12">
            <h2 className="font-heading text-2xl text-foreground mb-6">Add More Supplements</h2>
            <div className="grid md:grid-cols-3 gap-3">
              {supplements
                .filter((s) => !recommendations.find((r) => r.supplementId === s.id))
                .map((supp) => {
                  const isSelected = selectedIds.includes(supp.id);
                  return (
                    <div
                      key={supp.id}
                      className={`${isSelected ? "wellness-card-selected" : "wellness-card"} p-4 cursor-pointer`}
                      onClick={() => toggleSupplement(supp.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <supp.icon className="h-5 w-5" style={{ color: supp.color }} />
                          <div>
                            <p className="text-sm font-medium text-foreground">{supp.name}</p>
                            <p className="text-xs text-muted-foreground">€{supp.price}/mo</p>
                          </div>
                        </div>
                        <button className={`w-6 h-6 rounded-full flex items-center justify-center ${isSelected ? "bg-primary" : "bg-muted"}`}>
                          {isSelected ? <Check className="h-3 w-3 text-primary-foreground" /> : <Plus className="h-3 w-3 text-muted-foreground" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border p-4">
        <div className="container max-w-4xl">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground">{selectedIds.length} nutrients · Monthly Pack</p>
              <p className="text-2xl font-heading text-foreground">€{bundlePrice}<span className="text-sm text-muted-foreground font-body">/month</span></p>
            </div>
            <p className="text-xs text-muted-foreground text-right max-w-[140px]">30 daily vitamin packs tailored for you</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSubscribe} size="lg" className="flex-1 rounded-full text-lg py-6" disabled={selectedIds.length === 0}>
              <Package className="mr-2 h-5 w-5" />
              Start Monthly Subscription
            </Button>
          </div>
          <button
            onClick={() => navigate("/customize", { state: { selectedIds } })}
            className="w-full text-center text-sm text-muted-foreground mt-3 hover:text-foreground transition-colors"
          >
            Or buy individual supplements →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
