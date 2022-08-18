import { DetectFacesCommand } from "@aws-sdk/client-rekognition";
import { Buffer } from "buffer";
import { useEffect, useState } from "react";
import { importedObject } from "../interface/Interface";

const { fromCognitoIdentityPool } = require("@aws-sdk/credential-providers");
const {
  RekognitionClient,
  /*DescribeCollection,*/
} = require("@aws-sdk/client-rekognition");

const credentials = fromCognitoIdentityPool({
  identityPoolId: "eu-west-2:371cdf1c-657e-4e3f-a6a0-3cdcf905bfdc",
  clientConfig: { region: "eu-west-2" },
});

interface Props {
  imageData: string;
  resultat: React.Dispatch<React.SetStateAction<importedObject[]>>;
  count: number;
  analyze: () => void;
  resultat2: React.Dispatch<any>;
};

const AwsGet: React.FC<Props> = ({imageData, resultat, count, analyze, resultat2}) => {
  //const [result, setResult] = useState<any>();
  


  useEffect(() => {
    
    // 👇️ don't run on initial render
    if (count !== 0) {
      facedetails();
    }
  }, [(count && imageData)]);

  
  const facedetails = async () => {
    
    const client = new RekognitionClient({
      region: "eu-west-2",
      credentials,
    });

    let imgTosend = Buffer.from(imageData, "base64");

    const params = {
      Image: {
        Bytes: imgTosend,
      },
      Attributes: ["ALL"],
    };

    const detectFacesCommand = new DetectFacesCommand(params);
    try {
      const data = await client.send(detectFacesCommand);
      //console.log('resultat apres la fonction: '+data);
      resultat(data.FaceDetails);
      resultat2(data.FaceDetails[0].Confidence);
      console.log(data);
      console.log(data.FaceDetails);
      return data;
    } catch (error) {
      console.log(error);
      console.log("C'est ici XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    }
  };

    return (
      <></>
    )
};

export default AwsGet;
