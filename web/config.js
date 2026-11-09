const config = {
    nom: "420-SN1 - Programmation en sciences",
    description: "Site du cours 420-SN1 Programmation en sciences au cégep Édouard-Montpetit.",
    nomUrl: "420-SN1"
}

// Version hors-ligne (npm run offline) : le site est servi à la racine (http://localhost:3000/)
config.baseUrl = process.env.OFFLINE === "1" ? "/" : `/${config.nomUrl}/`;

module.exports = config;
