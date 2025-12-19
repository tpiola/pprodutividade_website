import { describe, expect, it } from "vitest";

describe("Supabase Configuration", () => {
  it("should have valid SUPABASE_URL and SUPABASE_ANON_KEY", async () => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    expect(supabaseUrl).toBeDefined();
    expect(supabaseAnonKey).toBeDefined();
    expect(supabaseUrl).toMatch(/^https:\/\/.+\.supabase\.co$/);
    expect(supabaseAnonKey!.length).toBeGreaterThan(30); // Supabase anon keys têm pelo menos 30 caracteres

    // Testar conexão básica com a API do Supabase
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        apikey: supabaseAnonKey!,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    });

    expect(response.status).toBeLessThan(500); // Qualquer status < 500 indica que as credenciais são válidas
  });
});
