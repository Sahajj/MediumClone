import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { singinInput, singupInput, SingUpInput } from "@sahajj9/medium-common"
import { BACKEND_URL } from "../config";
import axios from "axios"
import { toast } from 'react-toastify';
import { fromZodError } from 'zod-validation-error';
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [PostInputs, setPostInput] = useState<SingUpInput>({
        name: "",
        username: "",
        password: "",
    });

    async function sendRequest() {
        if (type === "signin") {
            try {
                singinInput.parse(PostInputs)
                try {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, PostInputs)
                    const jwt = response.data;
                    localStorage.setItem("token", jwt);
                    navigate("/blogs");
                } catch (e: any) {
                    toast.error(e);
                }
            }
            catch (err: any) {
                const validError = fromZodError(err)
                const outError = String(validError).replace(`Validation error: `, ``)
                const outError2 = outError.replace(`String must contain at least 8 character(s) at "password"`, `Password must be of length 8`)
                const outError3 = outError2.replace('Invalid email at "username"', 'Invalid Email')
                return toast.error(outError3)
            }
        } else {
            try {
                singupInput.parse(PostInputs)
                try {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, PostInputs)
                    const jwt = response.data;
                    localStorage.setItem("token", jwt);
                    navigate("/blogs");
                } catch (e: any) {
                    toast.error(e);
                }
            }
            catch (err: any) {
                const validError = fromZodError(err)
                const outError = String(validError).replace(`Validation error: `, ``)
                const outError2 = outError.replace(`String must contain at least 8 character(s) at "password"`, `Password must be of length 8`)
                const outError3 = outError2.replace('Invalid email at "username"', 'Invalid Email')
                return toast.error(outError3)
            }
        }

    }
    return (
        <div className="flex justify-center flex-col h-screen bg-white ">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-4xl font-extrabold text-center">
                            {type === "signup" ? "Create an Account" : "Login"}
                        </div>
                        <div className="text-slate-500 font-medium">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                            <Link to={type === "signin" ? "/signup" : "/signin"} className="pl-1 underline">
                                {type === "signin" ? "Create Account" : "Login"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-8">
                        {type === "signup" ? <LabelledInput label="Name" placeholder="Jhon Jones" onChange={(e) => {
                            setPostInput({
                                ...PostInputs, // overrides the name and let's us use the old fields as they are
                                name: e.target.value
                            });
                        }} /> : null}

                        <LabelledInput label="*UserName" placeholder="Jhon@gmail.com" onChange={(e) => {
                            setPostInput({
                                ...PostInputs, // overrides the name and let's us use the old fields as they are
                                username: e.target.value
                            });
                        }} />

                        <LabelledInput label="*Password" type={"password"} placeholder="12345678" onChange={(e) => {
                            setPostInput({
                                ...PostInputs, // overrides the name and let's us use the old fields as they are
                                password: e.target.value
                            });
                        }} />
                        <button onClick={sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none 
                        focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-8">{type === "signup" ? "Sign Up" : "Sign In"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;

}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm  text-black font-semibold py-2">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border
             border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
             block w-full p-2.5 m-2 " placeholder={placeholder} required />
    </div>
}