# Cooche Website

A hub to create profile for businesses or look for them; considering their geo-location and nationality!

---

---

---

## Data structure

-        db : Cooche  ///  collections: users , businesses
  ***
-        userSession : user object in browser memory {
              username: ,
              email: ,
              given_name: ,
              family_name: ,
              pic: ,
              userHasThePassword: true/false,
             };

\*userHasThePassword ---> true/pssword, // this is equdl to password if user sign-up using google, bcuz he will not set his password by himself; Then, FE will inform him/her in his/her first dashboard-page visiting

---

-        MongoDB have this object in users collection ; {
               username: ,
               email: ,
               given_name: ,
               family_name: ,
               password: ,
               pic: ,
               bookmarks: [....business_id....],
               suggestions: [....business_id....],
               comments: [....business_id....],
               liked_businesses: [....business_id....],
               disliked_businesse: [....business_id....],
               rated_businesse: [{business_id: , rate: }, .....]
               liked_comments: [....comment_id....],
               disliked_comments: [....comment_id....],
             };

\*pic ---> this should be set from server-res bcuz server is returning the file-Cloudinary-url as pic-value if there be any profile-pic uploaded by user

---

- MongoDB have this object in bussinesses collection ; {
-                creator:{
                              id:
                              username:
                              email:
                        }
                  date: "",
                  name: "",
                  category: "",
                  nationality: "",
                  languages: "",
                  address: {
                              address: "",
                              lat: "",
                              lng: "",
                        },
                  connections: {
                              phone: "",
                              email: "",
                              website: "",
                              facebook: "",
                              instagram: "",
                              twitter: "",
                  },
                  description: "",
                  feedbacks: {
                              rates: [....user_id....],
                              like: [....user_id....],
                              dislike: [....user_id....],
                              comments: [  
                                          {\_id: ,
                                          user_photo_url: ,
                                          user_id: ,
                                          comment: ,
                                          date: ,
                                          like_by: [....user_id....] ,
                                          dislike_by: [....user_id....]
                                          } , ......
                                    ]
                  }
            }

---

-      /user/add ----> POST ---> req.body  {
            username: ,
            email: ,
            family_name: ,
            given_name: ,
            password: ,
            pic: ,
            base64: true/false,
      };

\*base64 ---> if pic-value is base64-binary (true) or not and is a url (false) // this key won't save in user-colleciton in db ; this key is included in order to clarifying for BE if pic-value is url or base64 (if it should be converted to url or not)

---

## Cloudinary

For storing user-img-profile;
It hase a provier which icludes these properties

-        const { loginWithRedirect, logout, user, isLoading, isAuthenticated, error } = useAuth0();
