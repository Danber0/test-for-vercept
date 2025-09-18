import type { FC } from "react";
import { AlertCircle } from "lucide-react";

interface ErrorProps {
  errorMessage: string;
}

export const Error: FC<ErrorProps> = ({ errorMessage }) => {
  return (
    <>
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-6 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700">{errorMessage}</p>
        </div>
      )}
    </>
  );
};
