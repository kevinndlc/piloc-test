<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import { z } from 'zod';
import { toFormValidator } from '@vee-validate/zod';
import type {
  Property,
  PropertyAddress,
  PropertyTenant,
} from '@/shared/interfaces';
import InputGroup from '../molecules/InputGroup.vue';
import Button from '../atoms/Button.vue';
import Heading from '../atoms/Heading.vue';
import { useParcStore } from '@/stores/parc';
import { useRouter } from 'vue-router';
import Avatar from '../atoms/Avatar.vue';

const props = defineProps<{
  property?: Property;
}>();

console.log(props.property?.id);

const parcStore = useParcStore();
const router = useRouter();

const initialValues = {
  name: props.property?.name ?? '',
  image:
    props.property?.image ?? 'https://source.unsplash.com/random/?apartment',
  status: props.property?.status ?? '',
  amount: props.property?.amount ?? 0,
  surface: props.property?.surface ?? 0,
  address: props.property?.address ?? {
    number: '',
    street: '',
    postcode: '',
    city: '',
  },
  tenants: props.property?.tenants ?? [],
};

const required = { required_error: 'Veuillez renseigner ce champ' };

const validationSchema = toFormValidator(
  z.object({
    name: z
      .string(required)
      .min(3, { message: 'Le nom doit faire au moins 3 caractères' })
      .max(50, { message: 'Le nom doit faire moins de 50 caractères' }),
    status: z.string(required).min(1, 'Veuillez renseigner le statut'),
    image: z.string(required).min(1, "Veuillez renseigner l'URL de l'image"),
    amount: z
      .number(required)
      .min(1, { message: 'Le loyer doit être supérieur à 0€' }),
    surface: z
      .number(required)
      .min(1, { message: 'La surface doit au moins faire 1m²' }),
    address: z.object({
      number: z.union([z.number(required).min(1, { message: 'Veuillez saisir le numéro'}), z.string(required).min(1, { message: 'Veuillez saisir le numéro'})])
    }),
    tenants: z.array(
      z.object({
        firstname: z
          .string(required)
          .min(3, {
            message:
              'Le prénom du locataire doit contenir au moins 3 caractères',
          }),
        lastname: z
          .string(required)
          .min(3, {
            message: 'Le nom du locataire doit contenir au moins 3 caractères',
          }),
      })
    ),
  })
);

const { handleSubmit, isSubmitting } = useForm({
  validationSchema,
  initialValues,
});

const { value: nameValue, errorMessage: nameErrorMessage } = useField('name');
const { value: imageValue, errorMessage: imageErrorMessage } =
  useField('image');
const { value: statusValue, errorMessage: statusErrorMessage } =
  useField('status');
const { value: amountValue, errorMessage: amountErrorMessage } =
  useField('amount');
const { value: surfaceValue, errorMessage: surfaceErrorMessage } =
  useField('surface');
const { value: addressValue, errorMessage: addressErrorMessage } =
  useField('address');
const { value: tenantsValue, errorMessage: tenantsErrorMessage } =
  useField('tenants');

const trySubmit = handleSubmit(async (formValues, { resetForm }) => {
  try {
    if (!props.property) {
      await parcStore.addProperty(formValues);
    } else {
      await parcStore.editProperty(props.property.id, formValues);
    }
    router.push({ name: 'Dashboard' });
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <form @submit="trySubmit" class="space-y-8">
    <fieldset class="grid grid-cols-2 gap-4 border p-4 rounded-lg bg-gray-50">
      <legend class="text-xs uppercase font-bold text-green-600">
        Propriété
      </legend>
      <InputGroup
        v-model="(nameValue as string)"
        title="Nom"
        type="text"
        placeholder="Maison de ville"
        :error-message="nameErrorMessage"
        focus
      />
      <InputGroup
        v-model="(statusValue as string)"
        title="Statut"
        type="text"
        placeholder="available / not-available"
        :error-message="statusErrorMessage"
      />
      <InputGroup
        v-model="(amountValue as number)"
        title="Loyer (€)"
        type="number"
        placeholder="590"
        :error-message="amountErrorMessage"
      />
      <InputGroup
        v-model="(surfaceValue as number)"
        title="Surface (m²)"
        type="number"
        :step="0.01"
        placeholder="108"
        :error-message="surfaceErrorMessage"
      />
      <div class="col-span-2 flex items-center gap-4">
        <InputGroup
          v-model="(imageValue as string)"
          title="Image (URL)"
          type="text"
          placeholder="https://source.unsplash.com/random/?apartment"
          :error-message="imageErrorMessage"
          class="flex-1"
        />
        <Avatar :img="(imageValue as string)" />
      </div>
    </fieldset>

    <fieldset class="border p-4 rounded-lg bg-gray-50">
      <legend class="text-xs uppercase font-bold text-green-600">
        Adresse
      </legend>
      <div class="grid grid-cols-2 gap-4 py-2">
        <InputGroup
          v-model="(addressValue as PropertyAddress).number"
          title="Numéro"
          type="text"
          placeholder="1"
          :error-message="addressErrorMessage"
        />
        <InputGroup
          v-model="(addressValue as PropertyAddress).street"
          title="Rue"
          type="text"
          placeholder="Rue de la paix"
          :error-message="addressErrorMessage"
        />
        <InputGroup
          v-model="(addressValue as PropertyAddress).postcode"
          title="Code Postal"
          type="text"
          placeholder="75000"
          :error-message="addressErrorMessage"
        />
        <InputGroup
          v-model="(addressValue as PropertyAddress).city"
          title="Ville"
          type="text"
          placeholder="Paris"
          :error-message="addressErrorMessage"
        />
      </div>
    </fieldset>

    <fieldset class="border p-4 rounded-lg bg-gray-50">
      <legend class="text-xs uppercase font-bold text-green-600">
        Locataires
      </legend>
      <div
        v-for="(tenant, index) in (tenantsValue as PropertyTenant[])"
        :key="tenant.id"
        class="flex gap-4 items-baseline py-2"
      >
        <Heading
          :level="3"
          :content="'Locataire #' + (index + 1)"
          class="underline"
        />
        <InputGroup
          v-model="tenant.firstname"
          title="Prénom"
          type="text"
          placeholder="John"
          :error-message="tenantsErrorMessage"
          class="flex-1"
        />
        <InputGroup
          v-model="tenant.lastname"
          title="Nom"
          type="text"
          placeholder="Doe"
          class="flex-1"
        />
        <Button
          text="Retirer"
          type="button"
          class="bg-red-600 hover:bg-red-500 focus:outline-red-600"
          @click.prevent="
            () => {
              (tenantsValue as PropertyTenant[]).splice(index, 1);
            }
          "
        />
      </div>
      <Button
        text="Ajouter un locataire"
        type="button"
        class="block mx-auto bg-gray-500 hover:bg-gray-600 focus:outline-gray-500"
        :class="(tenantsValue as PropertyTenant[]).length && 'mt-2'"
        @click.prevent="
          () => {
            (tenantsValue as PropertyTenant[]).push({
              id: (tenantsValue as PropertyTenant[]).length + 1,
              firstname: '',
              lastname: '',
            });
          }
        "
      />
    </fieldset>

    <Button text="Confirmer" uppercase class="mt-4 w-full" />

    <!-- <pre>
      {{ tenantsValue }}
    </pre> -->
  </form>
</template>
