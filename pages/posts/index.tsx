import * as React from "react";
import { GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";

export interface IPostListPageProps {
  posts: any[];
}

export default function PostListPage({ posts }: IPostListPageProps) {
  return (
    <div>
      Post List Page
      <h1>
        <ul>
          {posts.map((post) => (
            <li key={post.title}>
              <Link href={`/posts/${post.id}`}>
                <a> {post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </h1>
    </div>
  );
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps<IPostListPageProps> = async (
  ctx: GetStaticPropsContext
) => {
  const response = await fetch(
    "https://js-post-api.herokuapp.com/api/posts?_page=1"
  );
  const data = await response.json();

  // your fetch function here
  return {
    props: {
      posts: data.data.map((x: { id: string; title: string }) => ({
        id: x.id,
        title: x.title,
      })),
    },
  };
};
