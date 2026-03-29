export interface PostFrontmatter {
  title: string;
  city: string;
  country: string;
  date: string;
  tags: string[];
  coverImage: string;
  excerpt: string;
  coordinates: [number, number];
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

export interface CityInfo {
  name: string;
  country: string;
  postCount: number;
  latestDate: string;
  coordinates: [number, number];
}
