import z from "zod";
import { Integrations } from "@/lib/webhooks";

export const verifyIntegration = (integration: unknown) => {
  const result = z.nativeEnum(Integrations).safeParse(integration);
  if (!result.success) {
    throw new Error("Wrong integration!", result.error);
  }
  return result.data;
};

export const verifyBody = (body: unknown) => {
  const result = z.object({ text: z.string() }).safeParse(body);
  if (!result.success) {
    throw new Error("Wrong body!", result.error);
  }
  return result.data;
};
