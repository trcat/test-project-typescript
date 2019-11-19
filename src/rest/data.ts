export interface ReturnObj {
    state: boolean;
    message: string;
    code: string;
}

export interface ResultObj extends ReturnObj {
    data: null;
}

/** User */
type UserIdentity = 'student' | 'teacher' | 'admin';
type UserGender = 'male' | 'female';

export interface UserData {
    identity: UserIdentity;
    username: string;
    gender: UserGender;
    phone: string;
    email: string;
    id?: string; // 创建新用户时不会有该属性
    my_class?: string; // 只有学生用户才会有该属性，值为班级 id
}
