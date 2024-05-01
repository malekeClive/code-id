import { Album, CommentPost, Photo, Post, User } from "@/types/views";

class Service {
  async getUsers(): Promise<User[]> {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return await response.json();
  }

  async getAlbums(): Promise<Album[]> {
    const response = await fetch("https://jsonplaceholder.typicode.com/albums");
    return await response.json();
  }

  async getPostsByUserId(userId: Number): Promise<Post[]> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    return await response.json();
  }

  async getAlbumsByUserId(userId: Number): Promise<Post[]> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
    );
    return await response.json();
  }

  async getPhotosByAlbumId(albumId: Number): Promise<Photo[]> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
    );
    return await response.json();
  }

  async getCommentsById(postId: Number): Promise<CommentPost[]> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return await response.json();
  }

  // mutation
  async createCommentById(body: CreateComment) {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(body),
      }
    );

    return await response.json();
  }

  async createPostById(body: CreatePost) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  }

  async editPostById(body: UpdatePost) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${body.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(body),
      }
    );

    return await response.json();
  }

  async editCommentById(body: UpdateComment) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments/${body.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(body),
      }
    );

    return await response.json();
  }

  async deletePostById(id: number) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );

    return await response.json();
  }

  async deleteCommentById(id: number) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments/${id}`,
      {
        method: "DELETE",
      }
    );

    return await response.json();
  }
}

export default new Service();
