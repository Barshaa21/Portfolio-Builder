// import { useState } from "react";

// export default function Multer() {
//   const [file, setFile] = useState();
//   const handleUpload = () => {};

//   return (
//     <div>
//       <h1>Upload an image</h1>
//       <form method="POST" action="/upload" encType="multipart/form-data">
//         <input type="file" name="image"></input>
//         <input type="submit"></input>
//         <button onClick={handleUpload}>Submit </button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";

export default function Multer() {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      axios
        .post("http://localhost:4000/upload", formData)
        // .post("/upload", formData)
        .then((response) => {
          console.log(response.data); // Handle the response from the server
        })
        .catch((error) => {
          console.error("Error uploading the image:", error);
        });
    } else {
      console.error("No file selected for upload.");
    }
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <h1>Upload an image</h1>
      <form encType="multipart/form-data">
        <input type="file" name="image" onChange={handleFileChange} />
        <input type="button" value="Submit" onClick={handleUpload} />
      </form>
    </div>
  );
}
