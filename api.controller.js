const ApiService = require('./api.services');

class API {
    static async apiCreate(req, res) {
        try {
            const {
                imei
            } = req.body;

            if (!imei) {
                return res.status(403).json({
                    succes: false,
                    message: `Données fournis incomplet!`
                });
            }

            // const imeiCheck = await ApiService.getRecordByImei(imei);
            // if (imeiCheck && imeiCheck.length > 0) {
            //     return res.status(409).json({
            //         succes: false,
            //         message: `L'imei (${imei}) est déjà existant!`
            //     });
            // }

            const record = {
                imei
            };

            const response = await ApiService.createRecord(record);
            res.status(201).json({
                succes: true,
                data: response
            });
        }
        catch (error) {
            res.status(500).json({
                succes: false,
                message: error.message
            });
        }
    }

    static async apiGetAll(req, res) {
        try {
            const response = await ApiService.getAllRecords();
            res.json({
                succes: true,
                data: response
            });
        }
        catch (error) {
            res.status(500).json({
                succes: false,
                message: error.message
            });
        }
    }

    static async apiGetById(req, res) {
        try {
            const { id } = req.params;

            const response = await ApiService.getRecordById(id);
            if (!response) {
                return res.status(404).json({
                    succes: false,
                    message: `L'identifiant (${id}) est introuvable!`
                });
            }

            res.json({
                succes: true,
                data: response
            });
        }
        catch (error) {
            res.status(500).json({
                succes: false,
                message: error.message
            });
        }
    }

    static async apiDeleteById(req, res) {
        try {
            const { id } = req.params;

            const log = await ApiService.getRecordById(id);
            if (!log) {
                return res.status(404).json({
                    succes: false,
                    message: `L'identifiant (${id}) est introuvable!`
                });
            }

            const response = await ApiService.deleteRecordById(id);

            res.json({
                succes: true,
                message: response.message
            });
        }
        catch (error) {
            res.status(500).json({
                succes: false,
                message: error.message
            });
        }
    }

}

module.exports = API;