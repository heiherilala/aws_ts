import React from 'react';
import { importedObject } from '../interface/Interface';
import TrueOrFalse from './TrueOrFalse';

/*
export interface importedObject {
    AgeRange:AgeRange;
    Beard:Beard;
    BoundingBox:BoundingBox;
    Confidence:number;
    Emotions:Emotion[];
    Eyeglasses:Eyeglasses;
    EyesOpen:EyesOpen;
    Gender:Gender;
    Landmarks:Landmark[];
    MouthOpen:MouthOpen;
    Mustache:Mustache;
    Pose:Pose;
    Quality:Quality;
    Smile:Smile;
    Sunglasses:Sunglasses;
}
*/


const DataFace = (data:importedObject) => {
    return (
        <>
            <h2>
            Result:
            </h2>
            <form>
                <div className="form-row">
                    <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">AgeRange</label>
                    <input type="text" className="form-control" id="inputEmail4" value={
                        "between "+ data.AgeRange.Low + " and "+ data.AgeRange.High
                    }/>
                    </div>
                    <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Gender</label>
                    <input type="text" className="form-control" id="inputPassword4" value={
                        "" + data.Gender.Value + " at " + Math.round(data.Gender.Confidence) + "%"
                    }/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Face details:</label>
                    <div className="form-row">
                        {TrueOrFalse(data.Beard,"Beard")}
                        {TrueOrFalse(data.Eyeglasses,"Eyeglasses")}
                        {TrueOrFalse(data.EyesOpen,"EyesOpen")}
                        {TrueOrFalse(data.MouthOpen,"MouthOpen")}
                        {TrueOrFalse(data.Mustache,"Mustache")}
                        {TrueOrFalse(data.Smile,"Smile")}
                        {TrueOrFalse(data.Sunglasses,"Sunglasses")}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Emotions:</label>
                    <div className="form-row">
                        {data.Emotions.map((donne, key)=>{return(
                            <div>
                                {
                                    donne.Confidence>20?
                                    <span  className="personalBadge badge badge-success" style={{margin:"5px",}}>{""+ donne.Type + " at " + Math.round(donne.Confidence*100)/100+"%" }</span>
                                    :
                                    <span  className="personalBadge badge badge-secondary" style={{margin:"5px",}}>{""+ donne.Type + " at " + Math.round(donne.Confidence*100)/100+"%" }</span>
                                }
                            </div>
                        )})}
                    </div>
                </div>
            </form>
        </>
    );
};

export default DataFace;