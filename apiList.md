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
- POST /request/send/:status/:userId
- here status should be interested & ignored

- POST /request/review/:status/:requestId 
- here status should be accepted & rejected


## userRouter
- GET /user/connections
- GET /user/request
- GET /user/feed - gets you the profiles of other users on platform

status: ignore, interested, accepted, rejected
