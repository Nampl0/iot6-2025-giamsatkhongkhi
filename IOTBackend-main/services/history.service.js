const db = require("../db");

module.exports.getAllHistory = async (obj) => {
  let sqlParams = [];
  let sqlCondition = "";
  // Lấy tổng số lượng bản ghi
  const totalCountSql = `SELECT COUNT(*) as totalCount FROM iot_exam.history WHERE 1=1 ${sqlCondition}`;
  const [totalCountResult] = await db.query(totalCountSql, sqlParams);
  const totalCount = totalCountResult[0].totalCount;
  // Lấy dữ liệu
  const sql = `SELECT * FROM iot_exam.history WHERE 1=1 ${sqlCondition} ORDER BY 1 DESC LIMIT ? OFFSET ?`;
  const [data] = await db.query(sql, [
    ...sqlParams,
    obj.pageSize,
    (obj.page - 1) * obj.pageSize,
  ]);
  console.log(sqlParams);

  return { data, totalCount };
};

module.exports.AddAHistory = async (obj) => {
  const [{ affectedRows }] = await db.query(
    "INSERT INTO iot_exam.history (device, action, createdDate) VALUES (?, ?, NOW())",
    [obj.device, obj.action]
  );
  return affectedRows;
};
