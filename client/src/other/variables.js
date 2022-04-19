// a func to convert arr of str to lowercase
const arrOfStrToLowerCase = (arr) => arr.map((ele) => ele.trim().toLowerCase());
// ========================================================================
// ========================================================================
// ========================================================================
// auth0 credintials
const auth0 = {
  domain: "https://dev-a7kpdx50.us.auth0.com",
  clientId: "9mNwMjIS0Nr5WX09fX9fVA5euSFykjCd",
};
// ========================================================================
// default profile-pic for users
const imgUrl = {
  defaultUserIcon:
    "https://res.cloudinary.com/cooche/image/upload/v1650009476/Temporary/usericon_xjjnho.png",
};
// ========================================================================
// list of nationalities coverd in the website services
const nationalitiesList = [
  "Iranians",
  "Canadian",
  "Filipino",
  "Chinese",
  "Egyptian",
  "Indians",
];
const nationalitiesArr = arrOfStrToLowerCase(nationalitiesList).sort();
// ====================================
// list of language used to categorize businesses
const languagesList = ["Filipino", "Persian", "Arabic", "French", "English"];
const languagesArr = arrOfStrToLowerCase(languagesList).sort();
// ====================================
// list of cities used to categorize businesses
const citiesList = [
  "Ottawa",
  "Montreal",
  "Toronto",
  "Vancouver",
  "Calgary",
  "Edmonton",
  "Quebec",
  "Hamilton",
  "London",
  "Kitchener",
];
const citiesArr = arrOfStrToLowerCase(citiesList).sort();
// ====================================
const categoriesList = [
  "Education",
  "Healthcare",
  "Foodstuffs",
  "Sport",
  "Financial",
  "Judiciary",
  "Migration",
  "vehicles",
  "Building and house",
  "Electronic devices",
  "Entertainment",
];
const categoriesArr = arrOfStrToLowerCase(categoriesList).sort();
// ====================================
// list of social acount options for businesses profiles
const socialMediaList = ["instagram", "twitter", "facebook", "website"];
const socialMediaArr = arrOfStrToLowerCase(socialMediaList).sort();
// ========================================================================
export {
  auth0,
  imgUrl,
  categoriesArr,
  nationalitiesArr,
  languagesArr,
  citiesArr,
  socialMediaArr,
};
