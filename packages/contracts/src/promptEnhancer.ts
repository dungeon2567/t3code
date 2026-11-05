import * as Schema from "effect/Schema";

export const EnhancePromptInput = Schema.Struct({
  cwd: Schema.String,
  prompt: Schema.String,
  previousPlan: Schema.optionalKey(Schema.String),
  feedback: Schema.optionalKey(Schema.String),
});
export type EnhancePromptInput = typeof EnhancePromptInput.Type;

export const EnhancePromptResult = Schema.Struct({
  prompt: Schema.String,
});
export type EnhancePromptResult = typeof EnhancePromptResult.Type;
