import {
  useCallback,
  useState,
  type DragEvent,
  type ChangeEvent,
  type FC,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Trash2, Upload } from "lucide-react";

import type { ImageFile } from "@/types";

interface UploadZoneProps {
  images: ImageFile[];
  setErrorMessage: Dispatch<SetStateAction<string>>;
  setImages: Dispatch<SetStateAction<ImageFile[]>>;
}

export const UploadZone: FC<UploadZoneProps> = ({
  images,
  setErrorMessage,
  setImages,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const processFiles = useCallback(
    (files: File[]) => {
      setErrorMessage("");

      if (images.length + files.length > 4) {
        setErrorMessage(
          `Maximum 4 images allowed. Currently selected ${files.length}, already uploaded ${images.length}. Please remove ${images.length + files.length - 4} images.`,
        );
        return;
      }

      const validFiles: File[] = [];

      for (const file of files) {
        if (!file.type.startsWith("image/")) {
          setErrorMessage(
            `"${file.name}" is not a valid image file. Only image files are supported.`,
          );

          continue;
        }

        if (file.size > 10 * 1024 * 1024) {
          setErrorMessage(
            `"${file.name}" is too large. Maximum file size is 10MB.`,
          );

          continue;
        }

        validFiles.push(file);
      }

      validFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e?.target?.result) {
            setImages((prev) => [
              ...prev,
              {
                file,
                url: e?.target?.result as string,
                name: file.name,
                id: Date.now() + Math.random(),
              },
            ]);
          }
        };

        reader.readAsDataURL(file);
      });
    },
    [images.length],
  );

  const handleFileInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);

      processFiles(files);
      event.target.value = "";
    },
    [processFiles],
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);

      processFiles(files);
    },
    [processFiles],
  );

  const removeImage = useCallback((imageId: number) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
    setErrorMessage("");
  }, []);

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">
        Upload Product Images
      </h2>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? "border-blue-500 bg-blue-50"
            : images.length >= 4
              ? "border-gray-200 bg-gray-50 cursor-not-allowed"
              : "border-gray-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() =>
          images.length < 4 && document.getElementById("file-input")?.click()
        }
      >
        <Upload
          className={`h-12 w-12 mx-auto mb-4 ${
            images.length >= 4 ? "text-gray-300" : "text-gray-400"
          }`}
        />
        {images.length >= 4 ? (
          <div>
            <p className="text-lg font-medium text-gray-500 mb-2">
              Maximum images reached
            </p>
            <p className="text-sm text-gray-400">
              Remove some images to upload more
            </p>
          </div>
        ) : (
          <div>
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drop images here or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Upload up to {4 - images.length} more images • JPG, PNG, WebP •
              Max 10MB each
            </p>
          </div>
        )}
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
          disabled={images.length >= 4}
        />
      </div>
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
              />
              <button
                onClick={() => removeImage(image.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                title="Remove image"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <p
                className="text-xs text-gray-600 mt-1 truncate"
                title={image.name}
              >
                {image.name}
              </p>
            </div>
          ))}
        </div>
      )}
      <p className="text-sm text-gray-600 mt-3">
        {images.length}/4 images uploaded
      </p>
    </div>
  );
};
