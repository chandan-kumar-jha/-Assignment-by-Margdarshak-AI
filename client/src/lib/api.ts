// Base backend URL

// Local: NEXT_PUBLIC_API_URL=http://localhost:5000
// Production: NEXT_PUBLIC_API_URL=https://your-backend.onrender.com

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

const BASE_URL = `${API_URL}/api/roadmaps`;

export interface Roadmap {
  _id: string;
  targetRole: string;
  currentSkills: string[];
  experienceLevel:
    | "beginner"
    | "intermediate"
    | "advanced";
  roadmap: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GenerateInput {
  targetRole: string;
  currentSkills: string[];
  experienceLevel:
    | "beginner"
    | "intermediate"
    | "advanced";
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

  // Check response type before parsing JSON
  const contentType =
    response.headers.get("content-type");

  if (
    !contentType ||
    !contentType.includes(
      "application/json"
    )
  ) {
    const text = await response.text();

    throw new Error(
      `Expected JSON but received: ${text.slice(
        0,
        100
      )}`
    );
  }

  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      json.error || "Request failed"
    );
  }

  return json.data as T;
}

export const api = {
  // Generate roadmap
  generate(
    input: GenerateInput
  ): Promise<Roadmap> {
    return apiFetch<Roadmap>(
      `${BASE_URL}/generate`,
      {
        method: "POST",
        body: JSON.stringify(input),
      }
    );
  },

  // Get all roadmaps
  getAll(): Promise<Roadmap[]> {
    return apiFetch<Roadmap>(BASE_URL);
  },

  // Get roadmap by ID
  getOne(id: string): Promise<Roadmap> {
    return apiFetch<Roadmap>(
      `${BASE_URL}/${id}`
    );
  },

  // Delete roadmap
  async delete(
    id: string
  ): Promise<{ success: boolean }> {
    await apiFetch(
      `${BASE_URL}/${id}`,
      {
        method: "DELETE",
      }
    );

    return { success: true };
  },
};