import { Link } from "react-router-dom"


export const AppBar = () => {
    return (
        <div className="border-b flex justify-between px-10 py-4">
            <Link to="/blogs" className="flex flex-col justify-center text-3xl font-bold">
                
                    Medium
               
            </Link>
            <div>
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Write a Blog</button>
            </Link>
                <Avatar name={"Sahaj Jain"} />
            </div>
        </div>

    )
}

function Avatar({ name }: { name: string }) {
    return <div className={`relative inline-flex items-center justify-center w-11 h-11 overflow-hidden bg-gray-600 rounded-full`}>
        <span className="text-xs font-extralight text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>

}