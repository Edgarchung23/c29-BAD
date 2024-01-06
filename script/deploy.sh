set -e
set -o pipefail
steps=4
server=c29bad
server_dir="c29-bad-grp3"
echo ==========[1/$steps] Build Typescript Project ... ==========
npm run build

# <------------------------------------------------------------------------------------------->

echo ==========[2/$steps] Upload to EC2 Server ... ==========
scp -r \
  package.json \
  dist \
  public \
  "$server:$server_dir/"
# <------------------------------------------------------------------------------------------->

echo ==========[3/$steps] Install Dependencies ... ==========
ssh $server "
source ~/.nvm/nvm.sh
cd $server_dir
npm install --omit=dev
"
echo ==========[4/$steps] Update Database ... ==========
ssh $server "
source ~/.nvm/nvm.sh
cd $server_dir
cp .env dist/
cd dist 
npx knex migrate:latest
"

# <------------------------------------------------------------------------------------------->

echo ==========[Done] Deployment Finished ==========
