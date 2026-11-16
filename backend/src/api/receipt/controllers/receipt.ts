/**
 * receipt controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::receipt.receipt', {
    async find(ctx) {
        const receipt = await strapi.documents("api::receipt.receipt").findMany({
            populate: {
                user: true,
                file: true,
            }
        });

        // traer rol desde plugin
        for (const r of receipt) {
            if (r.user) {
                const usuario = await strapi
                    .query("plugin::users-permissions.user")
                    .findOne({
                        where: { id: r.user.id },
                        populate: ["role"],
                    });

                r.user.role = usuario.role;
            }
        }

        return receipt;

    }
});
