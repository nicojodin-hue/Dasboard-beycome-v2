# investor.beycome.com

## Test locally

Install PHP 8 locally and run:

```
cd public
php -S localhost:8000
```

It's now accessible on: http://localhost:8000/

## Test with Dockerfile

```
docker build -t beycomeinvestor-local .
docker run --rm -e PORT=80 -p 8080:80 beycomeinvestor-local
```

## Deployment

Automatic on main branch via Github Action
