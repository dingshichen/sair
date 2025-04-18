// 字段类型定义
export interface FieldType {
  type: 'INT' | 'VARCHAR' | 'TEXT' | 'DATETIME' | 'DECIMAL' | 'BOOLEAN';
  length?: number;
  precision?: number;
}

// 字段定义
export interface Field {
  ID: string;
  name: string;
  type: 'INT' | 'VARCHAR' | 'TEXT' | 'DATETIME' | 'DECIMAL' | 'BOOLEAN';
  length?: number;
  precision?: number;
  required: boolean;
  isKey: boolean;
}

// 表数据定义
export interface TableData {
  tableName: string;
  fields: Field[];
}

// 初始表数据
export const initialTableData: TableData[] = [
  {
    tableName: '用户表',
    fields: [
      { ID: 'user_id', name: 'id', type: 'INT', required: true, isKey: true },
      { ID: 'user_name', name: 'name', type: 'VARCHAR', length: 50, required: true, isKey: false },
      { ID: 'user_email', name: 'email', type: 'VARCHAR', length: 100, required: true, isKey: false },
      { ID: 'user_password', name: 'password', type: 'VARCHAR', length: 100, required: true, isKey: false },
      { ID: 'user_created_at', name: 'created_at', type: 'DATETIME', required: true, isKey: false },
      { ID: 'user_updated_at', name: 'updated_at', type: 'DATETIME', required: true, isKey: false },
    ],
  },
  {
    tableName: '订单表',
    fields: [
      { ID: 'order_id', name: 'id', type: 'INT', required: true, isKey: true },
      { ID: 'order_user_id', name: 'user_id', type: 'INT', required: true, isKey: false },
      { ID: 'order_total', name: 'total', type: 'DECIMAL', precision: 2, required: true, isKey: false },
      { ID: 'order_status', name: 'status', type: 'VARCHAR', length: 20, required: true, isKey: false },
      { ID: 'order_created_at', name: 'created_at', type: 'DATETIME', required: true, isKey: false },
      { ID: 'order_updated_at', name: 'updated_at', type: 'DATETIME', required: true, isKey: false },
    ],
  },
  {
    tableName: '商品表',
    fields: [
      { ID: 'product_id', name: 'id', type: 'INT', required: true, isKey: true },
      { ID: 'product_name', name: 'name', type: 'VARCHAR', length: 100, required: true, isKey: false },
      { ID: 'product_description', name: 'description', type: 'TEXT', required: false, isKey: false },
      { ID: 'product_price', name: 'price', type: 'DECIMAL', precision: 2, required: true, isKey: false },
      { ID: 'product_stock', name: 'stock', type: 'INT', required: true, isKey: false },
      { ID: 'product_created_at', name: 'created_at', type: 'DATETIME', required: true, isKey: false },
      { ID: 'product_updated_at', name: 'updated_at', type: 'DATETIME', required: true, isKey: false },
    ],
  },
];

// 初始节点数据
export const initialNodes = initialTableData.map((tableData, index) => ({
  id: `${index + 1}`,
  type: 'tableNode',
  data: { tableData },
  position: { x: 100 + index * 300, y: 100 },
}));

// 初始边数据
export const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    sourceHandle: 'field-user_id-Right',
    targetHandle: 'field-order_user_id-Left',
    type: 'smoothstep',
    animated: true,
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    sourceHandle: 'field-order_id-Right',
    targetHandle: 'field-product_id-Left',
    type: 'smoothstep',
    animated: true,
  },
]; 