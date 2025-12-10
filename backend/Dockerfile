FROM node:20-alpine

# Dossier de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Port exposé par l'app
EXPOSE 3000

# Commande de démarrage
CMD ["node", "index.js"]
