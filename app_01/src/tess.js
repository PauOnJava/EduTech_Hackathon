import React, {useState} from 'react';
import Tesseract from 'tesseract.js';

const TComponent = () =>{
    const [image,setImage] = useState(null);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const ImageUpload = (event) =>{
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const perform = () =>{
        if(!image) return;
        setLoading(true);
        Tesseract.recognize(
            image,'eng',
            {
                logger:(m)=> console.log(m),
            }
        ).then(({data:{text}})=>{
            setText(text);
            setLoading(false);
        }).catch((err)=>{
            console.error('nu merge',err)
            setLoading(false);
        });

    };
    return(
    <div>
        <h2>Upload Image</h2>
        <input type='file' accept='image/*' onChange={ImageUpload}/>
        <button onClick={perform} disabled={!image ||loading}>Trmite{loading ? 'Extrage...':'extrage text'}</button>
    </div>);

}

export default TComponent;