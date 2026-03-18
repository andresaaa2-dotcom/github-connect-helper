import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ArrowLeft, Lock } from "lucide-react";
import { TrustBadges } from "@/components/TrustBadges";

const steps = ["Account", "Shipping", "Payment", "Confirm"];

const Checkout = () => {
  const navigate = useNavigate();
  const { cartTotal, hasBundle, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", address: "", city: "", zip: "", country: "",
  });

  if (cartTotal === 0) {
    navigate("/cart");
    return null;
  }

  const handleComplete = () => {
    clearCart();
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => (step > 0 && step < 3 ? setStep(step - 1) : navigate("/cart"))} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <span className="font-heading text-xl text-foreground">vitastack</span>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            Secure
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 section-padding">
        <div className="container max-w-lg">
          {/* Step Indicators */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {steps.map((s, i) => (
              <React.Fragment key={s}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                {i < steps.length - 1 && <div className={`w-8 h-0.5 ${i < step ? "bg-primary" : "bg-muted"}`} />}
              </React.Fragment>
            ))}
          </div>

          {step === 0 && (
            <div className="animate-fade-in">
              <h2 className="font-heading text-2xl text-foreground mb-6">Create Your Account</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Create a password" className="rounded-xl mt-1.5" />
                </div>
              </div>
              <Button size="lg" className="w-full rounded-full mt-8 py-6" onClick={() => setStep(1)} disabled={!email.includes("@")}>
                Continue to Shipping
              </Button>
            </div>
          )}

          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="font-heading text-2xl text-foreground mb-6">Shipping Address</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <Input value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="rounded-xl mt-1.5" />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="rounded-xl mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label>Address</Label>
                  <Input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="rounded-xl mt-1.5" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>City</Label>
                    <Input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="rounded-xl mt-1.5" />
                  </div>
                  <div>
                    <Label>ZIP Code</Label>
                    <Input value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} className="rounded-xl mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label>Country</Label>
                  <Input value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="rounded-xl mt-1.5" />
                </div>
              </div>
              <Button size="lg" className="w-full rounded-full mt-8 py-6" onClick={() => setStep(2)}>
                Continue to Payment
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="font-heading text-2xl text-foreground mb-6">Payment Method</h2>
              <div className="wellness-card p-6 mb-6">
                <p className="text-sm text-muted-foreground mb-4">Card Details</p>
                <div className="space-y-4">
                  <div>
                    <Label>Card Number</Label>
                    <Input placeholder="1234 5678 9012 3456" className="rounded-xl mt-1.5" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Expiry</Label>
                      <Input placeholder="MM/YY" className="rounded-xl mt-1.5" />
                    </div>
                    <div>
                      <Label>CVC</Label>
                      <Input placeholder="123" className="rounded-xl mt-1.5" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="wellness-card p-6 mb-8">
                <div className="flex justify-between mb-2">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="text-foreground">€{cartTotal}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-muted-foreground">Shipping</p>
                  <p className="text-foreground">Free</p>
                </div>
                <div className="border-t border-border mt-3 pt-3 flex justify-between">
                  <p className="font-medium text-foreground">Total</p>
                  <p className="font-heading text-xl text-foreground">€{cartTotal}{hasBundle && <span className="text-sm text-muted-foreground font-body">/mo</span>}</p>
                </div>
              </div>

              <Button size="lg" className="w-full rounded-full py-6 text-lg" onClick={handleComplete}>
                <Lock className="mr-2 h-4 w-4" />
                Complete Order · €{cartTotal}
              </Button>
              <TrustBadges className="mt-6" />
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="font-heading text-3xl text-foreground mb-3">Order Confirmed!</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-sm mx-auto">
                Your personalized vitamin stack is on its way. Check your email for order details.
              </p>
              {hasBundle && (
                <div className="wellness-card p-6 mb-8 text-left max-w-sm mx-auto">
                  <h3 className="font-medium text-foreground mb-2">Your Subscription</h3>
                  <p className="text-sm text-muted-foreground">Next delivery in 30 days. Manage your subscription anytime from your account.</p>
                </div>
              )}
              <Button onClick={() => navigate("/")} className="rounded-full">
                Back to Home
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
