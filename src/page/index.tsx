import { ImportExport } from 'aws-sdk';
import React, { useEffect, useRef, useState } from 'react';
import AwsGet from '../AwsGet/AwsGet';
import ChooseFace from '../chooseFace/ChooseFace';
import DataFace from '../dataFace/DataFace';
import { baba } from '../firstData/FirsData';
import { importedObject } from '../interface/Interface';
import MarqFace from '../marqFace/marqFace';
import './index.css';

interface img {
    fileName: string, 
    base64String: string
  }

  
  

const Page = () => {

    const [image, setImage] = useState<string>("");
    const [preview, setPreview] = useState<img>();
    const [count, setCount] = useState<number>(0);
    const [awsResponsee, setAwsResponsee] = useState<importedObject[]>([baba])
    const fielInputRef = useRef<HTMLInputElement|null>(null);
    const [oneString, setOneString] = useState<string>("not modified");
    const [oneOneString, setOneOneString] = useState<any>("any");
    const [faceActive, setFaceActive] = useState<number|null>(null);
    
    useEffect(()=>{
        setOneString(awsResponsee!=undefined?awsResponsee[0].Gender.Value:"c'est undifaid")
    },[count])

    
    const imageTo64 = (file: File | Blob): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
            resolve(reader.result as string);
            };

            reader.readAsDataURL(file);
            reader.onerror = reject;
            console.log(reader.result);
            
        });

    useEffect(()=>{
        console.log(awsResponsee);
        console.log(image);
    },[count])


    const takingImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          const file = e.target.files[0];
        const tempFileList: img = {
          fileName: file.name,
          base64String: file.type.indexOf('image') > -1 ? await imageTo64(file) : '',      
        };
        setPreview(tempFileList);    
        }
      };

      const analyze = () => {
        setAwsResponsee([baba]);
        if (preview?.base64String.includes("data:image/jpeg;base64,")) {
          setImage(preview?.base64String.split("data:image/jpeg;base64,")[1]);
        } else if (preview?.base64String.includes("data:image/png;base64,")) {
          setImage(preview?.base64String.split("data:image/png;base64,")[1]);
        } else {
          console.log("fichier n'est ni jpeg ni png");
        }
        setCount(current => current + 1);
        console.log("analyze rune");
      };

      useEffect(()=>{
        if (preview!=undefined) {
            analyze();
            setFaceActive(null);
        }
      },[preview]);

    return (
        <div className="corpsPage">
            <h1 className="headerPage text-success">
                Facial recognition with AWS
            </h1>
            <div className="bodyPage">
                <div className="imagePage">
                    {preview==undefined?
                        <button className='btn btn-outline-secondary activBouton' onClick={
                            (e)=>{
                                e.preventDefault();
                                fielInputRef.current?.click()
                            }
                        }>Add image</button>
                    :
                        <button className='btn btn-outline-secondary nonActivBouton' onClick={
                            (e)=>{
                                e.preventDefault();
                                fielInputRef.current?.click()
                            }
                        }>Another image</button>
                    }

                    <input 
                    style={{display:"none"}}
                    type="file" 
                    accept='image/*'
                    ref={fielInputRef}
                    onChange={takingImage}/>
                    <div className="contenerImage">
                        <img className='imagePreviw' src={preview?.base64String} alt={preview?.fileName} onClick={
                            (e)=>{
                                e.preventDefault();
                                fielInputRef.current?.click()
                            }
                        }></img>
                            {MarqFace(awsResponsee,faceActive,setFaceActive)}
                    </div>
                </div>

                <AwsGet imageData={image} resultat={setAwsResponsee} count={count} analyze={analyze} resultat2={setOneOneString}/>




                <div className="donnePage">
                    {
                        preview==undefined?<h2>Insert an image with faces</h2>:ChooseFace(awsResponsee,faceActive,setFaceActive)
                    }
                    {
                        faceActive==null?<div></div>:DataFace(awsResponsee[faceActive])
                    }
                </div>
            </div>
        </div>
    );
};

export default Page;