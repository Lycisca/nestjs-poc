
HEROKU_APP=vast-brushlands-70321
./dockerbuild.sh
docker push registry.heroku.com/${HEROKU_APP}/web
heroku container:release web
