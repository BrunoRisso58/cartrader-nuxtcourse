import { PrismaClient } from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient();

const schema = Joi.object({
    make: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().min(1889).max(new Date().getFullYear() + 1),
    miles: Joi.number().required().min(0),
    city: Joi.string().min(2).required(),
    numberOfSeats: Joi.number().max(1000).min(1).required(),
    description: Joi.string().min(20).required(),
    features: Joi.array().items(Joi.string()).required(),
    image: Joi.string().required(),
    listerId: Joi.string().required(),
    price: Joi.number().min(0).required(),
    name: Joi.string().required()
});

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const {error, value} = await schema.validate(body);

    if (error) {
        throw createError({
            statusCode: 412,
            statusMessage: error.message
        })
    }

    const {
        image,
        name,
        numberOfSeats,
        features,
        description,
        miles,
        price,
        listerId,
        city,
        make,
        model,
    } = body;

    const car = await prisma.Car.create({
        data: {
            image,
            name,
            numberOfSeats,
            features,
            description,
            miles,
            price,
            listerId,
            city,
            make,
            model,
        }
    })

    return {car};
})