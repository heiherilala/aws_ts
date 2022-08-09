import React, { useEffect, useRef, useState } from 'react';
import './index.css';



  
  

const Page = () => {
    const [image, setImage] = useState<File|null>(null);
    const [preview, setPreview] = useState<string>('');
    const fielInputRef = useRef<HTMLInputElement|null>(null);


    useEffect(
        ()=>{
            if (image) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result as string)
                }
                reader.readAsDataURL(image);
            }else{
                setPreview('');
            }
        },[image]
    )




    return (
        <div className="corpsPage">
            <div className="headerPage">
fffffffffffffff
            </div>
            <div className="bodyPage">
                <div className="imagePage">
                    <button onClick={
                        (e)=>{
                            e.preventDefault();
                            fielInputRef.current?.click()
                        }
                    }>Add image</button>
                    <input 
                    style={{display:"none"}}
                    type="file" 
                    accept='image/*'
                    ref={fielInputRef}
                    onChange={(e) => {
                        if (e.target.files!=null){
                            const file = e.target.files[0];
                            if (file && file.type.substring(0,5)==="image") {
                                setImage(file);
                            }else{
                                setImage(null);
                            }
                        }
                    }}/>
                    <img className='imagePreviw' src={preview} alt={preview}></img>
                </div>
                <div className="donnePage">
                    fffgggggggggggggggggggggggggggg
                </div>
            </div>
        </div>
    );
};

export default Page;