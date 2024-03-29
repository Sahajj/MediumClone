import { Spinner } from "../component/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { AppBar } from "../component/AppBar";
import { FullBlog } from "../component/FullBlog";
import { useBlog } from "../hooks";

export const Blog = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const {loading , blog, Vuser } = useBlog({
    id: id || ""
  });
  if(Vuser === false){
    navigate("/signup")
  }

  if (loading || !blog) {
    return <div>
        <AppBar />
    
        <div className="h-screen flex flex-col justify-center">
            
            <div className="flex justify-center">
                <Spinner />
            </div>
        </div>
    </div>
}
  return (
    <div>
      <FullBlog blogContext={blog}/>
    </div>
  )
}