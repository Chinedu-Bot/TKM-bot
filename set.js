const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUEzYVh2SmJ6Y1JxeVlTVW1Sd1hKc29wL2VtVVZiMnRZa3RtYnYvY0dXaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMFNVbjNzM2RVcDJ1OEExZ3dtZ3hpZ20xWVg5Y2U5bno4YTZXZjE3S0ZIWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzSmxXOTdYeVRCeUEvMjQvODJyNU80WHlBTTE5cElZNEgrN3FhN3NOSWtVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzaU44bk02MUpWZUpjSGNqM3p6Mkt0NTlRVWd5am01dzVYampmSWtBVFF3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBKZEZWT29OamdOZ3YrcEduSktqUy9pVXRzWG1sUXZ3RzdZVUpsbE5nbk09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJ2YzQ3VlRDcGxTTHBKbW1ZbFVoYllKQ2RFZG1NbWwxQjEyWWY0YVE3UUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkZOejExdmZWclF3NnNCK2x4YnZLQkZDbEh2eEZ5Vko3R0NQWDd5NURVVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUnluS0kvcU9RR2I3QWVFMFpNZE1peE1xRk84RjRtSnRLSWNYak5hMDF3cz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNUTTVqMVNyMTBGZ0tZY2VkOUsvdkZIQVBkbW5WSmNKenhGeGJBbkJwaE9PaTd0bnl5OTgxQXRGOUoyakRVN2NBVUpDSkdqcE1tR3p1YVNhZ1llUkJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjU0LCJhZHZTZWNyZXRLZXkiOiJEYlJyRi9rek5abUF1eWV4U0NDV1Y3UTMrNXVlVGVLT2hHQWNiOTRKaHJRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJITjNPX2NGdFJJZTFJTEtyVDNCMTdBIiwicGhvbmVJZCI6IjgwNjdlNWM4LWUxYWQtNGZmYi1hZjFkLTQ2MmRmNjZhYjRhMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJNi96RmhFaDU0VmYvczJ5aFJDNG5JTkJCMGM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVnlQcFBCRWdoa1M4UXFSV3FlRVBKdXJnR3RjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkI3UkNBWUtEIiwibWUiOnsiaWQiOiIyMzQ3MDQ3NTA0ODYwOjI4QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPcXU0S2NHRU03emdic0dHQXdnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI0SmlJaEQ0Zlp1bzRNYUFXMCtSdnlLMG5pd3hPU0ZTVHpUMVVOcm52d0JzPSIsImFjY291bnRTaWduYXR1cmUiOiJnbFB0emNGN1ptOHJjbVJhNHBvZGxuai96d24yOUhkNGpmUzhxZVpUZVpSeDltY0I5OCtwQ1gxRzF6eUlDZ3BZTHJ1TU9yYlIvSm82OEFSd0tibm9EZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiWFRFR2RmbWo0K2d3OGRsWlh4MEhNVXBPRUFhTGtUWm5hS2RaUUVnLzJET3JqUUpOaXNueXgwN1F6bVRQeDNjS1cwaXJGZ2R5UUk5OTNpSW0vTVN3QlE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ3MDQ3NTA0ODYwOjI4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmVDWWlJUStIMmJxT0RHZ0Z0UGtiOGl0SjRzTVRraFVrODA5VkRhNTc4QWIifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzQzNzU4OTksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSXBtIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
