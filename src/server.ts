import { createServer, Factory, Model, type Registry } from 'miragejs';
import type { ModelDefinition } from 'miragejs/-types';
import type Schema from 'miragejs/orm/schema';
import type { Property } from './shared/interfaces';
import { faker } from '@faker-js/faker';

const PropertyModel: ModelDefinition<Property> = Model.extend({});

type AppRegistry = Registry<
  {
    property: typeof PropertyModel;
  },
  {}
>;
type AppSchema = Schema<AppRegistry>;

export function makeServer({ environment = 'test' }) {
  return createServer({
    environment,

    models: {
      property: PropertyModel,
    },

    factories: {
      property: Factory.extend({
        created_at() {
          return faker.date.past();
        },
        updated_at() {
          return faker.date.past();
        },
        rented_at() {
          return faker.date.past();
        },
        name() {
          return faker.helpers.arrayElement([
            'Maison',
            'Appartement',
            'Villa',
            'Pavillon',
          ]);
        },
        status() {
          return faker.helpers.arrayElement(['available', 'not-available']);
        },
        surface() {
          return faker.datatype.float({ min: 20, max: 1000, precision: 0.01 });
        },
        image() {
          return 'https://source.unsplash.com/random/?' + this.name;
        },
        amount() {
          return faker.datatype.number({ min: 500, max: 2000 });
        },
        address() {
          return {
            number: faker.datatype.number({ min: 1, max: 100 }),
            street: faker.address.street(),
            postcode: faker.address.zipCode(),
            city: faker.address.city(),
          };
        },
        tenants() {
          const randomNumber = faker.datatype.number({
            min: 1,
            max: 5,
          });

          const result = [];

          for (let i = 0; i < randomNumber; i++) {
            result.push({
              id: faker.helpers.unique(faker.datatype.number, [{ min: 1 }]),
              firstname: faker.name.firstName(),
              lastname: faker.name.lastName(),
            });
          }

          return result;
        },
      }),
    },

    seeds(server) {
      server.createList('property', 20);
    },

    routes() {
      this.namespace = 'api';

      this.get('/properties', (schema: AppSchema) => {
        return schema.properties.all().models;
      });

      this.post('/properties', (schema: AppSchema, request) => {
        let attrs = JSON.parse(request.requestBody);

        // Soucis avec la méthode POST qui me renvoie une erreur de max call stack size exceeded
        // console.log(attrs);

        return schema.properties.create({ attrs });
      });

      this.patch('/properties/:id', (schema: AppSchema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);

        return schema.properties.find(id).update(attrs);
      });
    },
  });
}
