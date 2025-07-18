// src/components/modules/Inventory.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Card, Typography, Space, Row, Col, Button, Table, Modal, Popconfirm, Spin, message, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import ProductForm from '../inventory/ProductForm'; // Importa el formulario

const { Title, Paragraph } = Typography;

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#FF8042', '#0088FE', '#00C49F', '#AF19FF', '#FF194C'];

// --- Datos Simulados Iniciales ---
const initialSimulatedProducts = [
  { id: '1', name: 'Jeans Clásicos', description: 'Jeans de mezclilla azul', sku: 'JC-001', quantity: 50, unit_price: 35.99, category: 'Ropa', low_stock_threshold: 10 },
  { id: '2', name: 'Camiseta Algodón Blanca', description: 'Camiseta básica de algodón', sku: 'CAB-002', quantity: 20, unit_price: 15.00, category: 'Ropa', low_stock_threshold: 5 },
  { id: '3', name: 'Zapatillas Deportivas', description: 'Calzado para correr', sku: 'ZD-003', quantity: 5, unit_price: 75.50, category: 'Calzado', low_stock_threshold: 1 },
  { id: '4', name: 'Reloj Inteligente', description: 'Smartwatch con monitor cardíaco', sku: 'RI-004', quantity: 2, unit_price: 199.99, category: 'Electrónica', low_stock_threshold: 0 },
  { id: '5', name: 'Collar de Perlas', description: 'Accesorio elegante', sku: 'CP-005', quantity: 15, unit_price: 25.00, category: 'Accesorios', low_stock_threshold: 3 },
  { id: '6', name: 'Libro de Cocina', description: 'Recetas saludables', sku: 'LC-006', quantity: 0, unit_price: 18.00, category: 'Hogar', low_stock_threshold: 0 },
  { id: '7', name: 'Gorra Deportiva', description: 'Gorra ajustable', sku: 'GD-007', quantity: 8, unit_price: 12.00, category: 'Accesorios', low_stock_threshold: 2 },
];

const Inventory = () => {
  const [products, setProducts] = useState(initialSimulatedProducts); // Usa los datos simulados
  const [loading, setLoading] = useState(false); // No hay carga real de API al inicio
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // No necesitamos fetchProducts de Supabase, la data ya está en el estado local.
  // Sin embargo, podemos simular una "recarga" para que el `onProductSaved` funcione.
  const refreshProducts = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      // En una aplicación real, aquí recargarías de la base de datos.
      // Aquí, simplemente "simulamos" una recarga actualizando el estado,
      // lo cual ya se hace con `onProductSaved`.
      setLoading(false);
    }, 300);
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalVisible(true);
  };

  const handleEditProduct = (record) => {
    setEditingProduct(record);
    setIsModalVisible(true);
  };

  const handleProductSaved = (savedProduct) => {
    if (editingProduct) {
      // Si estamos editando, actualiza el producto en la lista
      setProducts(products.map(p => p.id === savedProduct.id ? savedProduct : p));
    } else {
      // Si es un producto nuevo, añádelo a la lista
      setProducts([...products, savedProduct]);
    }
    setIsModalVisible(false);
    message.success('Producto guardado con éxito!'); // Ya lo muestra el formulario, pero lo dejo aquí como backup
  };

  const handleDeleteProduct = (id) => {
    setLoading(true);
    setTimeout(() => { // Simular una llamada a la API
      setProducts(products.filter(p => p.id !== id));
      message.success('Producto eliminado con éxito.');
      setLoading(false);
    }, 500); // Pequeño retardo para simular carga
  };

  // --- Cálculos para el Resumen del Inventario ---
  const totalProductsUnique = products.length;
  const totalInventoryValue = products.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0).toFixed(2);
  const lowStockProducts = products.filter(item =>
    item.low_stock_threshold !== null && item.quantity <= item.low_stock_threshold && item.quantity > 0
  );
  const outOfStockProducts = products.filter(item => item.quantity === 0);

  const productsByCategory = products.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.quantity;
    return acc;
  }, {});

  const pieChartData = Object.keys(productsByCategory).map(category => ({
    name: category,
    value: productsByCategory[category],
  }));

  const columns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: 'SKU', dataIndex: 'sku', key: 'sku' },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
      render: (quantity, record) => {
        if (record.low_stock_threshold !== null && quantity <= record.low_stock_threshold && quantity > 0) {
          return <Tag color="warning">{quantity} (Bajo stock)</Tag>;
        }
        if (quantity === 0) {
          return <Tag color="error">{quantity} (Agotado)</Tag>;
        }
        return quantity;
      }
    },
    { title: 'Precio Unitario', dataIndex: 'unit_price', key: 'unit_price', render: (price) => `$${parseFloat(price).toFixed(2)}` },
    { title: 'Categoría', dataIndex: 'category', key: 'category', sorter: (a, b) => a.category.localeCompare(b.category) },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEditProduct(record)}>Editar</Button>
          <Popconfirm
            title="¿Estás seguro de eliminar este producto?"
            onConfirm={() => handleDeleteProduct(record.id)}
            okText="Sí"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>Eliminar</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card style={{ margin: '16px 0', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <Title level={3}>Módulo de Inventario</Title>
      <Paragraph>
        Gestiona y visualiza el stock de tus productos de manera eficiente (Datos Simulados).
      </Paragraph>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Resumen de Inventario */}
        <Card title="Resumen General del Inventario" bordered={false}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card size="small" title="Productos Únicos">
                <Title level={4}>{totalProductsUnique}</Title>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card size="small" title="Valor Total Inventario">
                <Title level={4}>${totalInventoryValue}</Title>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card size="small" title="Bajo Stock">
                <Title level={4} style={{ color: lowStockProducts.length > 0 ? '#faad14' : undefined }}>
                  {lowStockProducts.length}
                </Title>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card size="small" title="Agotados">
                <Title level={4} style={{ color: outOfStockProducts.length > 0 ? '#ff4d4f' : undefined }}>
                  {outOfStockProducts.length}
                </Title>
              </Card>
            </Col>
          </Row>
        </Card>

        {/* Gráfica de Productos por Categoría */}
        {pieChartData.length > 0 && (
          <Card title="Distribución de Productos por Categoría" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} unidades`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        )}
        {pieChartData.length === 0 && !loading && (
             <Paragraph type="secondary" style={{ textAlign: 'center', marginTop: '1rem' }}>
                Aún no tienes productos registrados para mostrar la distribución por categorías.
            </Paragraph>
        )}

        {/* Sección de Gestión de Productos (Tabla y Botón Añadir) */}
        <Card
          title="Lista de Productos"
          bordered={false}
          extra={<Button type="primary" icon={<PlusOutlined />} onClick={handleAddProduct}>Añadir Producto</Button>}
        >
          <Table
            dataSource={products}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 'max-content' }}
          />
        </Card>
      </Space>

      {/* Modal para añadir/editar producto */}
      <Modal
        title={editingProduct ? "Editar Producto" : "Añadir Nuevo Producto"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null} // Ocultar botones por defecto del modal
        destroyOnClose={true} // Asegura que el formulario se resetee al cerrar
      >
        <ProductForm
          onProductSaved={handleProductSaved} // Esta función actualizará el estado `products`
          onCancel={() => setIsModalVisible(false)}
          initialValues={editingProduct}
        />
      </Modal>
    </Card>
  );
};

export default Inventory;