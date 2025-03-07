export enum UserType {
  Admin = 0,
  SubAdmin = 1,
  Member = 2,
  LT = 3
}

export enum ModuleLists {
  Category = 0,
  Products = 1,
  Attributes = 2,
  Customer = 3,
  Estimation = 4,
  Terms = 5,
  Staff = 6,
  AdminRoles = 7,
  Invoice = 8,
  LeadUtility = 9,
  Lead = 10,
  Home = 11,
  Preferences = 12
}

export enum ModuleAccesssView {
  View = 0,
  ViewAndAdd = 1,
  ViewAddUpdate = 2,
  ViewAddUpdateDelete = 3
}

export enum DiscountType {
  Flat = 0,
  Percentage = 1
}



export interface CartItem {
  ProductName: string,
  ProductPrice: number,
  productImage: string,
  Attributes: any[];
  Quantity: number,
  Mrp: number,
  DiscountType: number,
  DiscountRate: any,

  GSTPercentage  :number,
  GSTAmount:number

  FinalAmount: number,

  isCombo: boolean,

  plantName: string,
  plantImage: string,
  plantPrice: number,
  plantQuantity: number,
  plantFinalPrice: number,
}


export interface checkout {
  userID: number,
  invoiceIdentity: number,
  customerID: number,
  totalPrice: number,
  totalProducts: number,
  totalProductsQuantity: number,
  overAllDiscount: number, 
  overAllGSTAmount: number,
  orderDueDate: string,
  termsIDs: { termsID: number }[],
  invoiceProductInputs: [
    {
      productName: string,
      productImage: string,
      productPrice: 0,
      discountedPrice: 0,
      quantity: 0,
      discountType: 0,
      discountRate: 0,
      GSTPercentage  :number,
      GSTAmount:number
      finalPrice: 0,
      plantName: string,
      plantImage: string,
      plantPrice: 0,
      isCombo: true,
      plantQuantity: 0,
      plantFinalPrice: 0,
      invoiceProductAttributeInputs: [
        {
          productAttributeID: 0,
          productAttributeValueID: 0
        }
      ]
    }
  ]
}


export interface Role {
  userID: number;
  rolesInputModels: Array<{
    roleID: any;
    roleAccessID: number;
    moduleList: ModuleLists;
    moduleAccesssView: ModuleAccesssView;
  }>;
}


export interface RoleAccess {
  roleAccessID: number;
  userID: number;
  moduleLists: number;
  moduleAccesssView: number;
  createdBy: number;
  createdAt: string;
  updatedBy: number;
  updatedAt: string;
}