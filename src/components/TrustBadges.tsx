import { Shield, Lock, FileCheck, Eye } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const badges = [
  {
    icon: Shield,
    label: "ISO 27001",
    subtitle: "Information Security",
    tooltip:
      "ISO 27001 Certified – Your health data is protected by internationally recognized information security management standards. Data encrypted in transit and at rest.",
  },
  {
    icon: Lock,
    label: "ISO 27701",
    subtitle: "Privacy Management",
    tooltip:
      "ISO 27701 Certified – Privacy information management ensures your personal health data is handled according to the highest privacy standards. You can delete your data at any time.",
  },
  {
    icon: FileCheck,
    label: "GDPR",
    subtitle: "Compliant",
    tooltip:
      "Fully GDPR compliant – Your data is stored securely within European regulations. Personal data is never sold or shared without your explicit consent.",
  },
  {
    icon: Eye,
    label: "E2E Encrypted",
    subtitle: "Health Data",
    tooltip:
      "End-to-end encrypted – Blood test files and biomarker data are processed securely with full encryption. Only you can access your health information.",
  },
];

export const TrustBadges = ({ className = "" }: { className?: string }) => {
  return (
    <TooltipProvider delayDuration={200}>
      <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
        {badges.map((badge) => (
          <Tooltip key={badge.label}>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-border bg-secondary/50 hover:bg-secondary transition-colors cursor-help">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <badge.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-heading font-semibold text-foreground leading-tight">
                    {badge.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-tight">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs text-center">
              <p className="text-xs">{badge.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export const SecurityFooter = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`border-t border-border ${className}`}>
      <div className="container py-12 section-padding">
        <div className="text-center mb-8">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
            Your Health Data is Secure
          </h3>
          <p className="text-sm text-muted-foreground">
            We take the security of your health information seriously.
          </p>
        </div>

        <TrustBadges className="mb-8" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { emoji: "🔒", text: "ISO-27001 secure infrastructure" },
            { emoji: "🛡", text: "GDPR-compliant data storage" },
            { emoji: "🔐", text: "End-to-end encrypted biomarker data" },
            { emoji: "📄", text: "Transparent privacy policy" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="text-base flex-shrink-0">{item.emoji}</span>
              <span className="text-xs">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="font-heading text-xl font-bold text-foreground mb-1">biostack</p>
          <p className="text-xs text-muted-foreground">
            Data-driven health optimization.
          </p>
        </div>
      </div>
    </div>
  );
};
