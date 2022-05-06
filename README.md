# Cooche 

## Functionality
A crowd source platform as a database of all the businesses for people to look for businesses based on their owners's nationality, supported languages for customer services and location.

## Demand
In countries with a large immigrant population, most of the time, people refer to businesses which belong to or are operated by their compatriots due to various reasons, such as trust, language barriers, familiarity with their wants, being the only source for a particular product or services, and etc.
And this website will be so handy for these kind of people.

---

## Build With

Front-End:
- React
- JavaScript
- CSS
- HTML

Bak-End:
- Node.js
- Express.js
- MongoDB

API: 
- MapBox-API
- Auth0
- Google-API
- Cloudinary-API

---
## Features: 
- Authentication using Auth0
- Using Cloudinary-API to upload medias from BE
- Location-search using react-places-autocomplete
- Location-search using mapBox autocomplete along with visualization on map - custom marker 
- Location-list using mapBox 
  - Locating result of searches on the map
  - Listing result of search, paired with markers on the map
  - Triggering location-markers and list-items as the pairs
  - Conditional styling based on user interaction with map
  - Loading data in pop-ups along with markers on the map
  - Customized style for pop-ups on the map;
- Using conditional option-sllect
- Using react-select
- Using reusable components 
- Dynamic query using node.js pared with a main filter in home page
- DarkMode 
- Using Contexta and most of the hooks 
- Real-time Form validation along with specific error-message
- Delivering password to users signed-up with OAuth

### Will be added soon:
- Password change;
- Edit Profile;
- Bookmarking businesses;
- Commenting on businesses;
- Like/Dislike on businesses;
- Like/Dislike on comments;
- Features presentation clips on [Youtube-channel](https://www.youtube.com/playlist?list=PLLLQiihmrNNlZ0ytWwaEmlJmRqGosIJ63)


---
## Challenges: 

1. I had a hard time deciding on authentication API at first; however, after implementing Google's authentication API, I continued searching for other options and found Auth0's authentication API to be more clear and handy, so I switched over to Auth0's authentication API.

2. Cloudinary-API has multiple options such as widgets in FE, just doing the API call and sending media to Cloudinary, or uploading media on base64 to BE then Cloudinary; I chose the last option to learn more about this API rather than just adding a widget!

3. It was quite challenging to use react-places-autocomplete to provide autocomplete address input, because there was not enogh detail provided in its docs. Therefore, after having its component working, I shared it as a public repository on Github [(An autocomplete address input)](https://github.com/Davoudr/location);
Further, since I was not satisfied with this option for later use, I looked for another alternative; there I found Mapbox as the best answer, and I added it as the second option for address-autocompletion.

4. The business location had to be displayed on a map; I chose Mapbox because it offers powerful map features and amazing customization (styling map, creating color palette, customizing view angle, adding data-layers, styling pop-ups and etc), which I couldn't get with Google-API; Although, as I was trying google-api, before switching to Mapbox, I shared it as a public repository on Github[(A react component to return a google-map + marker onClick)](https://github.com/Davoudr/location);