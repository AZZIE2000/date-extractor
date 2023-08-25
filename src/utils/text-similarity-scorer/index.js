let similarity = require("./Similarity");
let similarityScore = require("./SimilarityScore");

const abstractSim = (s1, s2) => {
  let winkOpts = {
    f: similarityScore.dl, //winklerMetaphone , metaphoneDl , dl , commonScore
    options: { threshold: 0.5 },
  };

  return similarity(s1, s2, winkOpts);
};

export { abstractSim };
