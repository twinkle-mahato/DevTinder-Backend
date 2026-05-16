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

- GET /user/request/received
- GET /user/connections
- GET /user/feed - gets you the profiles of other users on platform

status: ignore, interested, accepted, rejected


# Deployment

- signup on AWS
- Launch instance
- icacls "devTinder-secret.pem" /inheritance:r /grant:r "$($env:USERNAME):(R)"
- ssh -i "devTinder-secret.pem" ubuntu@ec2-13-54-241-53.ap-southeast-2.compute.amazonaws.com
- install node 22.17.0
- git clone
- Frontend
   -  npm install => install dependencies
   - npm run build
   - sudo apt update
   - sudo apt install nginx
   - sudo systemctl start nginx
   - sudo systemctl enable nginx
   - copy code from dist(build files) to /var/www/html/ [ sudo scp -r dist/* /var/www/html/]
   -  cd /var/www/html/
   - enable port :80 of your instance

- Backend
    - install pm2 -g
    - pm2 start npm -- start
    - pm2 logs
    - pm2 flush <name>, pm2 list, pm2 stop <name>, pm2 delete <name>
    - config nginx - sudo nano /etc/nginx/sites-available/default
    - restart nginx -- sudo systemctl restart nginx
    - modified the base url url to "/api"

    frontend : http://13.54.241.53/
    backend : http://13.54.241.53:7777

    nginx config -->

    server_name 13.54.241.53;
     location /api/ {
        proxy_pass http://localhost:7777/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
