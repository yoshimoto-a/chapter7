import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteHeader } from "./SiteHeader";
import { BlogItem } from "./BlogItem";
import { Post } from "./Post";
import { Contact } from "./Contact";
import React from 'react'

export const App = () => {
  return (
    <BrowserRouter>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<BlogItem />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};
