"use client";
import { useState, useEffect } from "react";
import { Hero } from "@/components/Hero";
import { ThreeDCard } from "@/components/card";
import useUserStore from "@/store/userStore";
export default function Home() {
  const [allposts, setPosts] = useState([]);
  const setProfile = useUserStore((state) => state.setProfile);
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BASE + "properties")
      .then((response) => response.json())
      .then((Posts) => setPosts(Posts));

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE + "profil", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          if (data._id){
            localStorage.setItem('user', data._id)
          }
          setProfile(data);
        }
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [setProfile]);
  return (
    <main>
      <Hero />
      <div className="flex flex-wrap justify-center item-center">
      {allposts.length > 0 ? (
        allposts.map((post) => <ThreeDCard key={post._id} {...post} />)
      ) : (
        <div>no post yet</div>
      )}
      </div>
    </main>
  );
}
