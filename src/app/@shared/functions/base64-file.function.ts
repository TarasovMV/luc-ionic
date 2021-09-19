export function dataURLtoFile(dataUrl: string, filename: string = 'default'): File {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type: mime});
}

export async function urlToDataUrl(imageUrl: string): Promise<string> {
    const proxy = 'https://api.codetabs.com/v1/proxy?quest=';
    let res;
    try {
        res = await fetch(
            imageUrl,
            {cache: 'no-cache'}
        );
    } catch (e) {
        res = await fetch(proxy + imageUrl);
    }
    const blob = await res.blob();
    console.log(res);

    return new Promise((resolve, reject) => {
        const reader: FileReader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as string);
        };
        reader.readAsDataURL(blob);
    });
}
