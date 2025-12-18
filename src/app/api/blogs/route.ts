import { NextResponse } from "next/server";

export interface BlogPost {
  imageSrc: string;
  imageAlt: string;
  category: string;
  date: string;
  title: string;
  link: string;
}

const mockBlogPosts: BlogPost[] = [
  {
    imageSrc: "/assets/images/blog.jpeg",
    imageAlt: "Blog post 1",
    category: "Technology",
    date: "3 mins read",
    title: "How to Build Scalable Web Applications with Modern Tools",
    link: "/blog/scalable-web-apps",
  },
  {
    imageSrc: "/assets/images/blog.jpeg",
    imageAlt: "Blog post 2",
    category: "Design",
    date: "3 mins read",
    title: "10 UI/UX Design Principles Every Developer Should Know",
    link: "/blog/ui-ux-principles",
  },
  {
    imageSrc: "/assets/images/blog.jpeg",
    imageAlt: "Blog post 3",
    category: "Development",
    date: "3 mins read",
    title: "Getting Started with Next.js 14: A Complete Guide",
    link: "/blog/nextjs-guide",
  },
  {
    imageSrc: "/assets/images/blog.jpeg",
    imageAlt: "Blog post 1",
    category: "Technology",
    date: "3 mins read",
    title: "How to Build Scalable Web Applications with Modern Tools",
    link: "/blog/scalable-web-apps",
  },
  {
    imageSrc: "/assets/images/blog.jpeg",
    imageAlt: "Blog post 2",
    category: "Design",
    date: "3 mins read",
    title: "10 UI/UX Design Principles Every Developer Should Know",
    link: "/blog/ui-ux-principles",
  },
  {
    imageSrc: "/assets/images/blog.jpeg",
    imageAlt: "Blog post 3",
    category: "Development",
    date: "3 mins read",
    title: "Getting Started with Next.js 14: A Complete Guide",
    link: "/blog/nextjs-guide",
  },
];

export async function GET() {
  // Simulate a network delay (optional)
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(mockBlogPosts);
}
