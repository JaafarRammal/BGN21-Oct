/**
 * Unpacks an object to it's id and data
 * @param {struct} obj - The object to unpack
 * @return {struct} An object with an id field and other fields.
 */
function unpack(obj) {
  const id = obj.id;
  const data = obj.data();
  const objUnpacked = {id, ...data};
  return objUnpacked;
}

module.exports = {
  unpack,
};
