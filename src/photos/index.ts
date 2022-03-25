import { PhotoProps } from 'react-photo-gallery';

// defaults for typecheck to succeed
export type ExtendedPhotoProps = { webpSrc?: string; hash?: string };
export const photosReverseIndex = {} as Record<string, number>;
export default [] as PhotoProps<ExtendedPhotoProps>[];
