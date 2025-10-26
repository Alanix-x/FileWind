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
    
    -   `file` — The file to be uploaded.
     
    -   `array` — Defines to which array files will be saved.
        
-   **Returns:**
    
    -   `fileId` — A unique identifier for the uploaded file, used for tracking progress or canceling the upload.\

# Method getUploadProgress
`let progress = fileLibrary.getUploadProgress(fileId);`
-   **Parameters:**
    
    -   `fileId` — The unique identifier of the file returned by `loadFile`.
        
-   **Returns:**
    
    -   `progress` — The current upload progress as a percentage (0–100).
 
# Method formatFileSize
`let size = fileLibrary.formatFileSize(file);`
-   **Parameters:**
    
    -   `file` — File to check size
        
-   **Returns:**
    
    -   `size` — Formatted file size, e.g. instead of 1024 MB it will be written 1 GB

# Method cancelUpload

    fileLibrary.cancelUpload(fileId);
-   **Parameters:**
    
    -   `fileId` — The unique identifier of the file returned by `loadFile`.
        
-   **Description:**
    
    -   Cancels an ongoing file upload. Once canceled, the file upload stops immediately. It's also used to delete files from array

# Example of usage on the HTML page

    <!DOCTYPE  html>

    <html>
    
	    <head>
	    
		    <script  src="FileWind.js"></script>
	    
	    </head>
	    
	    <body>
	    
		    <form>
		    
		    <input  id="inputid"  type="file"  multiple>
		    
		    </form>
		    
		    <button  onclick="upload()">Upload files</button>
		    
		    <ul  id="fileList"></ul>
	    
	      
	    
	    <script>
	    
		    let  array = [];
		    
		      
		    
		    const  fileLibrary = new  FileWind();
		    
		      
		    
			function upload() {
				const input = document.getElementById("inputid");
			    for (let i = 0; i < input.files.length; i++) {
			      const file = input.files[i];
			      const fileId = fileLibrary.loadFile(file, array);
			      let size = fileLibrary.formatFileSize(file);
			      const li = document.createElement("li");
			      li.id = "file-" + fileId;
			      const fileName = document.createElement("span");
			      fileName.textContent = file.name + " - " +"size: " + size + " - ";
			      const progressSpan = document.createElement("span");
			      progressSpan.textContent = "0%";
			      progressSpan.id = "progress-" + fileId;
			      const removeBtn = document.createElement("button");
			      removeBtn.textContent = "Remove";
			      removeBtn.onclick = () => removeFile(fileId);
			      li.appendChild(fileName);
			      li.appendChild(progressSpan);
			      li.appendChild(removeBtn);
			      document.getElementById("fileList").appendChild(li);
			      const interval = setInterval(() => {
			        const progress = fileLibrary.getUploadProgress(fileId);
			        progressSpan.textContent = progress + "%";
			        if (progress >= 100) clearInterval(interval);
			      }, 500);
			    }
			    input.value = "";
			}
		    
		    function  removeFile(fileId) {
		    
			    fileLibrary.cancelUpload(fileId);
			    
			    const  li = document.getElementById("file-" + fileId);
			    
			    if (li) li.remove();
		    
		    }
	    
	    </script>
	    
	    </body>
    
    </html>

