taskkill /f /t /im php.exe
cd ../output
RunHiddenConsole php -S localhost:8000
npm start
