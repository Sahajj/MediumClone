import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string,
    content: string;
    publishedDate: string
    id:number
}

export const BlogCard = ({ authorName, title, content, publishedDate, id }: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className=" p-6 border-b-2 corder-slate-200 pb-4 cursor-pointer">
                <div className="flex">
                    <Avatar name={authorName} />
                    <div className="flex justify-center">
                        <div className="font-extralight pl-2">
                            {authorName}
                        </div>
                        <div className="flex justify-center flex-col pl-2">
                            <Circle />
                        </div>
                        <div className="pl-2 font-thin text-slate-400">
                            {publishedDate}
                        </div>
                    </div>
                </div>
                <div className="text-2xl font-semibold pt-2">
                    {title}
                </div>
                <div className="text-xl font-thin pt-1">
                    {content.slice(0, 150) + "..."}
                </div>
                <div className="text-slate-500 text-sm font-thin pt-4">
                    {`${Math.ceil(content.length / 800)} minute read`}
                </div>
            </div>
        </Link>
    )    
}

function Avatar({ name }: { name: string }) {
    return <div className={`relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-600 rounded-full`}>
        <span className="text-xs font-extralight text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>

}

function Circle() {
    return (
        <div className="h-2 w-2 rounded-full bg-slate-200 ">

        </div>
    )
}