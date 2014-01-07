### 用户注册
#### 请求
##### POST /users/signup
```json
{
  username: 'cidy',
  password: '888888',
  name: '森爹',
  email: '15234656@qq.com',
  phone: '18951406059',
  idcard: '320121199010143134',
  male: '女',
}
```
#### 响应

##### 200 OK


#### 402 Bad Request
* 邮箱已被占用
* ```json
{
   {code:402, message:'邮箱已被占用'}
}
```

#### 403 Bad Request
* 用户名已被占用
* ```json
{
    {code:403, message:'用户名已被占用'}
}```

#### 400 Bad Request
* 注册失败，请正确填写注册信息
* ```json
{
    {code:400, message:'请正确填写所有的字段'}
}```
