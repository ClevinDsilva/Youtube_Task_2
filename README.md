# Create new directory
mkdir youtube-video-task
cd youtube-video-task

# Initialize with npm
npm init -y

# Install specific stable versions
npm install next@14.2.13 react@18.2.0 react-dom@18.2.0 lucide-react@0.309.0

# Install dev dependencies
npm install -D tailwindcss@3.4.1 postcss@8.4.38 autoprefixer@10.4.19 typescript@5.4.5 @types/node@20.12.7 @types/react@18.2.66 @types/react-dom@18.2.22

# Initialize Tailwind
npx tailwindcss init -p

npm install lucide-react

npm run dev

Demo link:- ([youtube-task-2.vercel.app])
