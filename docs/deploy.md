#Deploy with heroku

## Heroku login

```
heroku login
```

## Logging in to the registry

```
heroku container:login
```

## Building image

```
./dockerbuild.sh
```

## Push image

```
docker push registry.heroku.com/${HEROKU_APP}/web
```

## Deploy new release

Use latest image for release

```
heroku container:release web
```

## Snippet

```
deploy.sh
```
