# devTinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password //Forgot Password Api

## connectionRequestRouter
- POST /request/send/intrested/:userId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId


## userRouter
- GET /user/connections
- GET /user/request
- GET /user/feed - gets you the profiles of other users on platform

status: ignore, interested, accepted, rejected
