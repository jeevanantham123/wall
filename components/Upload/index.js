import axios from "axios";
import React, { useState, useEffect } from "react";
// import Router from "next/router";

const Upload = (props) => {
  const [imageUploaded, setImageUploaded] = useState();
  const imageData = props?.uploadData;
  const [fetched, setfetched] = useState(false);
  const [received, setreceived] = useState();
  const handleChange = (event) => {
    setImageUploaded(event.target.files[0]);
    setreceived(URL.createObjectURL(event.target.files[0]));
  };
  const submitData = async (e) => {
    setfetched(false);
    e.preventDefault();
    if (!imageUploaded) {
      return;
    }
    const formData = new FormData();
    formData.append("image", imageUploaded);
    await axios
      .post("/api/upload", formData)
      .then((Response) => {
        props?.setuploadData(Response.data);
        setfetched(true);
        setImageUploaded();
        URL.revokeObjectURL(received);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {!fetched ? (
        <div className="page">
          <form onSubmit={submitData}>
            <h1>Upload Image</h1>
            {received ? (
              <img src={received} alt="" />
            ) : (
              <input
                onChange={handleChange}
                accept=".jpg, .png, .gif, .jpeg"
                type="file"
              ></input>
            )}
            <input type="submit" value="Upload" />
          </form>
        </div>
      ) : null}
      <>
        <div className="page">
          {imageData ? (
            <main>
              <img
                src={`https://res.cloudinary.com/${process.env.CLOUD_NAME}/v${imageData.version}/${imageData.publicId}.${imageData.format}`}
                key={imageData.id}
              />
            </main>
          ) : null}
        </div>
      </>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .image {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .image:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .image + .image {
          margin-top: 2rem;
        }
      `}</style>
    </>
  );
};

// export const getServerSideProps = async () => {
//   const res = await fetch(`${process.env.SERVER_PATH}/api/images`);
//   const images = await res.json();
//   return {
//     props: { images },
//   };
// };

export default Upload;
