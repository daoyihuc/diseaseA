
export const  BaseUrl = 'https://medical.996sh.com';
export const Api: any =
  {
    AddMenu : BaseUrl + '/AddMenu', // 添加菜单接口(科室,病区,主疾病添加)
    MenuList: BaseUrl + '/MenuList', // 菜单列表
    Login: BaseUrl + '/Login', // Login
    AddRole: BaseUrl + '/AddRole', // 角色添加编辑接口
    RoleList: BaseUrl + '/RoleList', // 角色管理列表接口
    RoleInfo: BaseUrl + '/RoleInfo', // 角色详情接口
    AdminList: BaseUrl + '/AdminList', // 管理员列表接口
    MedicalList: BaseUrl + '/MedicalList', // 病例接口
    DepartmentList: BaseUrl + '/DepartmentList', // 科室，病区，疾病
    AddAdmin: BaseUrl + '/AddAdmin', // 管理员新增编辑提交接口
    AdminInfo: BaseUrl + '/AdminInfo' // 权限管理详情接口


  };
