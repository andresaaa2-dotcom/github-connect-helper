import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin, Calendar, Clock, CreditCard, CheckCircle2, Shield,
  ArrowRight, ArrowLeft, FlaskConical,
} from "lucide-react";

const labs = [
  { id: "randox", name: "Randox Health", locations: ["Dublin City Centre", "Cork", "Belfast"], price: 149 },
  { id: "letsgetchecked", name: "LetsGetChecked", locations: ["Home Kit — Nationwide"], price: 129 },
  { id: "medichecks", name: "Medichecks", locations: ["Dublin", "Galway", "Limerick"], price: 159 },
];

const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00"];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookBloodTestModal = ({ open, onOpenChange }: Props) => {
  const [step, setStep] = useState(1);
  const [selectedLab, setSelectedLab] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const lab = labs.find((l) => l.id === selectedLab);

  const reset = () => {
    setStep(1);
    setSelectedLab("");
    setSelectedLocation("");
    setSelectedDate("");
    setSelectedTime("");
  };

  const handleClose = (val: boolean) => {
    if (!val) reset();
    onOpenChange(val);
  };

  // Generate next 14 available dates (skip Sundays)
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 2);
    return d;
  }).filter((d) => d.getDay() !== 0);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-primary" />
            Book a Blood Test
          </DialogTitle>
        </DialogHeader>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-6">
          {["Lab", "Schedule", "Payment", "Done"].map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step > i + 1
                    ? "bg-accent text-accent-foreground"
                    : step === i + 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > i + 1 ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              {i < 3 && <div className={`flex-1 h-0.5 ${step > i + 1 ? "bg-accent" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Select Lab */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Choose a trusted lab partner near you.</p>
            <div className="space-y-3">
              {labs.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    setSelectedLab(l.id);
                    setSelectedLocation("");
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedLab === l.id
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-heading font-semibold text-foreground">{l.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 inline mr-1" />
                        {l.locations.join(" · ")}
                      </p>
                    </div>
                    <Badge variant="secondary" className="font-heading font-bold">€{l.price}</Badge>
                  </div>
                </button>
              ))}
            </div>

            {selectedLab && lab && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Select Location</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Choose a location" />
                  </SelectTrigger>
                  <SelectContent>
                    {lab.locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button
              className="w-full rounded-xl"
              disabled={!selectedLab || !selectedLocation}
              onClick={() => setStep(2)}
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Pick a date and time for your appointment.</p>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary" /> Date
              </Label>
              <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                {availableDates.map((d) => {
                  const val = d.toISOString().split("T")[0];
                  const label = d.toLocaleDateString("en-IE", { weekday: "short", day: "numeric", month: "short" });
                  return (
                    <button
                      key={val}
                      onClick={() => setSelectedDate(val)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                        selectedDate === val
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-foreground hover:border-primary/30"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedDate && (
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-primary" /> Time
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                        selectedTime === t
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-foreground hover:border-primary/30"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl" onClick={() => setStep(1)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                className="flex-1 rounded-xl"
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(3)}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && lab && (
          <div className="space-y-4">
            <div className="wellness-card p-4 space-y-2">
              <p className="text-sm font-medium text-foreground">Order Summary</p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{lab.name}</span>
                <span className="font-medium text-foreground">€{lab.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{selectedLocation}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {new Date(selectedDate).toLocaleDateString("en-IE", { weekday: "long", day: "numeric", month: "long" })} at {selectedTime}
                </span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-heading font-bold text-foreground">
                <span>Total</span>
                <span>€{lab.price}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Cardholder Name</Label>
                <Input placeholder="John Doe" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Card Number</Label>
                <Input placeholder="4242 4242 4242 4242" className="rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Expiry</Label>
                  <Input placeholder="MM/YY" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">CVC</Label>
                  <Input placeholder="123" className="rounded-xl" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-4 w-4 text-accent" />
              Payments are secure and encrypted. Your data is protected.
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl" onClick={() => setStep(2)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button className="flex-1 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setStep(4)}>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay €{lab.price}
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && lab && (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground">Booking Confirmed!</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Your blood test with <span className="font-medium text-foreground">{lab.name}</span> is booked.
              </p>
            </div>
            <div className="wellness-card p-4 text-left space-y-2 text-sm">
              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="h-4 w-4 text-primary" /> {selectedLocation}
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                {new Date(selectedDate).toLocaleDateString("en-IE", { weekday: "long", day: "numeric", month: "long" })}
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Clock className="h-4 w-4 text-primary" /> {selectedTime}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Confirmation and prep instructions have been sent to your email. Results will automatically appear on your dashboard.
            </p>
            <Button className="w-full rounded-xl" onClick={() => handleClose(false)}>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookBloodTestModal;
