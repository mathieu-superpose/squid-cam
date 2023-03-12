/*
const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};
*/

export const drawHand = (predictions, ctx) => {
  // Check if we have predictions
  if (!predictions?.length) return;

  // Loop through each prediction
  predictions.forEach((prediction) => {
    // Grab landmarks
    const landmarks = prediction.landmarks;

    // Loop and draw landmarks
    for (const landmark of landmarks) {
      // retrieve xyz
      const [x, y, z] = landmark;

      // start drawing
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 3 * Math.PI);

      // stop drawing
      ctx.fillStyle = "indigo";
      ctx.fill();
    }
  });
};
