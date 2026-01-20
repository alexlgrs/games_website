@echo off

cd client

CALL npm run build 

echo build du client terminé

cd ..

cd server

npm run dev
GOTO :eof