// utils/api.ts

import { isStringObject } from "util/types";

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

interface Parameters {
  [key: `@${string}`]: string;
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
  parameters: Parameters = {},
  hasDataTable: boolean = true
): Promise<StoredProcedureResponse> {
  // const url = process.env.NEXT_PUBLIC_API_BASE_URL
  //   ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ExecuteTSql/ExecuteStoredProcedure`
  //   : "https://localhost:7180/api/ExecuteSqlCommand/ExecuteStoredProcedureWithDebugger";
  const url = "https://pool.techa.me/api/ExecuteTSql/ExecuteStoredProcedure";

  const body: any = {
    ProcedureName: procedureName,
    ProjectId: 1010,
    HasDataTable: true,
  };

  if (Object.keys(parameters).length > 0) {
    // Create a new parameters object with properly formatted keys
    const formattedParams: Record<string, string> = {};
    for (const [key, value] of Object.entries(parameters)) {
      // Ensure key starts with @ and is properly quoted
      const formattedKey = key.startsWith("@") ? key : `@${key}`;
      formattedParams[formattedKey] = value.toString();
    }
    body.Parameters = formattedParams;
  }

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
