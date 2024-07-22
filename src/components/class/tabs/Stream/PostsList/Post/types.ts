import { PostFileProps } from 'src/components/class/tabs/Stream/PostsList/Post/PostFiles/PostFile';

export interface User {
  fullName: string;
  id: string;
  role: 'teacher' | 'student';
  avatar: string;
}

export interface IPostComment {
  id: string;
  user: User;
  content: string;
  date: Date;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  files: PostFileProps[];
  date: Date;
  comments: IPostComment[];
  edited: boolean;
}

export interface PostProps {
  post: Post;
}

// export type PostOptionsProps = {
//   onEdit: () => void;
//   onDelete: () => void;
//   show: boolean;
// };
