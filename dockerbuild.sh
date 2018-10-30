HEROKU_APP=vast-brushlands-70321
docker build -t nestjs-poc -t registry.heroku.com/${HEROKU_APP}/web .
