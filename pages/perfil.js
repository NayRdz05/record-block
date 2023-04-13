
import { useState } from 'react';
import Head from 'next/head'


export default function Home() {
    const [imageSrc, setImageSrc] = useState();
    const [uploadData, setUploadData] = useState();

    /**
     * handleOnChange
     * Se activa cuando cambia la entrada del archivo (por ejemplo, cuando se selecciona un archivo)
     */

    function handleOnChange(changeEvent) {
        const reader = new FileReader();

        reader.onload = function (onLoadEvent) {
            setImageSrc(onLoadEvent.target.result);
            setUploadData(undefined);
        }
        reader.readAsDataURL(changeEvent.target.files[0]);
    }

    /**
     * handleOnSubmit
     * Se activa cuando se envía el formulario principal
     */

    async function handleOnSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;
        const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

        const formData = new FormData();

        for (const file of fileInput.files) {
            formData.append('file', file);
        }

    }

    return (
        <div>
            <Head>
                <title>Imagen</title>
            </Head>

            <main>
                <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
                    <p>
                        <input type="file" name="file" />
                    </p>

                    <img src={imageSrc} />

                    {imageSrc && !uploadData && (
                        <p>
                            <button>Subir Imagen</button>
                        </p>
                    )}

                </form>
            </main>

        </div>
    )
}