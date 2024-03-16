import { AppBar } from "./AppBar"
import { Blog } from "../hooks"
export const FullBlog = ({ blogContext }: { blogContext: Blog }) => {
    return (
        <div >
            <AppBar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-20">
                    <div className="col-span-8">
                        <div className="text-4xl font-extrabold">
                            {blogContext.title}
                        </div>
                        <div className="text-slate-500 pt-4">
                            Posted On 21 Dec 2024
                        </div>
                        <div className="text-xl ">
                            {blogContext.content}
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="text-slate-500 text-lg ">
                            Author
                            </div>
                        <div className="flex w-full">
                            <div className="pr-4 flex flex-col justify-center  ">
                                <Avatar name={blogContext.author.name || "Anonymous"} />
                            </div>
                            <div>
                                <div className=" text-black text-2xl font-semibold">
                                    {blogContext.author.name || "Anonymous"}
                                </div>
                                <div className="text-slate-500 pt-2">
                                    Random Catch phrase about the author's ability grab the users attention
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Avatar({ name }: { name: string }) {
    return <div className={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-600 rounded-full`}>
        <span className="text-xs font-extralight text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>

}