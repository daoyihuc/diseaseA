
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
    AdminInfo: BaseUrl + '/AdminInfo', // 权限管理详情接口
    SystemConfig: BaseUrl + '/SystemConfig', // 系统配置列表接口
    LabelShow: BaseUrl + '/LabelShow', // 获取标注列表接口
    AddMedical: BaseUrl + '/AddMedical', // 新增病历接口
    MedicalCheck: BaseUrl + '/MedicalCheck', // 病历审核接口
    MedicalCalibration: BaseUrl + '/MedicalCalibration', // 病历提交接口
    UpdateMedicalStatus: BaseUrl + '/UpdateMedicalStatus', // 修改病历编辑状态接口(包含点击编辑首先调用该接口以及强制解锁病历状态接口)
    UpdatePassword: BaseUrl + '/UpdatePassword', // 修改密码接口
    UserInfo: BaseUrl + '/UserInfo', // 个人资料
    MedicalInfo: BaseUrl + '/MedicalInfo', // 病历详情接口
    MedicalEdit: BaseUrl + '/MedicalEdit', // 病历编辑接口
    ModuleDelete: BaseUrl + '/ModuleDelete', // 删除
    RoleMenuList: BaseUrl + '/RoleMenuList', // 加角色配置权限列表接口
    SystemDelete: BaseUrl + '/SystemDelete', // 系统配置删除
    EditSystem: BaseUrl + '/EditSystem', // 系统配置编辑
    MedicalDelete: BaseUrl + '/MedicalDelete', // 电子病历删除接口
    AdminDelete: BaseUrl + '/AdminDelete', // 用户删除接口
    AddMedicalInfo: BaseUrl + '/AddMedicalInfo', // 新增电子病历 科室，病区，主疾病信息获取接口

  };

