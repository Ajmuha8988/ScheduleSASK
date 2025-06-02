const sqlConfig = {
    user: 'sa',
    password: '111',
    database: 'SchedDB',
    server: 'DESKTOP-5TRN7CE',
    options: {
        trustConnection: true,
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}; 
export default sqlConfig;