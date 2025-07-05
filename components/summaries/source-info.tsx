'use client'; 
import { ExternalLink, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DownloadSummaryButton } from "@/components/summaries/download-summary-button";




export function SourceInfo({
  fileName,
  orignalFileUrl,
  createdAt,
  title,
  summaryText }: { 
    fileName: string,
    orignalFileUrl:string
    createdAt:string  
    title:string
    summaryText:string
   }) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
  <div className="flex items-center justify-center gap-2">
    <FileText className="h-4 w-4 text-rose-400" />
    <span>Source: {fileName}</span>
  </div>
  <div className="flex gap-2">
    <Button
      variant="ghost"
      size="sm"
      className="h-8 px-3 text-rose-600 hover:text-rose-700 hover:bg-rose-50 relative"
      asChild
    >
      <a href={orignalFileUrl} target="blank" rel="noopener noreferrer">
        <ExternalLink className="h-4 w-4 mr-1" />
        View Original
      </a>
    </Button>
    <DownloadSummaryButton 
        title={title}
        summaryText={summaryText}
        fileName={fileName}
        createdAt={createdAt}
    />
  </div>
</div>
  ) 
}
