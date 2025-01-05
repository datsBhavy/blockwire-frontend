import { createEffect, createResource, onMount } from "solid-js";
import { css } from "solid-styled-components";
import "quill/dist/quill.snow.css";
import { uploadImageToS3 } from "../../utils/fetcher";

let Quill; // Declare Quill globally

interface QuillEditorProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const QuillEditor = (props: QuillEditorProps) => {
  let editorRef: HTMLDivElement; // Reference for the editor container

  const [quillEditor] = createResource(async () => {
    const { default: ImportedQuill } = await import("quill");
    Quill = ImportedQuill;

    // Initialize Quill editor
    const quill = new Quill(editorRef, {
      theme: "snow",
      placeholder: props.placeholder || "Type something...",
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["link", "image"],
          ],
          handlers: {
            image: async function () {
              const input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");
              input.click();

              input.onchange = async () => {
                const file = input.files?.[0];
                if (file) {
                  // Generate a unique index or timestamp for the file name
                  const index = Date.now();
                  const renamedFile = new File(
                    [file],
                    `blog_image_${index}.${file.name.split(".").pop()}`, // Rename with the original file extension
                    { type: file.type }
                  );

                  // Upload the renamed file to S3
                  const s3Url = await uploadImageToS3(renamedFile);

                  if (s3Url) {
                    // Insert the image into Quill editor
                    const range = quill.getSelection();
                    quill.insertEmbed(range?.index as number, "image", s3Url);
                  }
                }
              };
            },
          },
        },
      },
    });

    // Set initial value if props.value is provided
    if (props.value) {
      quill.root.innerHTML = props.value;
    } 

    // Handle changes
    quill.on("text-change", () => {
      if (props.onChange) {
        props.onChange(quill.root.innerHTML);
      }
    });

    return quill
  })

  return (
    <div
      ref={editorRef}
      class={css`
        min-height: 150px;
        border: 1px solid #ddd;
        border-radius: 0px;
      `}
    />
  );
};

export default QuillEditor;