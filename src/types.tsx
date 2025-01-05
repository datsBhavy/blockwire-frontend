export interface ITag {
    text: string
    id: string
}
export interface IInfluencer {
    id?: string; // Optional ID (assigned by MongoDB)
    name: string; // Name of the influencer
    description: string; // Short bio or description
    profileImage?: string; // Optional URL for profile image
    instagramHandle?: string; // Optional Instagram handle
    xHandle?: string; // Optional Twitter/X handle
    socialLinks?: Record<string, string>; // Optional map of platform names to URLs
    createdAt?: string; // Optional timestamp for when the record was created
    updatedAt?: string; // Optional timestamp for when the record was last updated
    tags?: ITag[]; // Optional list of tags
  }

  export interface IBlog {
    title: string;
    content: string; // Stores the HTML content from the Quill editor
    coverImage?: string; // Optional URL or path to the cover image
    author?: string | null; // Reference to the User schema
    tags: string[]; // Array of strings to store tags
    createdAt: Date; // Timestamp for when the blog was created
    updatedAt: Date; // Timestamp for when the blog was last updated
  }