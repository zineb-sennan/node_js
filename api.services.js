const db = require('./db.service');

class ApiService {
    static async createRecord(balise) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO logs 
            (imei) 
            VALUES (?)`;
            db.query(query, [balise.imei], (err, data) => {
                if (err) return reject(err);
                return resolve({ id: data.insertId, ...balise });
            });
        });
    }

    static async getAllRecords() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM balises ORDER BY created_at DESC`;
            db.query(query, (err, data) => {
                if (err) return reject(err);
                const result = JSON.parse(JSON.stringify(data));
                return resolve(result);
            });
        });
    }

    static async getRecordById(id) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM balises WHERE id = ? LIMIT 1;`;
            db.query(query, [id], (err, data) => {
                if (err) return reject(err);
                const result = JSON.parse(JSON.stringify(data));
                return resolve(result[0]);
            });
        });
    }

    static async getRecordByImei(imei) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM balises WHERE imei = ? LIMIT 1`;
            db.query(query, [imei], (err, data) => {
                if (err) return reject(err);
                const result = JSON.parse(JSON.stringify(data));
                return resolve(result[0]);
            });
        });
    }

    static async deleteRecordById(id) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM balises WHERE id = ?;`;
            db.query(query, [id], (err, data) => {
                if (err) return reject(err);
                return resolve({message : `L'identifiant (${id}) est supprimé avec succès.`});
            });
        });
    }
}

module.exports = ApiService;