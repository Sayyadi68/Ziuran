import React from "react";
import { useParams } from "react-router-dom";
import blogsData from './blogsTestForHme';
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { MdDateRange } from "react-icons/md";

const CurrBlogPage = () => {

    let { id } = useParams();


    return (
        <div className="min-h-screen py-10 px-6 ">

            {blogsData.filter(currblog => currblog.id == id).map((blog, index) => (

                <div className="max-w-6xl mx-auto bg-transparent  overflow-hidden  rounded-3xl">

                    {/* تصویر اصلی */}
                    <div className="w-full">
                        <img
                            style={{ height: "50vh" }}
                            src={blog.image}
                            alt="صفحه وبلاگ"
                            className="w-full object-cover rounded-3xl"
                        />
                    </div>

                    {/* محتوای متن */}
                    <div className="p-6 flex flex-col items-center ">
                        <div className="bg-white shadow-xl w-[80vw] md:w-[60vw] lg:w-[50vw] mx-auto text-center py-3 rounded-2xl absolute -translate-y-20 px-4">
                            {/* عنوان */}
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                                {blog.title}
                            </h1>

                            {/* متا دیتا */}
                            <div className="text-sm text-gray-500 mb-4 flex flex-row items-center justify-center gap-6">
                                <span className="flex items-center gap-1">
                                    <MdDateRange />
                                    {blog.date}
                                </span>
                                <span className="flex items-center gap-1">
                                    <HiOutlineUser />
                                    {blog.writer}
                                </span>
                                <span className="flex items-center gap-1">
                                    <IoChatboxEllipsesOutline />
                                    دیدگاه‌ها
                                </span>
                            </div>
                        </div>

                        {/* متن توضیحات */}
                        <p className="text-gray-500 font-400 leading-loose mt-14 ">
                            {blog.blogtext}
                        </p>
                    </div>
                </div>

            ))}
        </div>
    );
};

export default CurrBlogPage;
