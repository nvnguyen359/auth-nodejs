

// eslint-disable-next-line no-undef
 class CRUD {
    construct(_tableName,_knex){
        this.tableName = _tableName;
        this.knex = _knex;
    }
    set TableName(_tableName){
        this.tableName = _tableName;
    }
    get TableName() {
        return this.tableName;
    }
    set setKnex(_knex){
        this.knex = _knex;
    }
    convertResult(_rows) {
		const dt = Object.values(JSON.parse(JSON.stringify(_rows)));
		return dt.length > 0 ? (dt.length == 1 ? dt[0] : dt) : null;
	}
    async create(obj) {
		try {
			if (!obj.createdAt) {
				obj.createdAt = new Date();
			}
			if (!obj.updatedAt) {
				obj.updatedAt = new Date();
			}
			return await this.knex(this.tableName).insert(obj);
		} catch (error) {
          
			console.log(error.message);
            return null;
		}
	}
    async update(obj) {
		try {
			if (typeof obj === "string") {
				return "obj is string";
			}
			obj.updatedAt = new Date();
			const id1 = obj.id || obj.ID || obj.Id;
			// eslint-disable-next-line no-unused-vars
			const { id, createdAt, ...objNotId } = obj;

			for (let key in objNotId) {
				try {
					let o = {};
					o[key] = objNotId[key];
					if (key == "updatedAt") {
						o[key] = new Date(objNotId[key]);
					}
					await this.knex(this.tableName).update(o).where({ id: id1 });
				} catch (error) {
					console.log(error.message);
				}
			}
			return obj;
		} catch (error) {
			console.log(error.message);
		}
	}
	async upset(obj) {
		const id = obj.id || obj.ID || obj.Id;
		const result = id ? await this.update(obj) : await this.create(obj);
		return result;
	}
	async getEmail(email) {
		try {
			if (typeof email === "string") {
				email = { email };
			}
			const resultArray = await this.knex(this.tableName).where(email);
			return this.convertResult(resultArray);
		} catch (error) {
			console.log("getEmail", error.message);
		}
	}
	async deleteId(obj) {
		try {
		
			if (typeof obj === "string") {
				return await this.knex(this.tableName).where({ id: obj }).del();
			} else {
				const resultArray = await this.knex(this.tableName).where(obj).del();
				return resultArray;
			}

		} catch (error) {
			return error.message;
		}
	}
	async getAll(obj) {
		try {
			const resultArray = await this.knex(this.tableName).where(obj).select("*");
			return this.convertResult(resultArray);
		} catch (error) {
			console.log("getAll", error.message);
			return error.message;
		}
	}
	/**
	 * 
	 * @param {*} obj 
	 * @param {*} _tableName 
	 * @returns 
	 * Login với email và password
	 * obj {email,password}
	 *  _tableName =users 
	 */
	async getUser(obj) {
		try {
			let user = await this.knex(this.tableName).where({ email: obj.email });
			user = this.convertResult(user);
			return user;
		} catch (error) {
			return error.message;
		}
	}

}
// eslint-disable-next-line no-undef
module.exports ={CRUD};