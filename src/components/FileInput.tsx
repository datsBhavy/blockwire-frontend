import { Style } from "@solidjs/meta";
import { createSignal, JSX } from "solid-js";
import { Dark, Light } from "../constants/styles";

interface FileInputProps {
  label: string;
  onFileChange: (e: Event | DragEvent | null) => void;
  accept?: string;
  required?: boolean;
    name?: string;
}

const FileInput: (props: FileInputProps) => JSX.Element = ({
  label,
  onFileChange,
  accept = "image/*",
  required = false,
  name,
}) => {
  const [fileName, setFileName] = createSignal<string | null>(null);
  const [isDragging, setIsDragging] = createSignal(false);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      onFileChange(e);
    }
  };

  const handleChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      setFileName(file.name);
      onFileChange(e);
    }
  };

  return (
   <>
    <Style>{`
        .file-input {
  border: 2px dashed #cccccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: border-color 0.3s ease;
  cursor: pointer;
}

.file-input.dragging {
  border-color: #007bff;
}

.file-input-label {
  display: block;
  cursor: pointer;
  color: #333;
  font-weight: bold;
  font-size: 16px;
}

.file-input-hidden {
  display: none;
}

.file-input-display {
  padding: 10px;
  background-color: ${Dark};
  color: ${Light};
  border-radius: 8px;
  margin-top: 10px;
}

.file-input-placeholder {
  color: #aaaaaa;
  font-size: 14px;
}

.file-input-display span {
  font-size: 14px;
  color: #007bff;
}
  `}</Style>
    <div
      class={`file-input ${isDragging() ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label class="file-input-label">
        {label}
        <input
            name={name}
          type="file"
          accept={accept}
          required={required}
          class="file-input-hidden"
          onChange={handleChange}
        />
        <div class="file-input-display">
          {fileName() ? (
            <span>{fileName()}</span>
          ) : (
            <span class="file-input-placeholder">
              Drag & drop a file here, or click to select
            </span>
          )}
        </div>
      </label>
    </div>
    </>
  );
};

export default FileInput;