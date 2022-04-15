class UserBrief {
  constructor(obj) {
    this.id = obj.id;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.email = obj.email;
    this.roles = obj.roles;
    this.hotels = obj.hotels;
  }
}

export default UserBrief;
