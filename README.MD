#### Docker com a imagem postgreSQL

docker run --name database -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres