import axios, { AxiosProgressEvent } from "axios";
import { ImageLoaderProps } from "next/image";
import agent from "./agent";

const ASSET_UPLOAD_URL = process.env.NEXT_PUBLIC_ASSET_UPLOAD_URL ?? '';
const ASSET_UPLOAD_TOKEN = process.env.NEXT_PUBLIC_ASSET_UPLOAD_TOKEN ?? '';

export async function uploadAssetAsync(
    file: File,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) {
    try {
        const formData = new FormData();
        formData.append('fileUpload', file);
        const result = await axios
            .post(ASSET_UPLOAD_URL, formData, {
                withCredentials: false,
                headers: {
                    Authorization: `Bearer ${ASSET_UPLOAD_TOKEN}`,
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*'
                },
                onUploadProgress
            })
            .then((response) => response.data);

        if (result) {
            await agent.Assets.publish(result.id)
        }

        return result;
    } catch (error) {
        console.error(error);
    }
}

export const GraphCMSImageLoader = ({ src, width }: ImageLoaderProps) => {
    if (!src) return '/assets/placeholder.webp';
    return `https://media.graphcms.com/resize=fit:max,height:${width},width:${width}/output=format:webp/${src}`;
};

