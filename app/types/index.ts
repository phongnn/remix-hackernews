export interface StoryData {
  id: number;
  points: number | null;
  title: string;
  url: string;
  domain: string;
  type: string;
  time_ago: string;
  user?: string | null;
  comments_count?: number;
  comments: CommentData[];
}

export interface UserData {
  id: string;
  about: string;
  error?: string;
  created: string;
  karma: string;
}

export interface CommentData {
  user: string;
  time_ago: string;
  content: string;
  comments: CommentData[];
}
