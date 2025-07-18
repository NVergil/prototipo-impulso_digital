// src/components/inventory/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, Button, message } from 'antd';
import { v4 as uuidv4 } from 'uuid'; // Para generar IDs únicos para productos simulados

const { Option } = Select;

const productCategories = ['Ropa', 'Accesorios', 'Calzado', 'Electrónica', 'Hogar', 'Otros'];

const ProductForm = ({ onProductSaved, initialValues, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.resetFields();
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => { // Simular una llamada a la API
      try {
        const productToSave = { ...values };
        if (initialValues && initialValues.id) {
          // Modo edición: mantener el ID existente
          productToSave.id = initialValues.id;
        } else {
          // Modo creación: generar un nuevo ID
          productToSave.id = uuidv4();
        }
        productToSave.updated_at = new Date().toISOString(); // Simular fecha de actualización

        message.success('Producto guardado con éxito!');
        form.resetFields();
        if (onProductSaved) onProductSaved(productToSave); // Pasa el producto guardado al padre
        if (onCancel) onCancel();
      } catch (error) {
        console.error('Error al guardar producto simulado:', error.message);
        message.error(`Error al guardar producto: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }, 500); // Pequeño retardo para simular carga
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Nombre del Producto"
        rules={[{ required: true, message: 'Por favor ingresa el nombre del producto!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Descripción"
      >
        <Input.TextArea rows={2} />
      </Form.Item>
      <Form.Item
        name="sku"
        label="SKU (Código)"
        tooltip="Stock Keeping Unit: Un código único para tu producto."
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="quantity"
        label="Cantidad en Stock"
        rules={[{ required: true, message: 'Por favor ingresa la cantidad en stock!' }]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="unit_price"
        label="Precio Unitario"
        rules={[{ required: true, message: 'Por favor ingresa el precio de venta!' }]}
      >
        <InputNumber
          min={0}
          precision={2}
          style={{ width: '100%' }}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>
      <Form.Item
        name="category"
        label="Categoría"
        rules={[{ required: true, message: 'Por favor selecciona una categoría!' }]}
      >
        <Select placeholder="Selecciona una categoría">
          {productCategories.map(cat => <Option key={cat} value={cat}>{cat}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        name="low_stock_threshold"
        label="Umbral de Stock Bajo"
        tooltip="Se te notificará si la cantidad de este producto cae por debajo de este número."
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {initialValues ? 'Actualizar Producto' : 'Añadir Producto'}
        </Button>
        {onCancel && <Button style={{ marginLeft: 8 }} onClick={onCancel}>Cancelar</Button>}
      </Form.Item>
    </Form>
  );
};

export default ProductForm;