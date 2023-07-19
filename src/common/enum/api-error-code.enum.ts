export enum ApiErrorCode {
    SUCCESS = 200, // 成功
    USER_ID_INVALID = 10001, // 認證失效
    USER_NOTEXIST = 10002, // 登入失敗 使用者不存在或密碼錯誤
    ARGUMENT_INVALID = 10003, // 無效參數 檢查資料格式是否符合 DTO 定義
    USER_ACCOUNT_USED = 10004 // 使用者帳號已被使用
}