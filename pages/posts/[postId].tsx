import { GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { GetStaticPaths } from "next";

export interface PostDetailPageProps {
  post: any;
}

export default function PostDetailPage({ post }: PostDetailPageProps) {
  const router = useRouter();

  if (!post) {
    return null;
  }

  return (
    <div>
      <h1>POST DETAIL PAGE</h1>

      <p>{post.title}</p>

      <p>{post.author}</p>

      <p>{post.description}</p>
    </div>
  );
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  console.log("\ngetStaticPaths");

  const response = await fetch(
    "https://js-post-api.herokuapp.com/api/posts?_page=1"
  );
  const data = await response.json();

  return {
    paths: data.data.map((post: { id: string }) => ({
      params: { postId: post.id },
    })),
    fallback: false,
  };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps<PostDetailPageProps> = async (
  ctx: GetStaticPropsContext
) => {
  const postId = ctx.params?.postId;
  console.log("\ngetStaticProps", ctx.params?.postId);

  if (!postId) {
    return { notFound: true };
  }

  const response = await fetch(
    `https://js-post-api.herokuapp.com/api/posts/${postId}`
  );
  const data = await response.json();

  // your fetch function here
  return {
    props: {
      post: data,
    },
  };
};
