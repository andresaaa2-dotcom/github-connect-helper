import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supplements, categories, type Supplement } from "@/data/supplements";
import { mockBiomarkers } from "@/data/biomarkers";
import { useCart } from "@/context/CartContext";
import { useBloodTest } from "@/context/BloodTestContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import {
  Search, Star, ShoppingCart, Filter, ChevronDown, ChevronUp,
  FlaskConical, Lock, Upload,
} from "lucide-react";
import { SecurityFooter } from "@/components/TrustBadges";

type SortOption = "featured" | "price-low" | "price-high" | "rating";

const Marketplace = () => {
  const navigate = useNavigate();
  const { addToCart, items } = useCart();
  const { hasUploadedBloodTest } = useBloodTest();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const biomarkerLinkedIds = useMemo(() => {
    return mockBiomarkers
      .filter((b) => b.status !== "optimal" && b.relatedSupplements)
      .flatMap((b) => b.relatedSupplements!);
  }, []);

  const filtered = useMemo(() => {
    let result = supplements;
    if (activeCategory !== "all") {
      result = result.filter((s) => s.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) => s.name.toLowerCase().includes(q) || s.benefit.toLowerCase().includes(q) || s.tags.some((t) => t.includes(q))
      );
    }
    switch (sortBy) {
      case "price-low":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...result].sort((a, b) => b.price - a.price);
      case "rating":
        return [...result].sort((a, b) => b.rating - a.rating);
      default:
        return [...result].sort((a, b) => (biomarkerLinkedIds.includes(a.id) ? -1 : 1) - (biomarkerLinkedIds.includes(b.id) ? -1 : 1));
    }
  }, [searchQuery, activeCategory, sortBy, biomarkerLinkedIds]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 section-padding">
        <div className="container max-w-6xl">
          <div className="mb-8 animate-fade-in">
            <h1 className="font-heading text-3xl md:text-4xl text-foreground font-bold tracking-tight mb-2">Only what you actually need</h1>
            <p className="text-muted-foreground text-lg">Cut through the supplement noise — every product here is matched to real biomarker data.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search supplements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="featured">Recommended</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                <cat.icon className="h-4 w-4" />
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((supp) => (
              <ProductCard
                key={supp.id}
                supplement={supp}
                isBiomarkerLinked={biomarkerLinkedIds.includes(supp.id)}
                isExpanded={expandedProduct === supp.id}
                onToggle={() => setExpandedProduct(expandedProduct === supp.id ? null : supp.id)}
                onAdd={() => addToCart(supp.id, "one-time")}
                inCart={items.some((item) => item.supplementId === supp.id)}
                hasBloodTest={hasUploadedBloodTest}
                onUploadClick={() => navigate("/blood-test")}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No supplements found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      <SecurityFooter />
    </div>
  );
};

const ProductCard = ({
  supplement,
  isBiomarkerLinked,
  isExpanded,
  onToggle,
  onAdd,
  inCart,
  hasBloodTest,
  onUploadClick,
}: {
  supplement: Supplement;
  isBiomarkerLinked: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onAdd: () => void;
  inCart: boolean;
  hasBloodTest: boolean;
  onUploadClick: () => void;
}) => {
  return (
    <div className={`wellness-card p-5 transition-all ${isBiomarkerLinked ? "ring-2 ring-primary/20 border-primary/30" : ""}`}>
      <div className="flex items-start gap-4">
        <img
          src={supplement.image}
          alt={supplement.name}
          className="w-20 h-20 rounded-xl object-cover flex-shrink-0 bg-secondary"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-heading font-semibold text-foreground">{supplement.name}</h3>
            {isBiomarkerLinked && (
              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs border">
                <FlaskConical className="h-3 w-3 mr-1" />
                Biomarker Match
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-2">{supplement.benefit}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" />
              {supplement.rating}
            </span>
            <span>{supplement.reviews.toLocaleString()} reviews</span>
            <span>{supplement.servings} servings</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="font-heading text-xl font-bold text-foreground">€{supplement.price}</p>
          <Button
            size="sm"
            variant={inCart ? "secondary" : "default"}
            className="mt-2 rounded-lg text-xs"
            onClick={onAdd}
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            {inCart ? "Added" : "Add"}
          </Button>
        </div>
      </div>

      <button onClick={onToggle} className="flex items-center gap-1 text-xs text-primary mt-3 hover:underline">
        <FlaskConical className="h-3 w-3" />
        {isExpanded ? "Hide details" : "View evidence & dosage"}
        {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </button>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-border space-y-3 animate-fade-in">
          <p className="text-sm text-foreground">{supplement.description}</p>
          <div className="p-3 rounded-xl bg-secondary">
            <p className="text-xs font-medium text-foreground mb-1">📚 Scientific Evidence</p>
            <p className="text-xs text-muted-foreground">{supplement.evidence}</p>
          </div>
          <div className="p-3 rounded-xl bg-secondary">
            <p className="text-xs font-medium text-foreground mb-1">💊 General Dosage</p>
            <p className="text-xs text-muted-foreground">{supplement.dosage}</p>
          </div>

          {/* Personalized Dosage — locked behind blood test */}
          {supplement.personalizedDosage ? (
            hasBloodTest ? (
              <div className="p-3 rounded-xl bg-accent/5 border border-accent/20">
                <p className="text-xs font-medium text-foreground mb-2 flex items-center gap-1.5">
                  <FlaskConical className="h-3.5 w-3.5 text-accent" />
                  Your Personalized Dosage Range
                </p>
                <div className="space-y-2">
                  {supplement.personalizedDosage.map((pd) => (
                    <div key={pd.status} className="flex items-start gap-2">
                      <Badge
                        variant="outline"
                        className={`text-[10px] mt-0.5 flex-shrink-0 ${
                          pd.status === "low"
                            ? "border-warning text-warning"
                            : pd.status === "high"
                            ? "border-destructive text-destructive"
                            : "border-accent text-accent"
                        }`}
                      >
                        {pd.status.toUpperCase()}
                      </Badge>
                      <div>
                        <p className="text-xs font-medium text-foreground">{pd.range}</p>
                        <p className="text-[11px] text-muted-foreground">{pd.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-muted/50 border border-border text-center">
                <Lock className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
                <p className="text-xs font-medium text-foreground mb-1">Personalized Dosage Locked</p>
                <p className="text-[11px] text-muted-foreground mb-3">
                  Upload your blood test to unlock dosage recommendations tailored to your biomarkers.
                </p>
                <Button size="sm" variant="outline" className="rounded-lg text-xs" onClick={onUploadClick}>
                  <Upload className="h-3 w-3 mr-1" />
                  Upload Blood Test
                </Button>
              </div>
            )
          ) : null}

          {supplement.recommendedFor && (
            <div className="flex flex-wrap gap-1.5">
              {supplement.recommendedFor.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
