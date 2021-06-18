//EXAMPLE TO CREATE AND CONSUME PROMISES

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const body = document.querySelector("body");

const loadImage = function (imgPath) {
  const newPromise = new Promise((resovle, reject) => {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", () => {
      body.appendChild(img);
      resovle(img);
    });

    img.addEventListener("error", () => {
      reject(new Error("IMAGE NOT FOUND"));
    });
  });

  return newPromise;
};

let image;

loadImage(
  "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg"
)
  .then((img) => {
    image = img;
    console.log("IMAGE 1 LOADED");
    return wait(3);
  })
  .then(() => {
    image.src = "";
    console.log("IMAGE 1 REMOVED");
    return loadImage(
      "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg"
    );
  })
  .then((img) => {
    image = img;
    console.log("IMAGE 2 LOADED");
    return wait(3);
  })
  .then(() => {
    image.src = "";
    console.log("IMAGE 2 REMOVED - END");
  })
  .catch((err) => {
    console.log(err.message);
  })
  .finally(() => {
    let text = document.createElement("h1");
    text.innerHTML =
      "Finally. ! All Promises Fulfilled Irrespective Of Resolve Or Reject. ! ";
    body.appendChild(text);
  });
