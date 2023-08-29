// const test = /قبل \d+ ([اأ]يام|شهر|اشهر|اسبوع)/gm;
// const word = "قبل 5 ايام";
// const res = new RegExp(test).test(word);
// console.log(res);

// console.log(5555555555555555555555555);

// const word = "قبل 5 أيام";
// const word2 = "بعد شهر";

// let word3 = "بعد ثلاث شهور و اثنان يوم";
// const cases = ["واحد", "اثنين|اثنان", "تلت|ثلاث|ثلاثة|ثلث|تلاتة"];

// cases.forEach((c, i) => {
//   console.log("------------------", i);
//   const test = new RegExp(c, "gm");
//   let res;
//   while ((res = test.exec(word3)) !== null) {
//     console.log(res[0]);
//     word3 = word3.replaceAll(res[0], `${i + 1}`);
//   }
// });
// console.log(word3);
// function matchTimeUnits(text: string) {
//   const beforAfterRegex = /(قبل|بعد) ?(\d+)? (ايام|اسابيع|ا?شهر|(?:ا|أ)سبوع)/gm;
//   const preparedText = text.normalize("NFKD").replace(/[\u064b-\u065f]/g, "");
//   let match;
//   while ((match = beforAfterRegex.exec(preparedText)) !== null) {
//     console.log("Matched:", match[0]); // The whole matched pattern
//     console.log("Before/After:", match[1]); // قبل or بعد
//     console.log("Number:", match[2] || "N/A"); // The matched numeric value or "N/A" if not present
//     console.log("Time unit:", match[3]); // The matched time unit
//   }
// }
// const ss = /(واحد|اثن(?:ين|ان)?|ثلاث(?:ة|ه)?)/gm;
// const testText = " ثلاثه واحد";
// let match;

// // NOTE: SET EXAMPLE
// var theDate = new Date(2013, 12, 15);
// console.log(theDate);
// var myNewDate = new Date(theDate);
// myNewDate.setDate(myNewDate.getDate() - 1);
// myNewDate.setMonth(myNewDate.getMonth() - 1);
// console.log(myNewDate);
