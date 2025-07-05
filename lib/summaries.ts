// src/lib/summaries.ts (or wherever these functions are)

import { getDbConnection } from "./db";
import { Summary } from "@/components/summaries/content-section";

export async function getSummaries(userId: string): Promise<Summary[]> {
  const sql = await getDbConnection();
  // We're casting the result of the SQL query to Summary[]
  // This tells TypeScript that the shape of the data from the DB *will* conform to Summary
  const summaries = await sql<Summary[]>`SELECT * FROM pdf_summaries where user_id = ${userId} ORDER By created_at DESC`;
  return summaries;
}

export async function getSummaryById(id: string): Promise<Summary | null> {
  try {
    const sql = await getDbConnection();
    // We expect a single Summary object here, so we cast the array result to Summary
    const [summary] = await sql<[Summary]>`
      SELECT
        id,
        user_id,
        title,
        original_file_url,
        summary_text,
        status,
        created_at,
        updated_at,
        file_name,
        LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 as word_count
      FROM
        pdf_summaries
      WHERE id = ${id}`;

    return summary || null; // Ensure it explicitly returns null if not found
  } catch (err) {
    console.error('Error fetching summary by id', err);
    return null;
  }
}