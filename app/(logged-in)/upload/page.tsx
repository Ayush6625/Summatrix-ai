import BgGradient from "@/components/common/bg-gradient";
import UploadForm from "@/components/Upload/upload-form";
import UploadHeader from "@/components/Upload/upload-header";
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "@/app/api/uploadthing/core";



export default function UploadPage() {
  return (
    <section className="min-h-screen">
      <BgGradient />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
        <UploadHeader />
        <UploadForm />
        </div>
      </div>
    </section>
  );
}
