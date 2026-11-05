import { createPromptEnhancerAtoms } from "@t3tools/client-runtime/state/promptEnhancer";

import { connectionAtomRuntime } from "../connection/runtime";

export const promptEnhancer = createPromptEnhancerAtoms(connectionAtomRuntime);
