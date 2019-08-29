const toxicity = require('@tensorflow-models/toxicity');
//From r/therewasanattempt/ - TOTAL HIT COUNT: 12
const {attemptData} = require('./sandbox')
//From r/metacanada - TOTAL HIT COUNT: 11
const {metaCanadaData} = require('./sandbox')
//From r/ImGoingToHellForThis/ - TOTAL HIT COUNT: >13
const {goingToHellData} = require('./sandbox')

//Data to pass to Tensor model, takes frist 20 for time reasons, need to improve proformance latter, C++ tie-in
let inputData = goingToHellData
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
