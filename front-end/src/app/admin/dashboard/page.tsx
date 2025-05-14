"use client";
import React, { useEffect, useState } from "react";
import * as GetData from "@/api/exampleAPI";
import IconLabelButtons from "@/component/button";

import ProtectedRoute from "@/context/ProtectedRoute";
import Header from "@/component/Header/header";

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
    <ProtectedRoute allowedRoles={["admin"]}>
      <Header />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">Dashboard</h1>
          <p className="text-gray-600 mb-8">Welcome to the admin dashboard!</p>

          <div className="mb-4">
            <IconLabelButtons />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Posts</h2>

            {loading ? (
              <p className="text-gray-500 italic">Loading posts...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : posts.length === 0 ? (
              <p className="text-gray-500 italic">No posts available.</p>
            ) : (
              <ul className="space-y-6">
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="border-b border-gray-200 pb-4 last:border-none"
                  >
                    <h3 className="text-lg font-medium text-blue-700 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-700">{post.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default Dashboard;
