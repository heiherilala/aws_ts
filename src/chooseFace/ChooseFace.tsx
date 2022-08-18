import React from 'react';
import { importedObject } from '../interface/Interface';
import './style.css'

const ChooseFace = (data:importedObject[],faceActive:number | null,setFaceActive:React.Dispatch<React.SetStateAction<number | null>>) => {
    if (faceActive==null) {
        return(
            <>
                <h2>Choose a face:</h2>
                {data.map((donne, key)=>{
                    return(
                        <button type='button' className="chooseFace btn btn-primary" onClick={()=>setFaceActive(key)}>
                            {"face "} 
                            <span className="badge badge-light">{key}</span>
                            <span className="sr-only">unread messages</span>
                        </button>
                    )
                })}
            </>
        )

    }else{
        return(
            <>
                <h2>Choose a face:</h2>
                {
                    data.map((donne, key)=>{
                        if (key==faceActive) {
                            return(
                                <button type='button' className="chooseFace btn btn-success">
                                    {"face "} 
                                    <span className="badge badge-light">{key}</span>
                                    <span className="sr-only">unread messages</span>
                                </button>
                            )
                        }else{
                            return(
                                <button type='button' className="chooseFace btn btn-secondary" onClick={()=>setFaceActive(key)}>
                                    {"face "} 
                                    <span className="badge badge-light">{key}</span>
                                    <span className="sr-only">unread messages</span>
                                </button>
                            )
                        }
                    })
                }
            </>
        )

    }
};

export default ChooseFace;