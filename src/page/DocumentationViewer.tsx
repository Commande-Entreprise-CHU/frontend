import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import PageHeader from "../components/PageHeader";
import { FileText, ArrowLeft, AlertCircle } from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";

export default function DocumentationViewer() {
  const { fileName } = useParams<{ fileName: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoc = async () => {
      if (!fileName) return;
      
      try {
        setLoading(true);
        setError(null);
        // Security check - ensure we only access docs directory
        const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "");
        if (fileName !== safeName) {
            throw new Error("Invalid filename");
        }

        const response = await fetch(`/docs/${fileName}`);
        
        if (!response.ok) {
          throw new Error(`Impossible de charger le document (${response.status})`);
        }
        
        const text = await response.text();
        setContent(text);
      } catch (err: any) {
        console.error("Error loading documentation:", err);
        setError(err.message || "Erreur lors du chargement de la documentation");
      } finally {
        setLoading(false);
      }
    };

    fetchDoc();
  }, [fileName]);

  return (
    <div className="p-4 w-full max-w-5xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          icon={ArrowLeft} 
          onClick={() => navigate(-1)}
          className="mb-2"
        >
          Retour
        </Button>
        <PageHeader
          icon={FileText}
          title={fileName || "Documentation"}
          subtitle="Visualisation de la documentation"
        />
      </div>

      <Card className="min-h-[500px]">
        <div className="p-6">
          {loading ? (
             <div className="flex justify-center py-12">
               <span className="loading loading-spinner loading-lg text-primary"></span>
             </div>
          ) : error ? (
            <div className="alert alert-error">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          ) : (
            <div className="prose prose-slate max-w-none prose-headings:text-base-content prose-p:text-base-content/80 prose-strong:text-base-content prose-code:text-primary prose-code:bg-base-200 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-base-300 prose-pre:text-base-content prose-a:text-primary hover:prose-a:text-primary-focus">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeHighlight]}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
