const { send } = require('micro');
const url = require('url');
const level = require('level');
const promisify = require('then-levelup');

// const visits = {};

const db = promisify(level('visits.db', {
	valueEncoding: 'json'
}));

module.exports = async function (req, res) {
   const { pathname } = url.parse(req.url);
   /*if (visits[pathname]) {
	visits[pathname] = visits[pathname] + 1;
   } else {
	visits[pathname] = 1;
   }

   send(res, 200, `This route has ${visits[pathname]} visits!`);*/
   
   try {
     const currentVisits = await db.get(pathname);
     await db.put(pathname, currentVisits + 1);
   } catch (error) {
     if (error.notFound) await db.put(pathname, 1);
   }
  send(res, 200, `This route has ${await db.get(pathname)} visit(s)!`);
}

