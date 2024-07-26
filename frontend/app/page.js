"use client";
import { useState, useEffect } from "react";
import { Hero } from "@/components/Hero";
import { ThreeDCard } from "@/components/card";
import useUserStore from "@/store/userStore";
export default function Home() {
  const [allposts, setPosts] = useState([]);
  const setProfile = useUserStore.getState().setProfile;
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BASE + "properties").then((response) => {
      response.json().then((Posts) => {
        setPosts(Posts);
      });
    });

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE + "profil", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);
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
