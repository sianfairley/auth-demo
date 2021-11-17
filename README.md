# Flash lecture - Authentication using JSON Web Tokens (JWT)

## Table of contents

- [Setup](#setup)
  - [Database prep](#database-prep)
  - [Dependencies](#dependencies)
  - [Development](#development)
- [Resources](#resources)
- [Guide](#guide)
  - [Preparation](#preparation)
  - [In class](#in-class)
    - [Explanation](#explanation)
    - [Code](#code)
- [React (frontend) route considerations](#react--frontend--route-considerations)
- [Express Guards (middleware)](#express-guards--middleware-)

## Setup

```bash
git checkout start
```

### Database prep

- Create a local MySQL database.
- Add a `.env` to your root folder containing the MySQL authentication information for the root user as well as the name of your database. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_PASS=YOURPASSWORD
  DB_NAME=YOURDATABASE
  SUPER_SECRET=shhhhhhh
```

- Run `npm run migrate` in your terminal in order to create the DB tables.

### Dependencies

- Run `npm install` in project directory. This will install server's project dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Development

- Run `npm start` in project directory to start the Express server on port 5000
- `cd client` and run `npm start` to start client server in development mode with hot reloading in port 3000.
- Client is configured so all API calls will be proxied to port 5000 for a smoother development experience. Yay!
- You can test your client app in `http://localhost:3000`

## Resources

- [JWT website](https://jwt.io/)
- [jsonwebtoken NPM documentation](https://www.npmjs.com/package/jsonwebtoken)

## Guide

### Explanation

1. Draw on the whiteboard the basic schema of communication between client and server. Explain that some routes will be protected.

2. The login API route, when successful, will return a token

3. The client will store this token in localStorage

4. The client will pass this token along with every request to a protected API endpoint, through the `x-access-token` header

5. The server will verify the token and will respond with the appropriate data, or an error if authentication failed.

### Code

1. `npm install jsonwebtoken bcrypt`

2. Create a backend route for login. Explain the whole process.

```javascript
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const results = await db(
      `SELECT * FROM users WHERE username = "${username}"`
    );
    const user = results.data[0];
    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

      var token = jwt.sign({ user_id }, supersecret);
      res.send({ message: "Login successful, here is your token", token });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
```

3. Test this endpoint in Postman. Test it with invalid username and password, and then a valid one. Show how you get a valid token back.

4. Create a frontend form to test the login. Check the `/client/src/components/Login.js`. The main function is `login()`

```javascript
const login = async () => {
  try {
    const { data } = await axios("/users/login", {
      method: "POST",
      data: credentials,
    });

    //store it locally
    localStorage.setItem("token", data.token);
    console.log(data.message, data.token);
  } catch (error) {
    console.log(error);
  }
};
```

5. Create another endpoint in the backend to test that the token is valid. For this, explain how to extract the authentication logic into a separate guard file is good for reusability. Check file `/guards/userShouldBeLoggedIn.js`

```javascript
router.get("/profile", userShouldBeLoggedIn, function (req, res, next) {
  res.send({
    message: "Here is the PROTECTED data for user " + req.user_id,
  });
});
```

```javascript
var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

function userShouldBeLoggedIn(req, res, next) {
  const token = req.headers["authorization"].replace(/^Bearer\s/, "");
  if (!token) {
    res.status(401).send({ message: "please provide a token" });
  } else {
    jwt.verify(token, supersecret, function (err, decoded) {
      if (err) res.status(401).send({ message: err.message });
      else {
        //everything is awesome
        req.user_id = decoded.user_id;
        next();
      }
    });
  }
}

module.exports = userShouldBeLoggedIn;
```

6. In the frontend, create a new method to request protected data.

```javascript
const requestData = async () => {
  try {
    const { data } = await axios("/users/profile", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    console.log(data.message);
  } catch (error) {
    console.log(error);
  }
};
```

Considerations for frontend and backend routes using JWT

## React (frontend) route considerations

1. Some of your routes should be unprotected, some should be protected (ie the `/login` page should be unprotected and present the login form, whilst the `/todos` should be protected)

2. When a route is (tried to be) accessed, React should first make sure that the user has the proper authorization to access that route

3. There are different strategies you can follow to achieve this. One is to have a `<PrivateRoute>` component that will always check if the user is logged in before presenting the route component. If the user is not logged in, they will be kicked out and redirected to login page.
   The official React Router docs have an example specifically for this, using a custom component `<PrivateRoute>`:
   https://reacttraining.com/react-router/web/example/auth-workflow

   3b. A more advanced example is available at https://reactrouter.com/docs/en/v6/examples/auth. It uses the `createContext` API. Ultimately, it is the preferred way, but at this point, students don't know what the Context API is yet.

4. "checking if a user is logged in" means to check if we have an **accessToken** stored in our **localStorage**.

   4b. Not a bad idea to have a helper function **userIsLoggedIn()** that we can call any time we want (maybe in a separate file that we can import wherever we need)

5. To "log a user in" means attempting a POST call to `/api/login` and (if success), STORING the token in **localStorage**

6. To "log a user out" means to DELETE the **localStorage** token and, most likely, redirect to the login page

7. Every server API request to a protected backend route should include the authorization token. This can be in form of an Authorization header (for example **authorization**) in the request

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
  function (req, res) {
    //if we get here, all middleware passed, yay! we're good to go.
    //get your todo resource and send it back to the user!
  }
);
```

4. That's just one of the many possible ways of defining your middleware guards and protecting your routes. Google a bit and you'll find tons of other strategies

5. Use the one that feels more natural to you! There's always more than one way to do the same thing, and all the ways are equally correct. It's just a matter of preference. Read, form an opinion and use what feels right to you and your team.

_This is a project that was created at [CodeOp](http://CodeOp.tech), a full stack development bootcamp in Barcelona._
