import type { Dispatch, FC, SetStateAction } from "react";

import type { ImageFile, AnalysisResponse } from "@/types";

interface SuggestedQueriesProps {
  images: ImageFile[];
  responses: AnalysisResponse[];
  setQuery: Dispatch<SetStateAction<string>>;
}

const queriesExamples = [
  "Are there any visible defects or issues?",
  "Is this image of a used product or new?",
  "How many items are shown in this image?",
  "Does this image follow our brand guidelines?",
  "Is the product presentation consistent?",
  "What quality improvements can be made?",
];

export const SuggestedQueries: FC<SuggestedQueriesProps> = ({
  images,
  responses,
  setQuery,
}) => {
  return (
    <>
      {images.length > 0 && responses.length === 0 && (
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">
            Quick Query Examples:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {queriesExamples.map((example) => (
              <button
                key={example}
                onClick={() => setQuery(example)}
                className="text-left p-2 text-sm text-blue-700 hover:bg-blue-100 rounded transition-colors"
              >
                "{example}"
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
