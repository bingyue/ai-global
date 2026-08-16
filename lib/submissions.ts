import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type SubmissionTable = "service_leads" | "newsletter_subscribers" | "report_downloads" | "event_registrations" | "content_submissions" | "partner_applications" | "community_topics";
export type SubmissionRecord = Record<string, string | number | boolean | null>;

declare global {
  var aiGlobalMockSubmissions: Partial<Record<SubmissionTable, SubmissionRecord[]>> | undefined;
}

const mockStore = globalThis.aiGlobalMockSubmissions ?? {};
if (process.env.NODE_ENV !== "production") globalThis.aiGlobalMockSubmissions = mockStore;

export const isSupabaseConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
export const isMockSubmissionMode = process.env.NODE_ENV !== "production" || process.env.ALLOW_MOCK_SUBMISSIONS === "true";

export class SubmissionUnavailableError extends Error {
  constructor() {
    super("Production submission storage is not configured");
    this.name = "SubmissionUnavailableError";
  }
}

let serviceClient: SupabaseClient | null = null;

export async function saveSubmission(table: SubmissionTable, payload: SubmissionRecord) {
  const record = { ...payload, id: crypto.randomUUID(), created_at: new Date().toISOString() };
  if (isSupabaseConfigured) {
    serviceClient ??= createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { autoRefreshToken: false, persistSession: false } });
    const query = table === "newsletter_subscribers"
      ? serviceClient.from(table).upsert(record, { onConflict: "email" })
      : serviceClient.from(table).insert(record);
    const { data, error } = await query.select("id").single();
    if (error) throw new Error(`Supabase insert failed: ${error.message}`);
    return { id: String(data.id), mode: "supabase" as const };
  }
  if (!isMockSubmissionMode) throw new SubmissionUnavailableError();
  mockStore[table] = [...(mockStore[table] ?? []), record];
  return { id: String(record.id), mode: "mock" as const };
}

export function getMockSubmissionCounts() {
  return Object.fromEntries(Object.entries(mockStore).map(([key, value]) => [key, value?.length ?? 0]));
}
