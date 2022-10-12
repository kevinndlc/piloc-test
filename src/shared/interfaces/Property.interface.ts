export interface Property {
  id: number;
  created_at: string;
  updated_at: string;
  rented_at: string;
  name: string;
  image: string;
  address: PropertyAddress;
  surface: number;
  amount: number;
  status: string;
  tenants: PropertyTenant[];
}

export interface PropertyForm {
  name: string;
  image: string;
  address: PropertyAddress;
  surface: number;
  amount: number;
  status: string;
  tenants: PropertyTenant[];
}

export interface PropertyAddress {
  number: number | string;
  street: string;
  postcode: number | string;
  city: string;
}

export interface PropertyTenant {
  id: number;
  firstname: string;
  lastname: string;
}
