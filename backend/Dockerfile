FROM node:20-bullseye

WORKDIR /app

COPY package*.json .
COPY tsconfig.json .
RUN npm install

RUN apt-get update

RUN apt install -y texlive-latex-base 
RUN apt install -y texlive-latex-recommended 
RUN apt install -y texlive-latex-extra 
RUN apt install -y texlive-fonts-recommended 
RUN apt install -y texlive-lang-all
RUN apt install -y latexmk
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt install -y firejail

COPY . .

EXPOSE 8100
CMD ["npm", "start"]