export interface ReturnData {
    state: boolean;
    message: string;
    code: string;
}

export interface ResultData extends ReturnData {
    data: null;
}

/** User */
export type UserIdentity = 'student' | 'teacher' | 'admin';
export type UserGender = 'male' | 'female';

export interface UserData {
    identity: UserIdentity;
    username: string;
    gender: UserGender;
    phone: string;
    email: string;
    id?: string; // 创建新用户时不会有该属性
    my_class?: string; // 只有学生用户才会有该属性，值为班级 id
    old_password?: string; // 修改密码时才会有它
    new_password?: string; // 修改密码时才会有它
}

export interface UserResultData extends ReturnData {
    data: UserData;
}

/** Class */
export interface ClassData {
    class_name: string;
    id?: string; // 创建班级时不会有该属性
}

export interface ClassListResultData extends ReturnData {
    data: ClassData[];
}

export interface ClassResultData extends ReturnData {
    data: ClassData;
}
