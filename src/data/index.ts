// Return & Result Data
export interface ReturnData {
    state: boolean;
    message: string;
    code: string;
}

export interface ResultData extends ReturnData {
    data: null;
}

// User
export type UserIdentity = 'student' | 'teacher' | 'admin';
export type UserGender = 'male' | 'female';

export interface UserData {
    identity: UserIdentity;
    username: string;
    gender: UserGender;
    phone: string;
    email: string;
    id?: string; // 创建新用户时不会有该属性
    my_class?: string | null; // 只有学生用户才会有该属性，值为班级 id
    old_password?: string; // 修改密码时才会有它
    new_password?: string; // 修改密码时才会有它
}

export interface UserResultData extends ReturnData {
    data: UserData;
}

// Class
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

// Page List
export interface PageListData {
    count: number;
    totalPage: number;
    next: string | null;
    previous: string | null;
}

export interface MemberPageListData extends PageListData {
    data: UserData[];
}

export interface MemberPageListReturnData extends ReturnData {
    data: MemberPageListData;
}

// test
export type QuestionType = 'single' | 'multiple';

export interface QuestionData {
    type: QuestionType;
    content: string;
    score: number;
    options: string[];
    answer: string[];
    description: string;
    id?: string; // 创建试卷时无该属性
    user_answer?: string[]; // 学生考试提交试卷和查看考试结果时才会有该属性
    paperLib?: string; // 后端传给前端的数据会有该属性，表明该试题属于哪张卷子
}

export interface TestData {
    name: string;
    question_number: number;
    total: number;
    questions: QuestionData[];
    id?: string; // 创建试卷时无该属性
}

export interface CreateTestData extends PageListData {
    id: string;
    name: string;
    question_number: number;
    total: number;
    user: string;
    data: QuestionData[];
}

export interface CreateTestResultData extends ReturnData {
    data: CreateTestData;
}

export interface TestProfileData {
    id: string;
    name: string;
    question_number: number;
    total: number;
    user: string;
}

export interface TestListData extends PageListData {
    data: TestProfileData[];
}

export interface TestListResultData extends ReturnData {
    data: TestListData;
}

export interface QuestionPageListData extends PageListData {
    id: string;
    classes: string[];
    add_time: string;
    test_time: number;
    start_time: string;
    paperLib: string;
    data: QuestionData[];
}

export interface QuestionPageListResultData extends ReturnData {
    data: QuestionPageListData;
}

// dispatch
export interface DispatchData {
    user_id: string;
    start_time: Date;
    test_time: number;
    classes: string[];
    paperLib?: string;
}

export interface DispatchResultData extends ReturnData {
    data: {
        id: string;
        classes: string[];
        add_time: string;
        test_time: number;
        start_time: string;
        paperLib: string;
    };
}

// score
export interface ClassMemberScoreData {
    user: string;
    user_name: string;
    get_score: number;
    class: string;
}

export interface ClassScorePageListData extends PageListData {
    data: ClassMemberScoreData[];
}

export interface ClassScorePageListResultData extends ReturnData {
    data: ClassScorePageListData;
}

export interface StudentScoreData {
    score: number;
    paperLib: TestData;
    user_answer: {
        [key: string]: string[];
    };
}

export interface StudentScoreResultData extends ReturnData {
    data: StudentScoreData;
}

// view
export interface ViewData {
    id: string;
    classes: string[];
    add_time: string;
    test_time: number;
    start_time: string;
    paperLib: {
        id: string;
        name: string;
        question_number: number;
        total: number;
        user: string;
    };
    user: string;
    questions: QuestionData[];
}

export interface ViewResultData extends ReturnData {
    data: ViewData[];
}

// test
export interface TestScoreData {
    get_score: number;
    user: UserData;
    paper: {
        id: string;
        classes: string[];
        add_time: string;
        test_time: string;
        start_time: string;
        paperLib: number;
        user: string;
    };
}

export interface TestScoreResultData extends ReturnData {
    data: TestScoreData;
}
