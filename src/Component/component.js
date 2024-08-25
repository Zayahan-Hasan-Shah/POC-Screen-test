/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ASbB4H0EJoN
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"

import { useState } from "react";
import { saveAs } from 'file-saver';
import axios from "axios";

export default function Component() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [prompt, setPrompt] = useState("")

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSaveFile = async () => {
        if (selectedFile) {
            console.log("File saved:", selectedFile.name);
            saveAs(selectedFile, selectedFile.name);

            // const formData = new FormData();
            // formData.append("file", selectedFile);
            // formData.append("prompt", prompt)
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64File = reader.result.split(',')[1];
                const reader = new FileReader();
                const payload = {
                    file: base64File,
                    fileName: selectedFile.name,
                    prompt
                };

                try {
                    // const response = await axios.post('https://poc-legal-assistant-1a1f6a332c9d.herokuapp.com/analyze-pdf', formData, {
                    //     headers: {
                    //         'Content-Type': 'multipart/form-data',
                    //     },
                    // });

                    // const fileData = await response.json()
                    // if (fileData.error) throw new Error(fileData.error)

                    // console.log("File uploaded successfully:", response.data);


                    const response = await axios.post('https://poc-legal-assistant-1a1f6a332c9d.herokuapp.com/analyze-pdf', payload, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    console.log("File and prompt uploaded successfully:", response.data);

                } catch (error) {
                    console.error("Error uploading file:", error);
                }
                reader.readAsDataURL(selectedFile)
            
            }
            } else {
                setSelectedFile(null)
                try {
                    console.log(prompt)
                    const response = await axios.post('https://poc-legal-assistant-1a1f6a332c9d.herokuapp.com/analyze-pdf', {
                        method: "POST",
                        headers: {
                            "Content-Type": 'application/json',
                        },
                        body: JSON.stringify({ prompt })
                    })

                    const promptData = await response.json()
                    if (promptData.error) throw new Error(promptData.error)

                } catch (error) {

                }
            }
        };


        return (
            <div className="flex flex-col h-screen">
                <div className="flex-1 overflow-auto p-4 space-y-4 border-[1px] border-black rounded-xl m-10">
                    <div className="flex items-start gap-4">
                        {/* <Avatar className="w-8 h-8 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                    <AvatarFallback>OA</AvatarFallback>
                    </Avatar> */}
                        <div className="bg-[#f0f0f0] rounded-lg p-3 max-w-[70%]">
                            <p className="text-sm">
                                Hey there! How's it going? I wanted to follow up on that project we discussed earlier.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 justify-end">
                        <div className="bg-[#181818] text-[#f5f2f2] text-primary-foreground rounded-lg p-3 max-w-[70%]">
                            <p className="text-sm">
                                Hi there! Things are going well, thanks for asking. I'm just finishing up the final details on the
                                project. I'll send over an update later today.
                            </p>
                        </div>
                        {/* <Avatar className="w-8 h-8 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                    <AvatarFallback>YO</AvatarFallback>
                    </Avatar> */}
                    </div>
                    <div className="flex items-start gap-4">
                        {/* <Avatar className="w-8 h-8 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                    <AvatarFallback>OA</AvatarFallback>
                    </Avatar> */}
                        <div className="bg-[#f0f0f0] rounded-lg p-3 max-w-[70%]">
                            <p className="text-sm">
                                Sounds good, I'm looking forward to seeing the update. Let me know if you need anything else from my end.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 justify-end">
                        <div className="bg-[#181818] text-[#f5f2f2] text-primary-foreground rounded-lg p-3 max-w-[70%]">
                            <p className="text-sm">
                                I will. Don't you worry I'll let you know.
                            </p>
                        </div>
                        {/* <Avatar className="w-8 h-8 border">
                    <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                    <AvatarFallback>YO</AvatarFallback>
                    </Avatar> */}
                    </div>
                </div>
                <div className="bg-background border-t ">
                    <div className="flex items-center gap-2 p-4 border-[1px] border-black m-10 rounded-lg">
                        <input onChange={handleFileChange} type="file" id="pdfFile" accept="application/pdf" />
                        <input value={prompt} onChange={(e) => setPrompt(e.target.value)} type="text" placeholder="Type your message..." className="flex-1 text-md focus:outline-none" />
                        <button onClick={handleSaveFile} className="bg-[#181818] text-white p-4 rounded-xl">Send</button>
                    </div>

                </div>
            </div>
        )
    }