# Cooche Website

A hub to create profile for businesses or look for them; considering their geo-location and nationality!
____________
____________
____________
## Data structure
-        userSession : user object in browser memory {
              username: <sth>,
              email: <sth>,
              given_name: <sth>,
              family_name: <sth>,
              pic: <sth>, 
              userHasThePassword: true/false,
             };

\*userHasThePassword ---> true/pssword, // this is equdl to password if user sign-up using google, bcuz he will not set his password by himself; Then, FE will inform him/her in his/her first dashboard-page visiting
____________
-        MongoDB expects this object; {
               username: <sth>,
               email: <sth>,
               given_name: <sth>,
               family_name: <sth>,
               password: <sth>,
               pic: <sth>,
             };

\*pic ---> this should be set from server-res bcuz server is returning the file-Cloudinary-url as pic-value if there be any profile-pic uploaded by user

____________
 /user/add endpoint expect this obj 
-         req.body  {
            username: <sth>,
            email: <sth>,
            family_name: <sth>,
            given_name: <sth>,
            password: <sth>,
            pic: <sth>,
            base64: true/false, 
      };

\*base64 ---> if pic-value is base64-binary (true) or not and is a url (false) // this key won't save in user-colleciton in db ; this key is  included in order to clarifying for BE if pic-value is url or base64 (if it should be converted to url or not)
____________
## Cloudinary

For storing user-img-profile;
It hase a provier which icludes these properties

-        const { loginWithRedirect, logout, user, isLoading, isAuthenticated, error } = useAuth0();

