import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useCallback,
  useState,
} from "react";
import { Send } from "lucide-react";

import type { AnalysisResponse, ImageFile } from "@/types";
import { generateResponse } from "@/lib";

interface InputAreaProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  images: ImageFile[];
  setErrorMessage: Dispatch<SetStateAction<string>>;
  setResponse: Dispatch<SetStateAction<AnalysisResponse[]>>;
}

export const InputArea: FC<InputAreaProps> = ({
  query,
  setQuery,
  images,
  setErrorMessage,
  setResponse,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // Simulate AI analysis
  const analyzeImages = useCallback(async () => {
    if (images.length === 0) {
      setErrorMessage("Please upload at least one image.");

      return;
    }
    if (!query.trim()) {
      setErrorMessage("Please enter a question about your images.");

      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newResponse: AnalysisResponse[] = images.map((image) => ({
        imageId: image.id,
        imageName: image.name,
        imageUrl: image.url,
        query: query,
        response: generateResponse(image.name, query),
        timestamp: new Date().toLocaleTimeString(),
      }));

      setResponse((prev) => [...prev, ...newResponse]);
      setQuery("");
    } catch (err) {
      setErrorMessage(
        `Failed to analyze images. Please try again. Error: ${err}`,
      );
    } finally {
      setIsLoading(false);
    }
  }, [images, query, generateResponse]);

  const handleSubmit = () => {
    void analyzeImages();
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">
        Ask About Your Images
      </h2>
      <div className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          placeholder="e.g., Are there any visible defects? Is this a new or used product? How many items are shown?"
          className="text-gray-800 flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
          onKeyUp={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !images.length}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Analyzing...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Analyze Images
            </>
          )}
        </button>
      </div>
    </div>
  );
};
