import { SparklesIcon } from "lucide-react";
import { useState } from "react";

import type { PromptPlan } from "./usePromptPlan";
import { Button } from "../ui/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "../ui/tooltip";

export function ComposerEnhancePromptButton({
  disabled,
  running,
  onStart,
}: {
  readonly disabled: boolean;
  readonly running: boolean;
  readonly onStart: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            disabled={disabled || running}
            onPointerDown={(event) => event.preventDefault()}
            onClick={onStart}
            aria-label="Write a plan from this prompt"
          />
        }
      >
        <SparklesIcon className={running ? "animate-pulse" : undefined} />
      </TooltipTrigger>
      <TooltipPopup>Write a plan (ASD-STE100)</TooltipPopup>
    </Tooltip>
  );
}

export function ComposerPromptPlanPanel({
  plan,
  running,
  error,
  onApprove,
  onRequestChanges,
  onDiscard,
}: {
  readonly plan: PromptPlan | null;
  readonly running: boolean;
  readonly error: string | null;
  readonly onApprove: (text: string) => void;
  readonly onRequestChanges: (feedback: string) => void;
  readonly onDiscard: () => void;
}) {
  const [requesting, setRequesting] = useState(false);
  const [feedback, setFeedback] = useState("");

  if (plan === null && error === null) return null;

  return (
    <div className="mx-2 mt-2 rounded-lg border border-border bg-muted/40 p-3 text-sm">
      {error !== null ? <p className="text-destructive">{error}</p> : null}
      {plan !== null ? (
        <>
          <p className="mb-2 font-medium">Proposed plan</p>
          <pre className="max-h-64 overflow-auto whitespace-pre-wrap font-sans">{plan.plan}</pre>
          {requesting ? (
            <form
              className="mt-2 flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                const text = feedback.trim();
                if (text.length === 0 || running) return;
                setRequesting(false);
                setFeedback("");
                onRequestChanges(text);
              }}
            >
              <input
                autoFocus
                className="min-w-0 flex-1 rounded-md border border-border bg-background px-2 py-1"
                placeholder="What should change?"
                value={feedback}
                onChange={(event) => setFeedback(event.currentTarget.value)}
              />
              <Button type="submit" size="sm" disabled={running}>
                Send
              </Button>
            </form>
          ) : (
            <div className="mt-2 flex flex-wrap gap-2">
              <Button size="sm" disabled={running} onClick={() => onApprove(plan.plan)}>
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={running}
                onClick={() => setRequesting(true)}
              >
                Request changes
              </Button>
              <Button size="sm" variant="ghost" disabled={running} onClick={onDiscard}>
                Discard
              </Button>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
