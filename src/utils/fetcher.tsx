import { baseURL } from "../constants/constants";
import { IInfluencer, ITag } from "../types";

export async function testFetch() {
    return await fetch('/api')
}

const INFLUENCER_BASE_URL = `${baseURL}/api/influencers`;

export const fetchBlogs = async () => {
  try {
    const response = await fetch(`${baseURL}/api/blogs`, {
      method: "GET",
      credentials: "include", // Ensures cookies are sent with the request
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.blogs; // Return the blogs array
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const fetchBlogById = async (id: string) => {
  try {
    const response = await fetch(`${baseURL}/api/blogs/${id}`, {
      method: "GET",
      credentials: "include", // Ensures cookies are sent with the request
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.blog; // Return the blog object
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
};


export async function fetchAllInfluencers() {
  try {
    const response = await fetch(`${INFLUENCER_BASE_URL}`, {
      method: "GET",
      credentials: "include", // Ensures cookies are sent with the request
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch influencers.");
    }

    const data = await response.json();
    return data.influencers as IInfluencer[]; // Returns an array of influencers
  } catch (error) {
    console.error("Error fetching influencers:", error.message);
    throw error;
  }
}
export async function fetchAllTags() {
  try {
    const response = await fetch(`${INFLUENCER_BASE_URL}/tags`, {
      method: "GET",
      credentials: "include", // Ensures cookies are sent with the request
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tags.");
    }

    const data = await response.json();
    return data.tags as ITag[]; // Returns an array of influencers
  } catch (error) {
    console.error("Error fetching tags:", error.message);
    throw error;
  }
}

export const createTag = async (tagText: string) => {
  try {
    // Validate input
    if (!tagText || typeof tagText !== "string") {
      throw new Error("Tag text is required and must be a string.");
    }

    // Send a POST request to the backend
    const response = await fetch(`${INFLUENCER_BASE_URL}/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: tagText }),
    });

    // Handle response
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create tag.");
    }

    const data = await response.json();
    console.log(data)
    return data; // Contains the success message and created tag
  } catch (error) {
    console.error("Error creating tag:", error.message);
    throw error; // Re-throw error for further handling
  }
};

export async function fetchInfluencerById(id: string) {
  try {
    const response = await fetch(`${INFLUENCER_BASE_URL}/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Influencer not found.");
      } else {
        throw new Error("Failed to fetch influencer.");
      }
    }

    const data = await response.json();
    return data.influencer; // Returns the influencer object
  } catch (error) {
    console.error("Error fetching influencer by ID:", error.message);
    throw error;
  }
}
export async function createInfluencer(influencerData: IInfluencer) {
  try {
    const response = await fetch(`${INFLUENCER_BASE_URL}${influencerData?._id ? `/${influencerData?._id}` : ''}`, {
      method: influencerData?.id ? 'PUT' : "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(influencerData), // Pass the influencer data as JSON
    });

    if (!response.ok) {
      throw new Error("Failed to create influencer.");
    }

    const data = await response.json();
    return data.influencer; // Returns the newly created influencer
  } catch (error) {
    console.error("Error creating influencer:", error.message);
    throw error;
  }
}
export async function editInfluencer(id: number, updatedData: IInfluencer) {
  try {
    const response = await fetch(`${INFLUENCER_BASE_URL}/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData), // Pass the updated data as JSON
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Influencer not found.");
      } else {
        throw new Error("Failed to update influencer.");
      }
    }

    const data = await response.json();
    return data.influencer; // Returns the updated influencer
  } catch (error) {
    console.error("Error updating influencer:", error.message);
    throw error;
  }
}

export async function deleteInfluencer(id: number) {
  try {
    const response = await fetch(`${INFLUENCER_BASE_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Influencer not found.");
      } else {
        throw new Error("Failed to delete influencer.");
      }
    }

    return { message: "Influencer deleted successfully." };
  } catch (error) {
    console.error("Error deleting influencer:", error.message);
    throw error;
  }
}

export async function fetchUserSession() {
    try {
      const response = await fetch(`${baseURL}/api/auth/me`, {
        method: "GET",
        credentials: "include", // Ensures cookies are sent with the request
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Not logged in.");
        } else if (response.status === 404) {
          throw new Error("User not found.");
        } else {
          throw new Error("An error occurred while fetching the user session.");
        }
      }
  
      const data = await response.json();
      return data.user; // Returns the user object from the API
    } catch (error) {
      console.error("Error fetching user session:", error.message);
      throw error; // Re-throw the error for handling in the calling code
    }
  }

  export async function uploadImageToS3(file) {
    try {
      // Request a pre-signed URL from your backend
      const response = await fetch(`${baseURL}/api/aws/get-presigned-url?fileName=${file.name}&fileType=${file.type}`, {
        method: "GET",
        credentials: "include", // Ensures cookies are sent with the request
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { url } = await response.json();
      console.log(url)
  
      // Upload the file to S3 using the pre-signed URL
      const s3Response = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });
  
      if (s3Response.ok) {
        console.log("File uploaded to S3!");
        return url.split("?")[0]; // Return the S3 public URL
      } else {
        console.error("Failed to upload file to S3");
        return null;
      }
    } catch (error) {
      console.error("Error uploading image to S3:", error);
      return null;
    }
  }