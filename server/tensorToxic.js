const toxicity = require('@tensorflow-models/toxicity');
const {attemptData, metaCanadaData, goingToHellData, dankMemesData, wholesomeMemeData, eyeBleachData, classicWowData} = require('./sandbox')

//RANDOM SUBREDDITS
// r/therewasanattempt/ - TOTAL HIT COUNT: 12
// r/classicWow/ - TOTAL HIT COUNT: 8

//KNOWN TOXIC
// r/metacanada/ - TOTAL HIT COUNT: 11
// r/ImGoingToHellForThis/ - TOTAL HIT COUNT: >13, tensor errored out
// r/DankMemes/ - TOTAL HIT COUNT: 15

// KNOWN WHOLESOME
// r/wholesomememes/ - TOTAL HIT COUNT: 4
// r/Eyebleach/ - TOTAL HIT COUNT: 1

//Data to pass to Tensor model, takes frist 20 for time reasons, need to improve proformance latter, C++ tie-in
let inputData = classicWowData
let toxicityCount = 0

const threshold = 0.9;
toxicity.load(threshold).then(model => {
  for (let i = 0; i < inputData.length; i++) {
    model.classify(inputData[i]).then(predictions => {
      console.log(inputData[i])
      console.log(predictions[6])
      if (predictions[6].results[0].match === true) {
        toxicityCount ++
        console.log(toxicityCount)
      }
    })
  };
});
