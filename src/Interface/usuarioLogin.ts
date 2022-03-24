export interface usuarioLogin{
    token:             string;
    userID:            number;
    roleID:            number;
    email:             string;
    userName:          string;
    password:          string;
    firstName:         string;
    lastName:          string;
    UrbanizationId:    number;

  //  active:            boolean;
  //  activeFrom:        Date;
  //  activeTo:          Date;
  //  lastLogin:         Date;
  //  deleted:           boolean;
  //  emailConfirmation: boolean;
    userParentID:      number;
    image:             string;
  //  roleName:          string;
  //  roleDescription:   string;
  //  houses:            null;
}