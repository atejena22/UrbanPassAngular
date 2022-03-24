export interface IUsuario {
    UserId?:       number;
    RoleId?:       number;
    Deleted?:      boolean;
    lastLogin?:    Date;
    Email?:        string;
    UserName?:     string;
    Password?:     string;
    FirstName?:    string;
    LastName?:     string;
    Active?:       boolean;
    activeFrom?:   Date;
    activeTo?:     Date;
    UserParentId?: number;
    image?:        string;
    urbanizationId?: number;
}
