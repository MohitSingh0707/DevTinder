# DevTinder API

<!-- AuthRouter -->
- POST /Signup
- POST /login
- POST /logout

<!-- ProfileRouter -->
- GET /Profile/view
- PATCH /Profile/edit
- PATCH /profile/password

<!-- ConnectionRequestRouter -->
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

<!-- UserRouter -->
- GET /user/connections
- GET /user/request
- GET /user/feed - Gets you the profiles of other users on platform 

Status : ignore, interested, accepted, rejected