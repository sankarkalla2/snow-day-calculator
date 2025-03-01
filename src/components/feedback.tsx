"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Modal } from "./modal-provider";
import { MessageSquare } from "lucide-react";
import sendMail from "@/lib/sendmail";

export default function FeedbackForm() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !feedback) {
      toast.error("Error", {
        description: "Please fill in all fields",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Here you would typically send the feedback to your backend
      // For now, we'll just simulate an API call
      await sendMail(email, feedback);

      toast.success("Thank you!", {
        description: "Your feedback has been submitted successfully.",
      });

      // Reset form
      setEmail("");
      setFeedback("");
    } catch (error) {
      console.log(error);
      toast.error("Error", {
        description: "Failed to submit feedback. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title="Send us Feedback"
      description="We'd love to hear your thoughts on how we can improve"
      trigger={
        <Button
          variant="outline"
          className="h-auto py-4"
          onClick={() => (window.location.href = "#feedback")}
        >
          <div className="flex flex-col items-center gap-1">
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs">Feedback</span>
          </div>
        </Button>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Feedback</Label>
          <Textarea
            required
            rows={2}
            placeholder="share you experience."
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              Submitting...
            </>
          ) : (
            "Submit Feedback"
          )}
        </Button>
      </form>
    </Modal>
  );
}
