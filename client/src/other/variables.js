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
  "Any",
  "Iranians",
  "Canadian",
  "Filipino",
  "Chinese",
  "Egyptian",
  "Indians",
  "Syrians",
];
const nationalitiesArr = arrOfStrToLowerCase(nationalitiesList).sort();
// ====================================
// list of language used to categorize businesses
const languagesList = ["Filipino", "Persian", "Arabic", "French", "English"];
const languagesArr = arrOfStrToLowerCase(languagesList).sort();
// ====================================
// list of cities used to categorize businesses
const countryllList = [
  { name: "United-States", ll: [-97.9222112121185, 39.3812661305678] },
  { name: "Canada", ll: [-105.750595856519, 55.5859012851966] },
  { name: "France", ll: [2.61878695312962, 47.8249046208979] },
  { name: "England", ll: [-0.676181762467007, 52.38145972] },
  { name: "Germany", ll: [10.0183432948567, 51.1334813439932] },
];
const locationList = {
  "United-States": {
    ll: [-97.9222112121185, 39.3812661305678],
    provinces: [
      "California",
      "Texas",
      "Florida",
      "New York",
      "Pennsylvania",
      "Illinois",
      "Ohio",
      "Georgia",
      "North Carolina",
      "Michigan",
      "New Jersey",
      "Virginia",
      "Washington",
      "Arizona",
      "Massachusetts",
    ],
  },
  Canada: {
    ll: [-105.750595856519, 55.5859012851966],
    provinces: [
      "Ontario",
      "Quebec",
      "British Columbia",
      "Alberta",
      "Manitoba",
      "Saskatchewan",
      "Nova Scotia",
      "New Brunswick",
      "Newfoundland and Labrador",
      "Prince Edward Island",
    ],
  },
  Germany: {
    ll: [10.0183432948567, 51.1334813439932],
    provinces: [
      "North Rhine-Westphalia",
      "Bavaria",
      "Baden-Württemberg",
      "Lower Saxony",
      "Hesse",
      "Rhineland-Palatinate",
      "Saxony",
      "Berlin",
      "Schleswig-Holstein",
      "Brandenburg",
      "Saxony-Anhalt",
      "Thuringia",
      "Hamburg",
      "Mecklenburg-Western Pomerania",
      "Saarland",
      "Bremen",
    ],
  },
  France: {
    ll: [2.61878695312962, 47.8249046208979],
    provinces: [
      "Island of France",
      "Auvergne-Rhône-Alps",
      "New Aquitaine",
      "Upper France",
      "Occitania",
      "Great East",
      "Provence-Alps-Azure Coast",
      "Loire Countries",
      "Brittany",
      "Normandy",
      "Burgundy-Free County",
      "Centre-Loire Valley",
    ],
  },
  England: {
    ll: [-0.676181762467007, 52.38145972],
    provinces: [
      "South East",
      "London",
      "North West",
      "East of England",
      "West Midlands",
      "South West",
      "Yorkshire and the Humber",
      "East Midlands",
      "North East",
    ],
  },
};

// ====================================
const categoriesList = [
  "Education",
  "Healthcare",
  "Foodstuffs",
  "Sport",
  "Financial",
  "Judiciary",
  "Migration",
  "Vehicles",
  "Building and house",
  "Electronic devices",
  "Entertainment",
  "Excursion"
];
const categoriesArr = arrOfStrToLowerCase(categoriesList).sort();
// ====================================
// list of social acount options for businesses profiles
const socialMediaList = ["instagram", "twitter", "facebook", "website"];
const socialMediaArr = arrOfStrToLowerCase(socialMediaList).sort();
// ========================================================================

export {
  locationList,
  auth0,
  imgUrl,
  categoriesArr,
  nationalitiesArr,
  languagesArr,
  socialMediaArr,
};
