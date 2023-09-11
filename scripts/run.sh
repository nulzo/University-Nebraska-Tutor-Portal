# Start dev server (front and backend)

python3 manage.py runserver &
pid[0]=$!
cd frontend-ts;
npx tailwindcss -i ./src/style/globals.css -o ./src/style/output.css --watch &
pid[1]=$!
npm run dev &
pid[2]=$!
trap "kill ${pid[0]} ${pid[1]} ${pid[2]}; exit 1" INT
wait