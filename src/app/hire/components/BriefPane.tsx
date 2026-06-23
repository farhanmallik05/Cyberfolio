"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, UploadCloud, Loader2 } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { MechPanel } from "@/components/ui/MechPanel";
import { briefSchema, type BriefPayload, submitBrief } from "../actions";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export function BriefPane() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const turnstileRef = useRef<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BriefPayload>({
    resolver: zodResolver(briefSchema),
    defaultValues: {
      budget_range: "",
      timeline: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 10 * 1024 * 1024) {
        setErrorMessage("File must be less than 10MB.");
        e.target.value = "";
        return;
      }
      setErrorMessage("");
      setFile(selectedFile);
    }
  };

  const onSubmit = async (data: BriefPayload) => {
    if (!turnstileToken && TURNSTILE_SITE_KEY) {
      setErrorMessage("Please complete the security check.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("company_name", data.company_name);
      formData.append("project_name", data.project_name);
      formData.append("budget_range", data.budget_range);
      formData.append("timeline", data.timeline);
      formData.append("description", data.description);

      if (turnstileToken) {
        formData.append("turnstile_token", turnstileToken);
      }

      if (file) {
        formData.append("attachment", file);
      }

      const result = await submitBrief(formData);

      if (result.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(result.error || "Failed to submit brief.");
        turnstileRef.current?.reset?.();
        setTurnstileToken(null);
      }
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
      turnstileRef.current?.reset?.();
      setTurnstileToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <MechPanel border glowHover={false} className="p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
        <CheckCircle2 className="w-16 h-16 text-mech-cyan mb-6 animate-pulse" />
        <h3 className="text-2xl font-orbitron text-white mb-2">Brief Received</h3>
        <p className="text-mech-silver">Secure transmission complete. I'll follow up within 48 hours.</p>
      </MechPanel>
    );
  }

  return (
    <MechPanel border glowHover={false} className="p-6 md:p-8 bg-black/50">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-share-tech text-mech-cyan uppercase tracking-wider">Company / Agency Name *</label>
            <input
              {...register("company_name")}
              className="w-full bg-mech-panel/80 border border-mech-silver/20 px-4 py-3 text-white focus:outline-none focus:border-mech-cyan transition-colors"
              placeholder="Wayne Enterprises"
            />
            {errors.company_name && <p className="text-mech-rose text-xs mt-1">{errors.company_name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-share-tech text-mech-cyan uppercase tracking-wider">Project Name *</label>
            <input
              {...register("project_name")}
              className="w-full bg-mech-panel/80 border border-mech-silver/20 px-4 py-3 text-white focus:outline-none focus:border-mech-cyan transition-colors"
              placeholder="Project Batcave"
            />
            {errors.project_name && <p className="text-mech-rose text-xs mt-1">{errors.project_name.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-share-tech text-mech-cyan uppercase tracking-wider">Budget Range *</label>
            <select
              {...register("budget_range")}
              className="w-full bg-mech-panel/80 border border-mech-silver/20 px-4 py-3 text-white focus:outline-none focus:border-mech-cyan transition-colors appearance-none"
            >
              <option value="" disabled>Select Budget</option>
              <option value="< ₹50K">&lt; ₹50K</option>
              <option value="₹50K–₹1.5L">₹50K–₹1.5L</option>
              <option value="₹1.5L–₹5L">₹1.5L–₹5L</option>
              <option value="₹5L+">₹5L+</option>
              <option value="Let's Discuss">Let's Discuss</option>
            </select>
            {errors.budget_range && <p className="text-mech-rose text-xs mt-1">{errors.budget_range.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-share-tech text-mech-cyan uppercase tracking-wider">Timeline *</label>
            <select
              {...register("timeline")}
              className="w-full bg-mech-panel/80 border border-mech-silver/20 px-4 py-3 text-white focus:outline-none focus:border-mech-cyan transition-colors appearance-none"
            >
              <option value="" disabled>Select Timeline</option>
              <option value="ASAP">ASAP</option>
              <option value="1–2 Months">1–2 Months</option>
              <option value="3–6 Months">3–6 Months</option>
              <option value="6+ Months">6+ Months</option>
              <option value="Flexible">Flexible</option>
            </select>
            {errors.timeline && <p className="text-mech-rose text-xs mt-1">{errors.timeline.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-share-tech text-mech-cyan uppercase tracking-wider">Project Description *</label>
          <textarea
            {...register("description")}
            rows={5}
            className="w-full bg-mech-panel/80 border border-mech-silver/20 px-4 py-3 text-white focus:outline-none focus:border-mech-cyan transition-colors resize-y"
            placeholder="Describe the goals, deliverables, and current state..."
          />
          {errors.description && <p className="text-mech-rose text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-share-tech text-mech-cyan uppercase tracking-wider">Attachment (Optional)</label>
          <div className="relative border-2 border-dashed border-mech-silver/20 hover:border-mech-cyan/50 transition-colors p-6 flex flex-col items-center justify-center bg-mech-panel/30">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg,.zip"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isSubmitting}
            />
            <UploadCloud className="w-8 h-8 text-mech-silver mb-2" />
            <span className="text-sm text-mech-silver text-center">
              {file ? (
                <span className="text-mech-cyan">{file.name}</span>
              ) : (
                "Drag & drop or click to upload (PDF, PNG, JPG, ZIP)"
              )}
            </span>
            <span className="text-xs text-mech-silver/50 mt-1">Max 10MB</span>
          </div>
        </div>

        {TURNSTILE_SITE_KEY && (
          <div className="flex justify-center">
            <Turnstile
              ref={turnstileRef}
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={(token) => setTurnstileToken(token)}
              onExpire={() => setTurnstileToken(null)}
              options={{ theme: "dark", size: "normal" }}
            />
          </div>
        )}

        {errorMessage && (
          <div className="p-4 bg-mech-rose/10 border border-mech-rose/30 text-mech-rose text-sm">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || (!!TURNSTILE_SITE_KEY && !turnstileToken)}
          className="w-full py-4 font-orbitron uppercase tracking-widest text-black bg-mech-cyan hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Transmitting...
            </>
          ) : (
            "Initialize Engagement"
          )}
        </button>
      </form>
    </MechPanel>
  );
}
