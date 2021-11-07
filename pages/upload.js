import React, { useState, useEffect } from "react";
import Router from "next/router";

const Upload = (props) => {
  const [imageUploaded, setImageUploaded] = useState();
  const [uploaded, setuploaded] = useState(false);
  const [prop, setprop] = useState(props);
  const handleChange = (event) => {
    setImageUploaded(event.target.files[0]);
  };

  const submitData = async (e) => {
    e.preventDefault();

    if (!imageUploaded) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", imageUploaded);

      await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      setuploaded(true);
      console.log("set value");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(async () => {
    console.log("Remoive###");
    const res = await fetch(`${process.env.SERVER_PATH}/api/images`);
    const images = await res.json();
    setprop(images);
  }, [uploaded]);
  return (
    <>
      <div className="page">
        <form onSubmit={submitData}>
          <h1>Upload Image</h1>

          <input
            onChange={handleChange}
            accept=".jpg, .png, .gif, .jpeg"
            type="file"
          ></input>

          <input type="submit" value="Upload" />
        </form>
      </div>
      <>
        <div className="page">
          <main>
            {prop.images.map((image) => (
              <img
                src={`https://res.cloudinary.com/${process.env.CLOUD_NAME}/v${image.version}/${image.publicId}.${image.format}`}
                key={image.publicId}
              />
            ))}
          </main>
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

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.SERVER_PATH}/api/images`);
  const images = await res.json();
  return {
    props: { images },
  };
};

export default Upload;
