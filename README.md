# Projet DevOps – Application Full Stack

> Authorship: Youssef Jmal, Sofyan Guillermet-Laouad

## Présentation

Ce projet a pour objectif de mettre en œuvre une chaîne DevOps complète autour d’une application full stack.
Il couvre les étapes classiques d’un projet DevOps : développement, tests, conteneurisation, intégration continue,
déploiement et validation sur Kubernetes.

L’application est composée d’un frontend simple, d’un backend Node.js et d’une base de données PostgreSQL,
le tout orchestré via Kubernetes.


## Architecture générale

L’architecture repose sur trois composants principaux :

- Frontend en HTML et JavaScript
- Backend en Node.js avec Express
- Base de données PostgreSQL

Le frontend communique avec le backend via un service Kubernetes.
Le backend expose une API REST et communique avec la base de données PostgreSQL déployée dans le cluster.


## Prérequis

- Docker
- Minikube
- kubectl
- Node.js (pour le développement et les tests locaux)


## Lancement du projet

### Démarrage du cluster Kubernetes

minikube start --driver=docker

### Déploiement des composants Kubernetes

kubectl apply -f k8s/

### Vérification de l’état du cluster

kubectl get pods
kubectl get svc

### Accès au frontend

minikube service frontend


# Backend – API REST

## Endpoint de vérification
- GET /health

Réponse attendue :

{
  "status": "ok",
  "message": "Backend operational"
}

## Gestion des items (CRUD)

Endpoints disponibles :
- GET /items
- POST /items
- PUT /items/:id
- DELETE /items/:id

Les requêtes ont été testées à l’aide de curl et validées lors de la phase de validation.

### Tests

Les tests sont réalisés avec Jest et Supertest.

- Les tests vérifient le bon fonctionnement de l’API
- Le serveur n’est pas lancé pendant les tests
- L’initialisation de la base de données est exclue du contexte de test

## Lancement des tests en local

cd backend

npm test


## Intégration continue (CI)

Une pipeline d’intégration continue est mise en place avec GitHub Actions.

Elle est déclenchée à chaque push ou pull request sur la branche main et effectue les étapes suivantes :

- Installation des dépendances backend
- Exécution des tests automatisés
- Build des images Docker backend et frontend
- Publication des images sur Docker Hub

Le fichier de configuration de la pipeline se trouve dans :

.github/workflows/ci.yml


## État final du projet
- Backend fonctionnel
- Frontend connecté au backend
- Base de données PostgreSQL opérationnelle
- Déploiement Kubernetes fonctionnel avec Minikube
- Pipeline CI opérationnelle
- Tests automatisés validés

## Auteurs

Youssef Jmal et Sofyan Guillermet-Laouad
