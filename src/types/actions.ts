interface CreatePost {
  title: string;
  body: string;
  userId: number;
}

interface CreateComment {
  postId: number;
  name: string;
  email: string;
  body: string;
}

interface UpdatePost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface UpdateComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
