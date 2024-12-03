// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import { storage } from "./firebase";

// const uniqueIdentifier = `image_${Date.now()}_${Math.floor(
//   Math.random() * 10000
// )}`;

// const uploadImage = async (fileName, file, setProgressStatus) => {
//   try {
//     // Ensure fileName is a string
//     const sanitizedFileName = String(fileName).replace(/\s+/g, "");
//     const storageRef = ref(
//       storage,
//       `${sanitizedFileName}/${uniqueIdentifier} ${file.name}`
//     );

//     // Upload the file to the storage bucket
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     // Register an observer to track the upload progress
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         // Calculate progress percentage
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("Upload is " + progress + "% done");
//         // Update the progress status
//         setProgressStatus(progress);
//       },
//       (error) => {
//         // Handle unsuccessful uploads
//         console.error("Error uploading image:", error);
//         throw error; // Re-throw the error for handling in the caller function
//       },
//       async () => {
//         // Handle successful uploads on complete
//         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//         // Reset progress status or perform any other action on upload completion
//         setProgressStatus(null);
//         return downloadURL;
//       }
//     );

//     await uploadTask;
//     console.log(uploadTask, "fromImage");
//     // Return the upload task for potential use in the caller function
//     return getDownloadURL(uploadTask.snapshot.ref);
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     throw error; // Re-throw the error for handling in the caller function
//   }
// };

// export default uploadImage;
//=======================================
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

const uploadImage = async (folderName, file, setProgressStatus) => {
  const uniqueIdentifier = `image_${Date.now()}_${Math.floor(
    Math.random() * 10000
  )}`;

  try {
    // Sanitize folderName and prepare the file path
    const sanitizedFolderName = String(folderName).replace(/\s+/g, "_");
    const storageRef = ref(
      storage,
      `${sanitizedFolderName}/${uniqueIdentifier}_${file.name.replace(/\s+/g, "_")}`
    );

    // Upload the file with resumable upload
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Return a promise that resolves on upload completion
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress.toFixed(2)}% done`);
          if (setProgressStatus) setProgressStatus(progress);
        },
        (error) => {
          console.error("Error uploading image:", error);
          reject(error); // Reject the promise on error
        },
        async () => {
          // Resolve the promise with the download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at:", downloadURL);
          if (setProgressStatus) setProgressStatus(null); // Reset progress status
          resolve(downloadURL);
        }
      );
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadImage;
