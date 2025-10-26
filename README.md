# FileWind.js

FileWind is a lightweight JavaScript library that makes handling file uploads simple and intuitive. With just a few lines of code, you can easily read and store uploaded files directly into arrays
Features:
Upload multiple files at once,
Automatically store uploaded files in arrays,
Lightweight and dependency-free,


# Importing the library

    <script src="FileWind.js"></script>
# Initializing a new instance of the library

    const fileLibrary = new FileWind();
# Method loadFile

    let fileId = fileLibrary.loadFile(file, array);
    
   -   **Parameters:**
    
    -   `file` — The file object to be uploaded.
        
    -   `array` — Defines to which array files will be saved.
        
-   **Returns:**
    
    -   `fileId` — A unique identifier for the uploaded file, used for tracking progress or canceling the upload.\

# Method getUploadProgress
`let progress = fileLibrary.getUploadProgress(fileId);`
-   **Parameters:**
    
    -   `fileId` — The unique identifier of the file returned by `loadFile`.
        
-   **Returns:**
    
    -   `progress` — The current upload progress as a percentage (0–100).

# Method cancelUpload

    fileLibrary.cancelUpload(fileId);
-   **Parameters:**
    
    -   `fileId` — The unique identifier of the file returned by `loadFile`.
        
-   **Description:**
    
    -   Cancels an ongoing file upload. Once canceled, the file upload stops immediately. It's also used to delete files from array


