"use client";

import UploadFormInputs from "@/components/Upload/upload-form-inputs";
import { useUploadThing } from "@/utils/uploadthing";
import { z } from "zod";
import { toast } from "sonner";
import { generatePDFSummary, storePdfSummaryAction } from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ App Router

// Zod schema to validate PDF file
const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File size must be less than 20MB",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "File must be a PDF",
    }),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formKey, setFormKey] = useState(Date.now()); // ✅ To force form reset
  const router = useRouter();

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast.success("✅ Upload Successful", {
        description: "Your file has been uploaded.",
      });
    },
    onUploadError: (err) => {
      console.error("Upload error:", err);
      toast.error("❌ Upload Error", {
        description: err.message,
      });
    },
    onUploadBegin: () => {
      toast("📤 Uploading PDF...", {
        description: "We're starting the upload now.",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file");

      if (!(file instanceof File)) {
        toast.error("Invalid file", {
          description: "Please upload a valid PDF.",
        });
        return;
      }

      const validated = schema.safeParse({ file });
      if (!validated.success) {
        toast.error("Validation Error", {
          description:
            validated.error.flatten().fieldErrors.file?.[0] ?? "Invalid file",
        });
        return;
      }

      const resp = await startUpload([file]);

      if (!resp || resp.length === 0 || !resp[0].serverData?.file?.url) {
        toast.error("⚠️ Upload Failed", {
          description: "Try again with a different file.",
        });
        return;
      }

      const fileUrl = resp[0].serverData.file.url;

      toast("📄 Processing File", {
        description: "Hang tight! Our AI is analyzing your document!",
      });

      const result = await generatePDFSummary(resp);
      const { data = null } = result || {};

      if (data?.summary) {
        toast("📄 Saving PDF...", {
          description: "Saving your summary...",
        });

        const storeResult = await storePdfSummaryAction({
          summary: data.summary,
          fileUrl: fileUrl,
          title: data.title,
          fileName: file.name,
        });

        toast("✨ Summary Generated!", {
          description: "Your PDF has been successfully summarised and saved!✨",
        });

        formRef.current?.reset();
        setFormKey(Date.now()); // ✅ force re-render of form input
        router.push(`/summaries/${storeResult.data.id}`);
      } else {
        toast.error("❌ Summary not found", {
          description: "No summary was returned by the AI.",
        });
      }
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("❌ Unexpected Error", {
        description: "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto relative">
      <UploadFormInputs
        key={formKey} // ✅ Ensures file input resets visually
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
