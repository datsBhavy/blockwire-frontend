import { Component, createEffect, createResource, createSignal, onMount } from "solid-js";
import QuillEditor from "./inquiryForm/QuillEditor";
import { createTag, fetchAllTags, uploadImageToS3 } from "../utils/fetcher";
import CustomInput from "./CustomInput";
import FileInput from "./FileInput";
import TagInput from "./TagInput";
import { IBlog, ITag } from "../types";
import { baseURL } from "../constants/constants";
import { useAppContext } from "../context/AppContext";

interface CreateBlogFormProps {
  onSubmit?: () => void;
  blog?: IBlog
}

const CreateBlogForm: Component<CreateBlogFormProps> = (props) => {
  const [title, setTitle] = createSignal("");
  const [content, setContent] = createSignal("");
  const [coverImage, setCoverImage] = createSignal(null);
  const [loading, setLoading] = createSignal(false);
  const [message, setMessage] = createSignal("");
  const [tags, {refetch}] = createResource(fetchAllTags)
  const [selectedTags, setSelectedTags] = createSignal<ITag[]>([])
  const {user} = useAppContext()

  createEffect(() => {
    console.log(tags())
  })

  const handleImageChange = (e) => {
    setCoverImage(e.target.files[0]); // Set the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // If uploading images directly to S3, upload here before submitting the form
    let imageUrl = "";
    if (coverImage()) {
      const formData = new FormData();
      formData.append("file", coverImage());
      formData.append("title", title())
      formData.append("content", content())
      formData.append('author', user()?._id)
      // formData.append("upload_preset", "your-upload-preset"); // Example for a Cloudinary preset, if needed

      try {
        const index = Date.now();
        const renamedFile = new File(
          [coverImage()],
          `blog_image_${index}.${coverImage().name.split(".").pop()}`, // Rename with the original file extension
          { type: coverImage().type }
        );

        const s3Url = await uploadImageToS3(renamedFile);

        console.log(s3Url)

        const uploadResponse = await fetch(s3Url, {
          method: "PUT",
            mode: 'cors',
          body: formData,
        });

        const uploadData = await uploadResponse.json();
        if (uploadResponse.ok) {
          imageUrl = uploadData.url; // Assuming the S3/Cloud service returns the uploaded URL
        } else {
          throw new Error("Image upload failed.");
        }
      } catch (error) {
        console.error("Image upload error:", error);
        setMessage("Error uploading cover image.");
        setLoading(false);
        return;
      }
    }

    // Submit the blog content along with the image URL
    const endpoint = props.blog ? `${baseURL}/api/blogs/edit/${props.blog?._id}` : `${baseURL}/api/blogs/create`
    try {
      const response = await fetch(endpoint, {
        method: props.blog ? 'PUT' : "POST",
        headers: {
          "Content-Type": "application/json",
          // Include credentials for session-based auth
          credentials: "include",
        },
        body: JSON.stringify({
          title: title(),
          content: content(),
          author: user()?._id,
          coverImage: imageUrl, // Include the image URL
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Blog created successfully!");
        setTitle("");
        setContent("");
        setCoverImage(null);
        props.onSubmit?.();
      } else {
        setMessage(data.message || "Error creating blog.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while creating the blog.");
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    if (props.blog) {
      console.log(props.blog)
      setTitle(props.blog?.title)
      setCoverImage(props.blog?.coverImage)
      setContent(props.blog?.content)
    }
  })

  return (
    <div>
      <h1 class="mb-5">Create Blog</h1>
      <form onSubmit={handleSubmit}>
        <CustomInput name="title" value={title()} onChange={(e: InputEvent) => setTitle(e.target.value)} label="Blog Title" />
        <TagInput
  tags={tags() as ITag[]}
  selectedTags={selectedTags()}
  onTagChange={(tags) => {
    setSelectedTags(tags);
  }}
  onTagAdd={(text) =>
    createTag(text).then((data) => {
      setSelectedTags([...selectedTags(), data.tag]);
    })
  }
/>
        <div class="mb-5">
        <FileInput
        name="coverImage"
        label="Cover Image"
        onFileChange={handleImageChange}
        accept="image/*"
        required={false}
      />
        </div>



        
          <div class="mb-5">
          <QuillEditor value={content()} onChange={setContent} />
          </div>
      
       
        <button class="submit-button" type="submit" disabled={loading()}>
          {loading() ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message() && <p>{message()}</p>}
    </div>
  );
};

export default CreateBlogForm;