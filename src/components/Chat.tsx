import { type FC, useState } from "react";

import {
  UploadZone,
  SuggestedQueries,
  Error,
  Response,
  InputArea,
} from "@/components";

import type { AnalysisResponse, ImageFile } from "@/types";

export const Chat: FC = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<ImageFile[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [response, setResponse] = useState<AnalysisResponse[]>([]);

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-[calc(100vh-64px)]">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="text-white bg-blue-500 p-6 rounded-t-lg">
          <h1 className="text-2xl font-bold gap-2 text-center">
            AI Product Image Quality Check by Daniil Bergauzen(Challenge from
            Vercept)
          </h1>
          <p className="text-blue-100 mt-2 text-center">
            Upload up to 4 product images and ask questions to get instant
            AI-powered quality assessments
          </p>
        </div>
        <div className="p-6">
          <UploadZone
            images={images}
            setErrorMessage={setErrorMessage}
            setImages={setImages}
          />
          <InputArea
            query={query}
            setQuery={setQuery}
            images={images}
            setErrorMessage={setErrorMessage}
            setResponse={setResponse}
          />
          <Error errorMessage={errorMessage} />
          <Response response={response} setResponse={setResponse} />
          <SuggestedQueries
            images={images}
            responses={response}
            setQuery={setQuery}
          />
        </div>
      </div>
    </div>
  );
};
