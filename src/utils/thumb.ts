import type { IFile } from "components/Admin/AttendCare/upload/types";

export const getFilePreview = (file: File): Promise<IFile> => {
  return new Promise((resolve, reject) => {
    try {
      if (file.type.startsWith("video/")) {
        getVideoThumb(file).then(resolve).catch(reject);
      } else {
        resolve(getImgThumb(file));
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getVideoThumb = (file: File): Promise<IFile> => {
  return new Promise((resolve, reject) => {
    const videoElement = document.createElement("video");
    videoElement.muted = true;

    const onCanPlay = () => {
      videoElement.currentTime = videoElement.duration / 2; // 중간 지점
    };

    const onSeeked = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (ctx) {
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        const thumbnail = canvas.toDataURL();
        resolve({
          file,
          thumbnail,
          video: URL.createObjectURL(file),
          duration: getVideoDuration(videoElement.duration)
        });
      } else {
        reject(new Error("CanvasRenderingContext2D is not available"));
      }

      cleanUp(videoElement, onCanPlay, onSeeked);
    };

    // 이벤트 리스너 추가
    videoElement.addEventListener("canplay", onCanPlay);
    videoElement.addEventListener("seeked", onSeeked);

    videoElement.src = URL.createObjectURL(file);
    videoElement.load();
  });
};

const cleanUp = (videoElement: HTMLVideoElement, ...handlers: { (): void; (): void }[]) => {
  handlers.forEach((handler) => {
    videoElement.removeEventListener("canplay", handler);
    videoElement.removeEventListener("seeked", handler);
  });
  URL.revokeObjectURL(videoElement.src);
};

const getImgThumb = (file: File): IFile => {
  return {
    file,
    thumbnail: URL.createObjectURL(file)
  };
};

export function getVideoDuration(duration: number) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  // const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");

  return `${minutes.toString()}:${paddedSeconds}`;
}
