"use client";
import { useState, useEffect } from "react";
import { Hero } from "@/components/Hero";
import { ThreeDCard } from "@/components/card";

export default function Home() {
  const [allposts, setPosts] = useState([]);
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BASE + "properties").then((response) => {
      response.json().then((Posts) => {
        setPosts(Posts);
      });
    });
  }, []);
  console.log(allposts);
  return (
    <main>
      <Hero />
      {allposts.length > 0 ? (
        allposts.map((post) => <ThreeDCard key={post._id} {...post} />)
      ) : (
        <div>no post yet</div>
      )}
    </main>
  );
}
