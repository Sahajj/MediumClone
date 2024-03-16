import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppBar } from "../component/AppBar"
import { BlogCard } from "../component/BlogCard"
import { BlogSkeletons } from "../component/BlogSkeletons";
import { useBlogs } from "../hooks/index";


export const Blogs = () => {
  const navigate = useNavigate()
  const { loading, blogs, Vuser } = useBlogs();
  if(Vuser == false){
    navigate("/signup")
    toast.error("user is not Logged In")
  }
  if (loading) {
    return <div>
      <AppBar />
      <div className="flex justify-center">
        <div>
          <BlogSkeletons />
          <BlogSkeletons />
          <BlogSkeletons />
          <BlogSkeletons />
          <BlogSkeletons />
        </div>
      </div>
    </div>
  }

  return <div>
    <AppBar />
    <div className="flex justify-center">
      <div>
        {blogs.map(blog =>
          <BlogCard
            id={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={"2nd Feb 2024"} />)
        }
      </div>
    </div>
  </div>
}