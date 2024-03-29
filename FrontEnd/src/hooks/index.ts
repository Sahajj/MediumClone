import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
    content: string;
    title: string;
    id: number;
    author: {
        name: string
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [Vuser, setVUser] = useState(false)

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                if (response.data.message === "You are not logged in") {
                    setVUser(false)
                    setLoading(false);
                } else {
                    setBlogs(response.data.blogs);
                    setLoading(false);
                    setVUser(true)
                }

            })
    }, [])

    return {
        loading,
        blogs,
        Vuser
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    const [Vuser, setVUser] = useState(false)


    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                if (response.data.message === "You are not logged in") {
                    setVUser(false)
                    setLoading(false);
                } else {
                    setBlog(response.data.blog);
                    setLoading(false);
                    setVUser(true)
                }
            })
    }, [id])

    return {
        loading,
        blog,
        Vuser
    }
}
