const createUserTable = `
  CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY NOT NULL,
    user_name VARCHAR(40) NOT NULL,
    role VARCHAR(10),
    password VARCHAR(20) NOT NULL,
    hint VARCHAR(20),
    created_on TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_on TIMESTAMP WITH TIME ZONE,
    last_updated_by VARCHAR(50)
  );
`;

const createEmployeeTable = `
  CREATE TABLE IF NOT EXISTS employees(
    emp_id SERIAL PRIMARY KEY NOT NULL,
    emp_name VARCHAR(40) NOT NULL,
    mobile VARCHAR(11),
    dept_id INTEGER NOT NULL
  );
`;

const createDepartmentTable = `
  CREATE TABLE IF NOT EXISTS department(
    dept_id SERIAL PRIMARY KEY NOT NULL,
    dept_name VARCHAR(40) NOT NULL
  );
`;

const createItemsTable = `
  CREATE TABLE IF NOT EXISTS items(
    item_id SERIAL PRIMARY KEY NOT NULL,
    item_name VARCHAR(20) NOT NULL,
    item_desc VARCHAR(50) NOT NULL,
    init_quant INTEGER NOT NULL,
    isreturnable BOOLEAN NOT NULL,
    avail_quant INTEGER NOT NULL,
    created_on TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_on TIMESTAMP WITH TIME ZONE
  );
`;
const createRequestsTable = `
  CREATE TABLE IF NOT EXISTS requests(
    req_id SERIAL PRIMARY KEY NOT NULL,
    item_id INTEGER NOT NULL,
    emp_id INTEGER NOT NULL,
    isreturnable BOOLEAN NOT NULL,
    status VARCHAR(10),
    created_on TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_on TIMESTAMP WITH TIME ZONE
  );
`;
const createQuery = `${createUserTable}${createEmployeeTable}${createDepartmentTable}${createItemsTable}${createRequestsTable}`;
export default createQuery;