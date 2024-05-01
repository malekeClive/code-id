interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface CommentPost {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export type { User, Post, Photo, Album, CommentPost };
