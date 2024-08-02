"use client";
import { useState, useEffect } from "react";
import { Hero } from "@/components/Hero";
import { ThreeDCard } from "@/components/card";
import useUserStore from "@/store/userStore";
import { SelectValue, Select, SelectTrigger, SelectItem, SelectContent } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [allPosts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [filterType, setFilterType] = useState("all");

  const setProfile = useUserStore((state) => state.setProfile);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BASE + "properties")
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
        setFilteredPosts(posts);
      });

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE + "profil", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          if (data._id) {
            localStorage.setItem("user", data._id);
          }
          setProfile(data);
        }
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [setProfile]);

  useEffect(() => {
    applyFilters();
  }, [searchTitle, filterType, allPosts]);

  const applyFilters = () => {
    let filtered = allPosts;

    if (searchTitle) {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter(
        (post) => post.propertyCategory === filterType
      );
    }

    setFilteredPosts(filtered);
  };

  return (
    <main>
      <Hero />
      <div className="flex justify-center h-max flex-wrap items-center  gap-3  mb-4">
        <Input
          type="text"
          placeholder="Rechercher par titre"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="w-1/2"
        />
        <Select onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tous les types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="etudiants">Étudiants</SelectItem>
            <SelectItem value="touristes">Touristes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <ThreeDCard key={post._id} {...post} />)
        ) : (
          <div>Aucun post trouvé</div>
        )}
      </div>
    </main>
  );
}
