/*
----------------------------------------------------
    FileWind Library for saving files in arrays
                Made by Alan Weiss
        https://github.com/Alanix-x/FileWind
----------------------------------------------------
*/

class FileWind {
    constructor() {
        this.uploads = new Map();
        this.uploadCounter = 0;
    }

    loadFile(file, targetArray) {
        if (!file || !Array.isArray(targetArray)) return;

        this.uploadCounter++;
        const uploadId = file.name + this.uploadCounter;

        const reader = new FileReader();

        const uploadData = {
            file,
            progress: 0,
            canceled: false,
            done: false,
            error: false,
            reader,
            targetArray
        };

        this.uploads.set(uploadId, uploadData);

        reader.onprogress = e => {
            if (e.lengthComputable && !uploadData.canceled) {
                uploadData.progress = Math.round((e.loaded / e.total) * 100);
            }
        };

        reader.onload = e => {
            if (!uploadData.canceled) {
                uploadData.progress = 100;
                uploadData.done = true;
                targetArray.push({ 
                    name: file.name, 
                    data: e.target.result,
                    uploadId 
                });
            }
        };

        reader.onerror = () => {
            if (!uploadData.canceled) {
                uploadData.done = true;
                uploadData.error = true;
            }
        };

        reader.readAsDataURL(file);

        return uploadId;
    }

    getUploadProgress(uploadId) {
        const upload = this.uploads.get(uploadId);
        if (!upload) return null;
        if (upload.error) return "error";
        return upload.progress;
    }

    cancelUpload(uploadId) {
        const upload = this.uploads.get(uploadId);
        if (!upload) return;

        upload.canceled = true;
        upload.reader.abort();

        const index = upload.targetArray.findIndex(f => f.uploadId === uploadId);
        if (index !== -1) upload.targetArray.splice(index, 1);

        this.uploads.delete(uploadId);
    }

    removeFile(uploadId) {
        const upload = this.uploads.get(uploadId);

        if (upload) {
            if (!upload.done) this.cancelUpload(uploadId);
        }

        if (upload) {
            const index = upload.targetArray.findIndex(f => f.uploadId === uploadId);
            if (index !== -1) upload.targetArray.splice(index, 1);
        }

        this.uploads.delete(uploadId);
    }

    formatFileSize(file) {
        if (!file || typeof file.size !== "number") return "Error";

        let size = file.size;
        const units = ["B", "KB", "MB", "GB", "TB"];
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return size.toFixed(2) + " " + units[unitIndex];
    }
}

window.FileWind = FileWind;
