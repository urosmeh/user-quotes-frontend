import { User } from "./User";
import { Vote } from "./Vote";

export interface Quote {
  id: number;
  quote: string;
  user: User;
  upvotes: number;
  downvotes: number;
  votes?: Vote[];
  isUpvoted: boolean;
  isDownvoted: boolean;
}
