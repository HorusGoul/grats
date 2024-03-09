import { VC } from "./ViewerContext";

/**
 * This module is intended to represent a database.
 *
 * Note that we purposefully thead the VC all the way through to the database
 * layer so that we can do permission checks and access logging at the lowest
 * possible layer
 */
export type UserRow = {
  id: string;
  name: string;
};

export type PostRow = {
  id: string;
  authorId: string;
  title: string;
  content: string;
  publishedAt: Date;
};

export type LikeRow = {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
};

const MOCK_USERS: UserRow[] = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];

const MOCK_POSTS: PostRow[] = [
  {
    id: "1",
    authorId: "1",
    title: "Hello, World!",
    content: "This is my first post.",
    publishedAt: new Date("2021-01-01"),
  },
  {
    id: "2",
    authorId: "2",
    title: "My favorite things",
    content: "Here are some things I like.",
    publishedAt: new Date("2021-01-02"),
  },
  {
    id: "3",
    authorId: "3",
    title: "I'm back",
    content: "I was away for a while.",
    publishedAt: new Date("2021-01-03"),
  },
  {
    id: "4",
    authorId: "1",
    title: "Hello again",
    content: "I'm back too.",
    publishedAt: new Date("2021-01-04"),
  },
  {
    id: "5",
    authorId: "2",
    title: "My favorite things 2",
    content: "Here are some more things I like.",
    publishedAt: new Date("2021-01-05"),
  },
];

const MOCK_LIKES: LikeRow[] = [
  { id: "1", userId: "1", postId: "1", createdAt: new Date("2021-01-01") },
  { id: "2", userId: "1", postId: "2", createdAt: new Date("2021-01-02") },
  { id: "3", userId: "2", postId: "1", createdAt: new Date("2021-01-03") },
  { id: "4", userId: "3", postId: "2", createdAt: new Date("2021-01-04") },
  { id: "5", userId: "3", postId: "3", createdAt: new Date("2021-01-05") },
];

export async function selectPosts(vc: VC): Promise<Array<PostRow>> {
  vc.log("DB query: selectPosts");
  return MOCK_POSTS;
}

export async function createPost(
  vc: VC,
  draft: {
    authorId: string;
    title: string;
    content: string;
  },
): Promise<PostRow> {
  vc.log(`DB query: createPost: ${JSON.stringify(draft)}`);
  const id = (MOCK_POSTS.length + 1).toString();
  const row = { id, ...draft, publishedAt: new Date() };
  MOCK_POSTS.push(row);
  return row;
}

export async function selectPostsWhereAuthor(
  vc: VC,
  authorId: string,
): Promise<Array<PostRow>> {
  vc.log(`DB query: selectPostsWhereAuthor: ${authorId}`);
  return MOCK_POSTS.filter((post) => post.authorId === authorId);
}

export async function getPostsByIds(
  vc: VC,
  ids: readonly string[],
): Promise<Array<PostRow>> {
  vc.log(`DB query: getPostsByIds: ${ids.join(", ")}`);
  return ids.map((id) => nullThrows(MOCK_POSTS.find((post) => post.id === id)));
}

export async function selectUsers(vc: VC): Promise<Array<UserRow>> {
  vc.log("DB query: selectUsers");
  return MOCK_USERS;
}

export async function createUser(
  vc: VC,
  draft: { name: string },
): Promise<UserRow> {
  vc.log(`DB query: createUser: ${JSON.stringify(draft)}`);
  const id = (MOCK_POSTS.length + 1).toString();
  const row = { id, ...draft };
  MOCK_USERS.push(row);
  return row;
}

export async function getUsersByIds(
  vc: VC,
  ids: readonly string[],
): Promise<Array<UserRow>> {
  vc.log(`DB query: getUsersByIds: ${ids.join(", ")}`);
  return ids.map((id) => nullThrows(MOCK_USERS.find((user) => user.id === id)));
}

export async function selectLikes(vc: VC): Promise<Array<LikeRow>> {
  vc.log("DB query: selectLikes");
  return MOCK_LIKES;
}

export async function createLike(
  vc: VC,
  like: { userId: string; postId: string },
): Promise<LikeRow> {
  vc.log(`DB query: createLike: ${JSON.stringify(like)}`);
  const id = (MOCK_LIKES.length + 1).toString();
  const row = { ...like, id, createdAt: new Date() };
  MOCK_LIKES.push(row);
  return row;
}

export async function getLikesByUserId(
  vc: VC,
  userId: string,
): Promise<Array<LikeRow>> {
  vc.log(`DB query: getLikesByUserId: ${userId}`);
  return MOCK_LIKES.filter((like) => like.userId === userId);
}

export async function getLikesByPostId(
  vc: VC,
  postId: string,
): Promise<Array<LikeRow>> {
  vc.log(`DB query: getLikesByPostId: ${postId}`);
  return MOCK_LIKES.filter((like) => like.postId === postId);
}

export async function getLikesForPost(
  vc: VC,
  postId: string,
): Promise<LikeRow[]> {
  vc.log(`DB query: getLikesForPost: ${postId}`);
  return MOCK_LIKES.filter((like) => like.postId === postId);
}

function nullThrows<T>(value: T | null | undefined): T {
  if (value == null) {
    throw new Error("Expected value to be non-null");
  }
  return value;
}
