# Flash lecture - Authentication using JSON Web Tokens (JWT)

Considerations for frontend and backend routes using jwt

## React (frontend) route considerations:

1. Some of your routes should be unprotected, some should be protected (ie the `/login` page should be unprotected and present the login form, whilst the `/todos` should be protected)

2. When a route is (tried to be) accessed, React should first make sure that the user has the proper authorization to access that route

3. There are different strategies you can follow to achieve this. One is to have a `<PrivateRoute>` component that will always check if the user is logged in before presenting the route component. If the user is not logged in, they will be kicked out and redirected to login page.
   The official React Router docs have an example specifically for this, using a custom component `<PrivateRoute>`:
   https://reacttraining.com/react-router/web/example/auth-workflow

4. "checking if a user is logged in" means to check if we have an **accessToken** stored in our **localStorage**.

   4b. Not a bad idea to have a helper function **userIsLoggedIn()** that we can call any time we want (maybe in a separate file that we can import wherever we need)

5. To "log a user in" means attempting a POST call to `/api/login` and (if success), STORING the token in **localStorage**

6. To "log a user out" means to DELETE the **localStorage** token and, most likely, redirect to the login page

7. Every server API request to a protected backend route should include the authorization token. This can be in form of an Authorization header (for example **x-access-token**) in the request

   7b. with fetch() this can be a bit tedious. You can check out [Axios](https://github.com/axios/axios) library, which is a wrapper around fetch, and provides methods to "always include a particular header" in our AJAX calls, this way we don't have to bother in explicitly including it every time.

8. Every time an API call returns a **401 Unauthorized**, React should LOG THE USER OUT (see point 6).

   8b. This means we need to check for 401 in every fetch request.. again, tedious. Once more, **Axios** comes to rescue, we can add some handy "check if response is 401" as a default option (and tell it to logout the user)

## Express Guards (middleware)

1. It can be a good idea to have a `/guards` folder in your backend app to store all your guards in a modular way.

2. Create every guard in a file and export it. Giving comprehensive names to your guards/files can be very helpful. Don't be afraid to be verbose in their names. Imagine this:

```
/guards
   - userShouldBeLoggedIn.js
   - todoShouldExist.js
   - todoShouldBelongToUser.js
   - etc...
```

It's pretty clear what every guard does, right? Also every guard should be responsible to throw the appropriate error status to the user if it fails to pass.
Think of what error codes should those be!

3. Now imagine you apply your middleware guards to your routes, such as...

```javascript
app.get(
  "/todos/:id",
  [userShouldBeLoggedIn, todoShouldExist, todoShouldBelongToUser],
  function(req, res) {
    //if we get here, all middleware passed, yay! we're good to go.
    //get your todo resource and send it back to the user!
  }
);
```

4. That's just one of the many possible ways of defining your middleware guards and protecting your routes. Google a bit and you'll find tons of other strategies

5. Use the one that feels more natural to you! There's always more than one way to do the same thing, and all the ways are equally correct. It's just a matter of preference. Read, form an opinion and use what feels right to you and your team.
