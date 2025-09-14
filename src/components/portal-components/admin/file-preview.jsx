"use client"

import { X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FilePreview({ file, onRemove }) {
  const isImage = file.type.startsWith("image/")
  const fileUrl = URL.createObjectURL(file)

  return (
    <div className="relative group border border-border rounded-lg p-3 bg-card">
      <div className="flex items-start space-x-3">
        {isImage ? (
          <div className="flex-shrink-0">
            <img src={fileUrl || "/placeholder.svg"} alt={file.name} className="w-16 h-16 object-cover rounded-md" />
          </div>
        ) : (
          <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-md flex items-center justify-center">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
          <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
