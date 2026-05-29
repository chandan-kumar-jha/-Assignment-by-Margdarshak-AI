const BASE_URL = "/api/roadmaps";

export interface Roadmap {
  _id: string;
  targetRole: string;
  currentSkills: string[];
  experienceLevel: "beginner" | "intermediate" | "advanced";
  roadmap: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GenerateInput {
  targetRole: string;
  currentSkills: string[];
  experienceLevel: "beginner" | "intermediate" | "advanced";
}

async function apiFetch<T>(
  url: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || "Request failed");
  }

  return json.data as T;
}

export const api = {
  generate(input: GenerateInput): Promise<Roadmap> {
    return apiFetch<Roadmap>(`${BASE_URL}/generate`, {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  getAll(): Promise<Roadmap[]> {
    return apiFetch<Roadmap[]>(BASE_URL);
  },

  getOne(id: string): Promise<Roadmap> {
    return apiFetch<Roadmap>(`${BASE_URL}/${id}`);
  },

  async delete(
    id: string
  ): Promise<{ success: boolean }> {
    await apiFetch<unknown>(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    return { success: true };
  },
};