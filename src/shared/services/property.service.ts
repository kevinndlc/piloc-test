import type { Property, PropertyForm } from '../interfaces';

const BASE_URL = '/api/properties';

export async function fetchProperties(): Promise<Property[]> {
  const properties = await (await fetch(BASE_URL)).json();
  return properties;
}

export async function addProperty(property: PropertyForm): Promise<Property> {
  const newProperty = await (
    await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(property),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

  return newProperty;
}

export async function editProperty(
  propertyId: number,
  property: PropertyForm
): Promise<{ property: Property }> {
  const updatedProperty = await (
    await fetch(`${BASE_URL}/${propertyId}`, {
      method: 'PATCH',
      body: JSON.stringify(property),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

  return updatedProperty;
}
