"use client";
import React, { useEffect, useState } from "react";
import * as GetData from "@/api/exampleAPI";
import IconLabelButtons from "@/component/button";

import ProtectedRoute from "@/context/ProtectedRoute";
import Header from "@/component/Header/header";
import { Subject } from "@/component/Subject";

interface Post {
  id: number;
  title: string;
  body: string;
}

function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetData.getData();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Subject/>
    </>
  );
}

export default Dashboard;
