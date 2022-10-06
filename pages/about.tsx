import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import Router, { useRouter } from "next/router";
import { MainLayout } from "@/components/layout";

const Header = dynamic(() => import("@/components/common/header"), {
  ssr: false,
});

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
  const [postList, setPostList] = useState([]);
  const router = useRouter();
  const page = Number(router.query?.page) || 1;

  useEffect(() => {
    if (!page) return;

    (async () => {
      const response = await fetch(
        `https://js-post-api.herokuapp.com/api/posts?_page=${page}`
      );
      const data = await response.json();

      setPostList(data.data);
    })();
  }, [page]);

  const handleNextClick = () => {
    router.push(
      {
        pathname: "/about",
        query: {
          page: (Number(router.query?.page) || 1) + 1,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <Header />
      <div>ABOUT PAGE</div>

      <ul className="post-list">
        {postList.map((post: { id: string; title: string }) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <button onClick={handleNextClick}>Next Page</button>
    </>
  );
}

AboutPage.Layout = MainLayout;

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps: GetStaticProps = async (ctx) => {
  console.log("GetStaticProps");

  return {
    props: {},
  };
};
