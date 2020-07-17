function validate(target: any, name: string, descriptor: any) {
  console.log(target, name, descriptor)
}
class Student {
  @validate
  login(username: string, password: string) {}
}
let s1 = new Student()
s1.login('bang', '123456')
