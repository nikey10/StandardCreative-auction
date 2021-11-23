/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');
const cli = require('cli');
const {PrismaClient} = require('@prisma/client');

dotenv.config();
const db = {
    username: process.env.MYSQL_USER ?? 'server',
    password: process.env.MYSQL_PASSWORD ?? 'password',
    database: process.env.MYSQL_DATABASE ?? 'creator',
    host: process.env.MYSQL_HOST ?? '127.0.0.1',
    port: process.env.MYSQL_PORT ?? 3306,
    dialect: 'mysql',
    forceRefresh: process.env.FORCE_DB_REFRESH === 'true'
};

db.url = process.env.MYSQL_URL ??
    `mysql://${db.username}:${db.password}@${db.host}:${db.port}/${db.database}`;

cli.enable('status');

const options = cli.parse({
    email: [false, 'Email of user to make admin', 'string'],
    locationId: [false, 'locationId to make user locatin-admin of', 'string']
});

cli.main(async () => {
    try {
        const prismaClient = new PrismaClient();

        const identityProviderMatch = await prismaClient.IdentityProvider.findOne({
            where: {
                token: options.email,
                type: 'email'
            }
        });

        if (identityProviderMatch == null) {
            throw new Error('No matching user with email ' + options.email);
        }

        const userId = identityProviderMatch.userId;

        const userMatch = await prismaClient.User.findOne({
            where: {
                id: userId
            }
        });

        userMatch.userRole = 'location-admin';
        const locationAdmin = await prismaClient.LocationAdmin.findOne({
            where: {
                locationId: options.locationId,
                userId: userId
            }
        });

        if (locationAdmin == null) {
            await LocationAdmin.create({
                locationId: options.locationId,
                userId: userId
            });
        }

        await userMatch.save();

        cli.ok(`User with email ${options.email} and ID ${identityProviderMatch.userId} made an admin of location ${options.locationId}` );
        process.exit(0);

    } catch (error) {
        console.log(error);
        cli.fatal(err);
    }
});
