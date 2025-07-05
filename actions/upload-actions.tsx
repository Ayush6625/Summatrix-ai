'use server';

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminieai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAi } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PdfSummaryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generatePDFSummary(uploadResponse: [{
  serverData: {
    userId: string;
    file: {
      url: string;
      name: string;
    };
  };
}]) {
  if (!uploadResponse || !uploadResponse.length) {
    return {
      success: false,
      message: 'File upload failed',
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: 'No file URL found',
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log({ pdfText });

    let summary: string | null = null;

    try {
      summary = await generateSummaryFromGemini(pdfText);
      console.log({ summary });
    } catch (error) {
      console.error("Gemini failed, falling back to OpenAI:", error);

      try {
        summary = await generateSummaryFromOpenAi(pdfText);
        console.log({ summary });
      } catch (fallbackError) {
        console.error("OpenAI also failed:", fallbackError);
        return {
          success: false,
          message: 'Failed to generate summary with available AI providers',
          data: null,
        };
      }
    }

    if (!summary) {
      return {
        success: false,
        message: 'Failed to generate summary',
        data: null,
      };
    }

    const formattedTitle = formatFileNameAsTitle(fileName);

    return {
      success: true,
      message: 'Summary generated successfully',
      data: {
        title: formattedTitle,
        summary,
      },
    };

  } catch (err) {
    console.error("Unexpected error:", err);
    return {
      success: false,
      message: 'An error occurred while processing the file',
      data: null,
    };
  }
}

async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  try {
    const sql = await getDbConnection();
    const [savedSummary]=await sql`
      INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        title,
        file_name
    ) VALUES (
      ${userId},
      ${fileUrl},
      ${summary},
      ${title},
      ${fileName}
    )RETURNING id, summary_text;`
    return savedSummary;
  } catch (error) {
    console.error('❌ Error saving PDF summary', error);
    throw error;
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  let savedSummary: any;

  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: 'Failed to save PDF summary, please try again...',
      };
    }

   

  } catch (error) {
    console.error("❌ storePdfSummaryAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error saving PDF summary',
    };
  }
  //revalidate our cashe
  revalidatePath(`/summaries/${savedSummary.id}`);


   return {
      success: true,
      message: 'PDF summary saved successfully',
      data:{
        id:savedSummary.id,
      }
    };
}
