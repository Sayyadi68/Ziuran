import React from 'react'
import { BlogCardForBlogPage } from "../components/index";
 
import blogsData from './blogsTestForHme';

const Weblog = () => {


  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-6">
        {blogsData.map((blog , index) => (
          <BlogCardForBlogPage
            key={index}
            id={blog.id}
            imageSrc={blog.image}
            date={blog.date}
            title={blog.title}
            description={blog.description}
            onBackClick={() => console.log(`Back clicked for blog ID: ${blog.id}`)}
          />
        ))}
      </div>
    </>
  )
}

export default Weblog
