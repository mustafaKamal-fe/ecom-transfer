export class AddressEntity {
  id: number;
  apartmentNo: string;
  buildingNo: string;
  floorNo: string;
  latitude: number;
  longitude: number;
  street: string;
  province: {
    id: number;
    name: string;
    city: {
      id: number;
      name: string;
    };
  };
}
