import { Separator } from "@radix-ui/react-dropdown-menu"
import { FileText, ImageIcon, Download, Eye } from "lucide-react"

interface Document {
  name: string
  type: "pdf" | "image"
}

interface DocumentListProps {
  documents: Document[]
}

export function DocumentList({ documents }: DocumentListProps) {
  const getDocumentIcon = (type: string) => {
    if (type === "pdf")
      return <FileText className="h-4 w-4 text-muted-foreground" />
    if (type === "image")
      return <ImageIcon className="h-4 w-4 text-muted-foreground" />
    return null
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-row gap-2 justify-between text-xs font-medium text-primary-9 p-2">
        <div>NOME DO ARQUIVO</div>
        <div className="text-right">OPÇÕES</div>
      </div>
      <Separator className="my-3" />
      {documents.map((doc, index) => (
        <div key={index} className="flex items-center justify-between p-2">
          <div className="flex items-center">
            {getDocumentIcon(doc.type)}
            <span className="ml-2 text-sm">{doc.name}</span>
          </div>
          <div className="flex space-x-2">
            <button className="rounded-full p-1 hover:bg-muted">
              <Download className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="rounded-full p-1 hover:bg-muted">
              <Eye className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
