import { WS_METHODS } from "@t3tools/contracts";
import type { Atom } from "effect/reactivity";

import type { EnvironmentRegistry } from "../connection/registry.ts";
import { createEnvironmentRpcCommand } from "./runtime.ts";

export function createPromptEnhancerAtoms<R, E>(
  runtime: Atom.AtomRuntime<EnvironmentRegistry | R, E>,
) {
  return {
    enhance: createEnvironmentRpcCommand(runtime, {
      label: "environment-data:text-generation:enhance-prompt",
      tag: WS_METHODS.textGenerationEnhancePrompt,
    }),
  };
}
