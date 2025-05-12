// utils/api.ts

export interface StoredProcedureParameter {
  Name: string;
  Type: string;
  Value: string;
}

export interface StoredProcedureResponse {
  IsSuccess: boolean;
  Message?: string;
  Data: {
    Dataset: any[];
    [key: string]: any;
  };
  [key: string]: any;
}

/**
 * Executes a stored procedure on the .NET backend and returns the parsed JSON response.
 * @param procedureName - The name of the stored procedure to execute.
 * @param parameters - Optional array of parameters.
 * @returns The JSON-decoded response object with a normalized Dataset array.
 * @throws Throws an error if network request fails or response is not OK.
 */
export async function SP_fetch(
  procedureName: string,
  parameters: StoredProcedureParameter[] = []
): Promise<StoredProcedureResponse> {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ExecuteSqlCommand/ExecuteStoredProcedureWithDebugger`
    : "https://localhost:7180/api/ExecuteSqlCommand/ExecuteStoredProcedureWithDebugger";

  const body: any = { ProcedureName: procedureName };
  if (parameters.length > 0) body.Parameters = parameters;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`HTTP ${response.status} - ${text}`);
  }

  const data = await response.json();

  let ds = data?.Data?.Dataset;
  if (typeof ds === "string") {
    try {
      ds = JSON.parse(ds);
    } catch {
      ds = [];
    }
  }
  if (!Array.isArray(ds)) ds = [];

  return {
    ...data,
    Data: {
      ...data.Data,
      Dataset: ds,
    },
  };
}
