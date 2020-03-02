const userDestroy = 'DROP TABLE IF EXISTS users CASCADE; ';
const EmployeeDestroy = 'DROP TABLE IF EXISTS employees CASCADE; ';
const DepartmentDestroy = 'DROP TABLE IF EXISTS department CASCADE; ';
const ItemsDestroy = 'DROP TABLE IF EXISTS items CASCADE; ';
const RequestsDestroy = 'DROP TABLE IF EXISTS requests CASCADE; ';

const destroyQuery = `${userDestroy}${EmployeeDestroy}${DepartmentDestroy}${ItemsDestroy}${RequestsDestroy}`;

export default destroyQuery;