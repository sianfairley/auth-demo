# Flash lecture - Authentication using JSON Web Tokens (JWT)

## Table of contents

- [Setup](#setup)
  - [Database prep](#database-prep)
  - [Dependencies](#dependencies)
  - [Development](#development)
- [Resources](#resources)
- [Guide](#guide)
  - [Explanation](#explanation)
  - [Code](#code)
  - [React (frontend) route considerations](#react--frontend--route-considerations)

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

### Dependencies

- Run `npm install` in project directory. This will install server's project dependencies such as `express`. Run also `npm install jsonwebtoken bcrypt` to install the two new packages we will need.

- After you create your database on mysql directly, run `npm run migrate` in your project directory in order to create the DB table "users".

- `cd client` and run `npm install`. This will install client dependencies (React).



### Development

- Run `npm start` in project directory to start the Express server on port 4000
- `cd client` and run `npm run dev` to start client server in development mode with hot reloading in port 5173.
- Client is configured so all API calls will be proxied to port 4000 for a smoother development experience. Yay!

## Resources

- [JWT website](https://jwt.io/)
- [jsonwebtoken NPM documentation](https://www.npmjs.com/package/jsonwebtoken)

## Guide

### Explanation

1. The registration process is done through POSTMAN (no front-end form).

2. The login API route, when successful, will return a token

3. The client will store this token in localStorage

4. The client will pass this token along with every request to a protected API endpoint, through the `authorization` header

5. The server will verify the token and will respond with the appropriate data, or an error if authentication failed.

### Code

1. Create a backend route for login. 

```javascript
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const results = await db(
      `SELECT * FROM users WHERE username = "${username}"`
    );
    const user = results.data[0];
    if (user) {
      const userID = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

      var token = jwt.sign({ userID: userID }, supersecret);
      res.send({ token });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
```

2. Test this endpoint in Postman. Test it with invalid username and password, and then a valid one. Show how you get a valid token back.

3. Create a frontend form to test the login. Check the `/client/src/components/Login.jx`. The main function is `login()`

```javascript
const login = async () => {
  try {
    //1. send credentials to server
    let options = {
      method: "POST",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    }
    const results = await fetch("/api/users/login", options);
    const data = await results.json(); // this is my token
    console.log(data.token);

    //2. get token from server and store in localStorage
    localStorage.setItem("token", data.token);

    } catch(err) {
      console.log(err);
    }
};
```

4. Create another endpoint in the backend for getting private data.

TBD

5. In the frontend, create a new method to request protected data.

TBD


### React (frontend) route considerations

1. Some of your routes should be unprotected, some should be protected (ie the `/login` page should be unprotected and present the login form, whilst the `/private` should be protected)

2. When a route is (tried to be) accessed, React should first make sure that the user has the proper authorization to access that route

3. "checking if a user is logged in" means to check if we have an **accessToken** stored in our **localStorage**.

4. To "log a user in" means attempting a POST call to `/api/users/login` and (if success), STORING the token in **localStorage**

5. To "log a user out" means to DELETE the **localStorage** token and, most likely, redirect to the login page

6. Every server API request to a protected backend route should include the authorization token. This can be in form of an Authorization header (for example **authorization**) in the request

7. Every time an API call returns a **401 Unauthorized**, React could LOG THE USER OUT (see point 5).




_This is a project that was created at [CodeOp](http://CodeOp.tech), a full stack development bootcamp in Barcelona._
