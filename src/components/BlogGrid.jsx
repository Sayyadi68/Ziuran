import React from "react";
import BlogCard from "./BlogCard ";

const BlogGrid = ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {blogs.map((blog, index) => (
        <BlogCard
          key={index}
          id={blog.id}
          image={blog.image}
          title={blog.title}
          date={blog.date}
          category={blog.category}
          categoryColor={blog.categoryColor}
        />
      ))}
    </div>
  );
};

export default BlogGrid;
