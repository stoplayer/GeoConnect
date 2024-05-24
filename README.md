# GeoConnect

## Table des Matières
1. Apérçu
2. Architecture Logiciel
3. Frontend
4. Backend
5. Prérequis
6. Installation et execution 
7. Usage
8. Folder Structure
9. Dependencies
10. Contribution

## Overview
GeoConnect est une application mobile innovante qui représente une avancée majeure dans le domaine des communications numériques. Elle allie des fonctionnalités de recherche avancée des identités liées aux numéros de téléphone à des capacités de localisation précise. Cette combinaison unique permet aux utilisateurs de vérifier l'identité des appelants, de gérer les appels indésirables, et de localiser des contacts à proximité, facilitant ainsi les interactions sociales et professionnelles.

## Software Architecture
L'application GeoConnect a été développée en utilisant les technologies suivantes :

- Front-end : React Native
- Back-end : Spring Boot
![Spring mvc](Images\spring-mvc.png)

Base de données : MySQL est utilisé pour stocker toutes les données de l'application.
Spring Boot : Fournit le cadre pour le back-end, gère les requêtes HTTP, et intègre les composants.
Spring Data JPA : Gère l'accès aux données et les opérations CRUD.
Service Layer : Contient la logique métier de l'application.
Repository Interface : Définit les contrats pour les services.
Entity Model : Comprend les objets qui représentent les entités de la base de données.
REST API Controller : Gère les requêtes HTTP des clients et renvoie les réponses appropriées.
Front-end : Développé avec React-native, communique avec le back-end via des appels API REST.

Cette architecture permet de bénéficier des avantages de chacune de ces technologies, offrant une expérience utilisateur fluide et des performances optimales.


## Frontend
Le front-end de GeoConnect a été développé avec React Native, offrant une expérience utilisateur intuitive et réactive sur divers appareils mobiles. L'interface utilisateur a été conçue pour être simple et agréable à utiliser.

## Backend
Le back-end de GeoConnect a été développé avec Spring Boot, assurant des performances élevées et une gestion efficace des données. Il intègre également des mesures de sécurité robustes pour garantir la confidentialité des données et la protection contre les accès non autorisés.


## Prérequis

- Node.js
- npm package
- java JDK 17
- Maven 4
- MySQL
- Application ExpoGo sur votre propre smartphone/Emulateur  sur Android Studio

## Installation et execution 
### Partie Frontend

1. **Clonez le dépôt Git** :
    ```sh
    git clone https://github.com/stoplayer/NumberBook-app.git
    ```
2. **Naviguez vers le répertoire du projet** :
    ```sh
    cd Frontend-Master
    ```

3. **Installez les packages nécessaires** :
    ```sh
    npm install
    ```

4. **Démarrez l'application avec Expo** :
    ```sh
    npx expo start  

    ```

    - **Expo Go** : Scannez le QR code avec l'application Expo Go sur votre appareil mobile pour voir l'application en action.
    Assurez vous de bien changer l'adresse " 192.168.1.15" dans les requêtes axios (exemple: "http:/192.168.1.15:7071/signing")à votre localhost adresse (executez la commande "ipconfig" dans votre terminal et copier coller votre adresse ipv4 depuis la section Wireless LAN adapter Wi-Fi)

    - **Simulateur/Émulateur** : Vous pouvez également démarrer l'application dans un simulateur iOS ou un émulateur Android depuis l'interface Expo.

### Partie Backend

1. **Clonez le dépôt Git du backend** :
    ```sh
    git clone https://github.com/stoplayer/NumberBook-app.git
    ```

2. **Naviguez vers le répertoire du projet** :
    ```sh
    cd backend
    ```

3. **Assurez-vous d'avoir Maven et Java installés** :
    ```sh
    mvn -v
    java -version
    ```

4. **Configuration de la base de données** :
    - Créez une base de donnée MySQL
    ```sh 
    CREATE DATABASE databasename;
    ```
    -  Assurez-vous que les configurations nécessaires pour votre base de données sont présentes dans le fichier `application.properties` ou `application.yml`.
    ```sh
    spring.datasource.url=jdbc:mysql://localhost:8080/databasename
    spring.datasource.username=your-username
    spring.datasource.password=your-password
    ```
    5. **Compilez et exécutez l'application Spring Boot** :
    ```sh
    mvn spring-boot:run
    ```

    - Démarrez votre base de données et assurez-vous qu'elle est accessible par l'application Spring Boot.

En suivant ces étapes, vous aurez configuré et démarré avec succès à la fois le frontend et le backend de GeoConnect.


## Usage
Une fois l'application lancée, les utilisateurs peuvent :
- Rechercher des identités liées à des numéros de téléphone
- Localiser des contacts dans un rayon spécifique
- Recevoir des alertes personnalisées sur la présence de contacts importants à proximité
- Personnaliser les paramètres de notification selon leurs préférences

## Folder Structure
Le projet GeoConnect est organisé de la manière suivante :
GeoConnect/
```
├── Frontend-Master/
│   ├── src/
│   ├── package.json
│   └── ...
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
├── README.md
└── ...
```

## Dependencies
Les principales dépendances du projet GeoConnect sont :
- React Native
Le front-end de GeoConnect a été développé avec React Native, offrant une expérience utilisateur intuitive et réactive sur divers appareils mobiles. L'interface utilisateur a été conçue pour être simple et agréable à utiliser.

### Main Dependencies Frontend

Le frontend de GeoConnect est construit avec plusieurs dépendances clés qui assurent une application robuste et efficace. Voici les principales dépendances utilisées dans ce projet :

- **React Native**: `react-native@0.74.1` - La bibliothèque principale pour construire des applications mobiles natives en utilisant React.
- **Expo**: `expo@~51.0.7` - Un framework et une plateforme pour les applications React universelles qui offre un ensemble d'outils et de services pour les projets React Native.
- **React Navigation**: 
  - `@react-navigation/native@^6.1.17` - La bibliothèque de navigation principale pour le routage et la navigation dans les applications React Native.
  - `@react-navigation/stack@^6.3.29` - Le navigateur de pile pour gérer l'historique de navigation.
- **Axios**: `axios@^1.6.8` - Un client HTTP basé sur les promesses pour faire des requêtes API.
- **Async Storage**: `@react-native-async-storage/async-storage@^1.23.1` - Un système de stockage de clés-valeurs asynchrone, non chiffré et persistant pour React Native.
- **React Native Maps**: `react-native-maps@1.14.0` - Une bibliothèque fournissant des composants de carte pour iOS et Android.
- **Expo Location**: `expo-location@~17.0.1` - Une API pour accéder aux données de localisation de l'appareil.
- **Expo Contacts**: `expo-contacts@~13.0.3` - Une API pour accéder à la liste de contacts de l'appareil.
- **Expo Linear Gradient**: `expo-linear-gradient@~13.0.2` - Un composant pour rendre un fond en dégradé.
- **Geolib**: `geolib@^3.3.4` - Une bibliothèque pour les calculs de géolocalisation.


- Spring Boot : 
Le back-end de GeoConnect a été développé avec Spring Boot, assurant des performances élevées et une gestion efficace des données. Il intègre également des mesures de sécurité robustes pour garantir la confidentialité des données et la protection contre les accès non autorisés.

### Main Dependencies for backend

Le backend de GeoConnect est construit avec plusieurs dépendances clés qui assurent une application robuste et efficace. Voici les principales dépendances utilisées dans ce projet :

- **Spring Boot Starter Data JPA**: `org.springframework.boot:spring-boot-starter-data-jpa`
- **Spring Boot Starter Security**: `org.springframework.boot:spring-boot-starter-security`
- **Spring Boot Starter Web**: `org.springframework.boot:spring-boot-starter-web`
- **MySQL Connector**: `com.mysql:mysql-connector-j`
- **PostgreSQL**: `org.postgresql:postgresql`
- **Lombok**: `org.projectlombok:lombok`
- **JWT (JSON Web Token)**:
  - `io.jsonwebtoken:jjwt-impl`
  - `io.jsonwebtoken:jjwt-api`
  - `io.jsonwebtoken:jjwt-jackson`
- **Spring Boot Starter Test**: `org.springframework.boot:spring-boot-starter-test`
- **Spring Security Test**: `org.springframework.security:spring-security-test`
- **Spring Boot Starter Mail**: `org.springframework.boot:spring-boot-starter-mail`


Consultez les fichiers `package.json` et `pom.xml` pour la liste complète des dépendances.

## Contributeurs :
- ELABOUDI Wail
- GHOULAM Nouhaila
- AMAL Yassine
- LABRACH Youssef
- ROUKNY Anas

## Contributing
Les contributions sont les bienvenues ! Si vous souhaitez contribuer au projet GeoConnect, veuillez suivre les étapes suivantes :

1. Forkez le dépôt
2. Créez une nouvelle branche pour vos modifications
3. Effectuez vos changements et testez-les
4. Soumettez une pull request avec une description détaillée de vos modifications