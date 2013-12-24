db.dropDatabase()
db.users.save({
	"username":"admin",
	"hashed_password":"31c234141f94cb0dbb6ff01327945d42966e12cb",
	"salt" : "45048771824",
	"name":"管理员",
	"displayName":"平台管理员",
	"email":"tester@fankahui.com",
	"phone":"18912345678",
	"idcard":"220721197806179752",
	"birthday":"1978-06-17",
	"male":true,
	"roles":["admin", "staff"],
	"createdAt": Date()
})