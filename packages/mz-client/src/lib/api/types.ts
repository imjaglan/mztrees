export interface GetItemsResult {
  list: Item[];
  totalCount: number;
  pageInfo: PageInfo;
}

export interface Item {
  id: number;
  title: string;
  body: string;
  link: string;
  author: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  publisher: Publisher;
  itemStats: ItemStats;
  isLiked: boolean;
}
export interface Publisher {
  id: number;
  name: string;
  domain: string;
  favicon: string | null;
}

export interface User {
  id: number;
  username: string;
}
export interface PageInfo {
  endCursor: number | null;
  hasNextPage: boolean;
}

export interface ItemStats {
  id: number;
  likes: number;
  isLiked: boolean;
}

export interface LikeItemResult {
  id: number;
  itemStats: ItemStats;
  isLiked: boolean;
}

export type UnlikeItemResult = LikeItemResult;