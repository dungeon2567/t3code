import type { EnvironmentId } from "@t3tools/contracts";
import { useState } from "react";

import { promptEnhancer } from "~/state/promptEnhancer";
import { useAtomCommand } from "~/state/use-atom-command";

export interface PromptPlan {
  /** The draft the plan was written from; revisions keep it. */
  readonly source: string;
  readonly plan: string;
}

export function usePromptPlan({
  environmentId,
  cwd,
}: {
  readonly environmentId: EnvironmentId;
  readonly cwd: string | null;
}) {
  const enhance = useAtomCommand(promptEnhancer.enhance, { reportFailure: false });
  const [plan, setPlan] = useState<PromptPlan | null>(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (
    source: string,
    revision?: { readonly previousPlan: string; readonly feedback: string },
  ) => {
    if (cwd === null || running) return;
    setRunning(true);
    setError(null);
    const result = await enhance({
      environmentId,
      input: { cwd, prompt: source, ...revision },
    });
    setRunning(false);
    if (result._tag === "Success") {
      setPlan({ source, plan: result.value.prompt });
      return;
    }
    setError("Could not write a plan. Check that Claude is enabled and signed in.");
  };

  return {
    plan,
    running,
    error,
    start: (draft: string) => run(draft),
    requestChanges: (feedback: string) =>
      plan === null ? undefined : run(plan.source, { previousPlan: plan.plan, feedback }),
    discard: () => setPlan(null),
  };
}
