FROM node:20-bullseye

WORKDIR /app

COPY package*.json .
COPY tsconfig.json .
RUN npm install

RUN apt update
RUN apt install -y texlive-latex-extra
RUN apt install -y latexmk

COPY . .

EXPOSE 8100
CMD ["npm", "start"]