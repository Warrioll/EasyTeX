db = db.getSiblingDB('EasyTeX');
db.Session.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });