import type { AnalysisResponse } from "@/types";
import type { Dispatch, FC, SetStateAction } from "react";
import { CheckCircle, X } from "lucide-react";

interface ResponseProps {
  response: AnalysisResponse[];
  setResponse: Dispatch<SetStateAction<AnalysisResponse[]>>;
}

export const Response: FC<ResponseProps> = ({ response, setResponse }) => {
  return (
    <>
      {response.length > 0 && (
        <div>
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              AI Analysis Results for uploaded images
            </h2>
            <button
              onClick={() => setResponse([])}
              className={
                "flex cursor-pointer text-gray-500 hover:text-gray-700"
              }
            >
              <X />
              Clear response
            </button>
          </div>
          <div className="space-y-6">
            {response.map((res, index) => (
              <div
                key={`${res.imageId}-${index}`}
                className="bg-gray-50 rounded-lg p-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={res.imageUrl}
                    alt={res.imageName}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-800">
                        {res.imageName}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {res.timestamp}
                      </span>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 mb-2">
                      <p className="text-sm text-blue-800 font-medium">
                        Query: "{res.query}"
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700 text-sm">{res.response}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
