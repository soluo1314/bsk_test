import Mock from 'mockjs'
var data = Mock.mock({
  // 属性 list数组，生成 1 到 10 个随机条数
  // 注意 字符串 引起来
  // 属性 id 是一个自增数，起始值为 1，每次增 1    
        "list|1-10": [
          {
            "id|+1": 1
          }
        ]
      });
  // console.log(data);
  
const UsersData = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://avatars0.githubusercontent.com/u/22588905?v=4&s=120',
    name: '达康书记'
  }
]

const Users = []

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }))
}
// 导出多个数据
export { UsersData, Users }
