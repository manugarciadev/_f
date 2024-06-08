echo "Switching to branch master"

git checkout master

echo "Building app..."

npm run build

echo "Deploying files to server..."

scp -r build/* f22@172.24.110.156:/var/www/172.24.110.156/

echo "Done!"